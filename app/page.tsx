"use client";
import { useState } from "react";
import FileUpload from "../components/FileUpload";
import ChartView from "../components/ChartView";
import { calculateMetrics } from "../utils/calcMetrics";
import { CsvRow } from "../utils/parseCSV";
import { Metrics } from "../utils/calcMetrics";

export default function Home() {
  const [data,setData] = useState<CsvRow[]>([]);
  const [metrics,setMetrics] = useState<Metrics | null>(null);
  const [selectedPerson,setSelectedPerson] = useState("");

  const handleData = (csvData: CsvRow[]) => {
    setData(csvData);
    setMetrics(calculateMetrics(csvData));
    setSelectedPerson("");
  };

  return (
    <main className="min-h-screen px-4 py-10 text-white">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold">Runner Dashboard</h1>
          <p className="mt-2 text-sm text-gray-300">Upload CSV (date, person, miles run) — explore metrics & charts.</p>
        </header>

        <section className="bg-black/20 rounded-xl shadow-sm p-6 mb-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-3">Upload CSV</h2>
          <FileUpload onData={handleData} />
          <p className="mt-3 text-xs text-gray-400">Sample CSV format: <code className="px-1 rounded">date,person,miles run</code></p>
        </section>

        {metrics ? (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-black/20 rounded-xl shadow-sm p-6 backdrop-blur-sm flex justify-between">
                {["avg","min","max"].map((key,index)=>(
                  <div key={index} className="text-center flex-1">
                    <p className="text-sm capitalize">{key}</p>
                    <p className="text-2xl font-semibold">{metrics.overall[key as keyof typeof metrics.overall]}</p>
                  </div>
                ))}
              </div>
              <div className="bg-black/20 rounded-xl shadow-sm p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Miles Run Chart</h3>
                  <div>
                    <label className="text-sm mr-2">Person</label>
                    <select className="border px-3 py-2 rounded-md text-sm bg-black/20" value={selectedPerson} onChange={e=>setSelectedPerson(e.target.value)}>
                      <option value="" className="text-black font-bold">Overall</option>
                      {Object.keys(metrics.perPerson).map(name=>(
                        <option key={name} value={name} className="text-black font-bold">{name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="h-80"><ChartView data={data} person={selectedPerson||null} /></div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="bg-black/20 rounded-xl shadow-sm p-4 backdrop-blur-sm">
                <h4 className="text-sm font-medium mb-3">Per-person snapshot</h4>
                <div className="space-y-3">
                  {Object.entries(metrics.perPerson).map(([name,m])=>(
                    <div key={name} className="flex items-center justify-between">
                      <div><p className="font-medium">{name}</p><p className="text-xs text-gray-300">avg ● min ● max</p></div>
                      <div className="text-right"><p className="text-sm font-semibold">{m.avg}</p><p className="text-xs text-gray-300">{m.min} ● {m.max}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </section>
        ) : (
          <section className="bg-black/20 rounded-xl p-6 text-center backdrop-blur-sm">
            Upload a CSV to see metrics and charts.
          </section>
        )}
      </div>
      <footer className="flex justify-center items-center p-5 text-gray-300">Built with 💙 by Ayesha</footer>
    </main>
  );
}
