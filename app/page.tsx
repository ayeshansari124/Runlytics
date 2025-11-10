'use client';
import { useState } from "react";
import FileUpload from "@components/FileUpload";
import ChartView from "@components/ChartView";
import { calculateMetrics } from "@utils/calcMetrics";

export default function Home() {
  const [data, setData] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState("");

  const handleData = (csvData) => {
    setData(csvData);
    setMetrics(calculateMetrics(csvData));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          CSV Runner Dashboard
        </h1>

        {/* Upload Section */}
        <section className="bg-white shadow-sm rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Upload CSV File
          </h2>
          <FileUpload onData={handleData} />
        </section>

        {/* Metrics Section */}
        {metrics && (
          <>
            {/* Overall Metrics */}
            <section className="bg-white shadow-sm rounded-xl p-6 border border-gray-200">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Overall Metrics
              </h2>
              <div className="flex justify-around text-center">
                <div>
                  <p className="text-gray-500 text-sm">Average</p>
                  <p className="text-xl font-semibold">{metrics.overall.avg}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Min</p>
                  <p className="text-xl font-semibold">{metrics.overall.min}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Max</p>
                  <p className="text-xl font-semibold">{metrics.overall.max}</p>
                </div>
              </div>
            </section>

            {/* Per Person Metrics */}
            <section className="bg-white shadow-sm rounded-xl p-6 border border-gray-200">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Per Person Metrics
              </h2>
              <select
                onChange={(e) => setSelectedPerson(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Person</option>
                {Object.keys(metrics.perPerson).map((name) => (
                  <option key={name}>{name}</option>
                ))}
              </select>

              {selectedPerson && (
                <div className="mt-4 flex justify-around text-center">
                  <div>
                    <p className="text-gray-500 text-sm">Average</p>
                    <p className="text-xl font-semibold">
                      {metrics.perPerson[selectedPerson].avg}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Min</p>
                    <p className="text-xl font-semibold">
                      {metrics.perPerson[selectedPerson].min}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Max</p>
                    <p className="text-xl font-semibold">
                      {metrics.perPerson[selectedPerson].max}
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* Chart */}
            <section className="bg-white shadow-sm rounded-xl p-6 border border-gray-200">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Miles Run Chart
              </h2>
              <div className="flex justify-center overflow-x-auto">
                <ChartView data={data} person={selectedPerson || null} />
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
