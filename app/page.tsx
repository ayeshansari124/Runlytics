"use client";
import { useState } from "react";
import FileUpload from "../components/FileUpload";
import ChartView from "../components/ChartView";
import { calculateMetrics } from "../utils/calcMetrics";

export default function Home() {
  const [data, setData] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState("");

  interface CsvRow {
  date: string;
  person: string;
  milesRun: number;
}

  const handleData = (csvData: CsvRow[]) => {
    setData(csvData);
    setMetrics(calculateMetrics(csvData));
    setSelectedPerson(""); // reset selection when new file uploaded
  };

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-center">
            Runner Dashboard
          </h1>
          <p className="mt-2 text-center text-sm">
            Upload a CSV (date, person, miles run) — validate, explore metrics,
            and visualize results.
          </p>
        </header>

        {/* Upload card */}
        <section className="bg-black/20 rounded-xl shadow-sm p-6 mb-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-3">Upload CSV</h2>
          <FileUpload onData={handleData} />
          <p className="mt-3 text-xs text-gray-500">
            Sample CSV format:{" "}
            <code className=" px-1 rounded">
              date,person,miles run
            </code>
          </p>
        </section>

        {/* Metrics & controls */}
        {metrics ? (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-black/20 rounded-xl shadow-sm p-6 backdrop-blur-sm">
                <h3 className="text-lg font-medium mb-3">Overall Metrics</h3>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-center flex-1">
                    <p className="text-sm">Average</p>
                    <p className="text-2xl font-semibold">
                      {metrics.overall.avg}
                    </p>
                  </div>
                  <div className="text-center flex-1">
                    <p className="text-sm">Min</p>
                    <p className="text-2xl font-semibold">
                      {metrics.overall.min}
                    </p>
                  </div>
                  <div className="text-center flex-1">
                    <p className="text-sm ">Max</p>
                    <p className="text-2xl font-semibold">
                      {metrics.overall.max}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-black/20 rounded-xl shadow-sm p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Miles Run Chart</h3>
                  <div>
                    <label className="text-sm mr-2">Person</label>
                    <select
                      className="border px-3 py-2 rounded-md text-sm bg-black/20 text-white"
                      value={selectedPerson}
                      onChange={(e) => setSelectedPerson(e.target.value)}
                    >
                      <option value="">Overall</option>
                      {Object.keys(metrics.perPerson).map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="h-80">
                  <ChartView data={data} person={selectedPerson || null} />
                </div>
              </div>
            </div>

            {/* Right column: per-person quick metrics */}
            <aside className="space-y-6">
              <div className="bg-black/20 rounded-xl shadow-sm p-4 backdrop-blur-sm">
                <h4 className="text-sm font-medium mb-3">
                  Per-person snapshot
                </h4>
                <div className="space-y-3">
                  {Object.entries(metrics.perPerson).map(([name, m]) => (
                    <div
                      key={name}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{name}</p>
                        <p className="text-xs">avg ● min ● max</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{m.avg}</p>
                        <p className="text-xs">
                          {m.min} ● {m.max}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* <div className="bg-black/20 rounded-xl shadow-sm p-4 text-sm backdrop-blur-sm">
                <p>
                  <strong>Tip:</strong> Upload a sample CSV with more rows to
                  get better visual trends.
                </p>
              </div> */}
            </aside>
          </section>
        ) : (
          <section className="bg-black/20 rounded-xl p-6 text-center backdrop-blur-sm">
            Upload a CSV to see metrics and charts.
          </section>
        )}
      </div>
    </main>
  );
}
