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
    <div style={{ padding: "2rem" }}>
      <h1>CSV Runner Dashboard</h1>
      <FileUpload onData={handleData} />
      {metrics && (
        <>
          <h2>Overall Metrics</h2>
          <p>Avg: {metrics.overall.avg}, Min: {metrics.overall.min}, Max: {metrics.overall.max}</p>

          <h2>Per Person Metrics</h2>
          <select onChange={(e) => setSelectedPerson(e.target.value)}>
            <option value="">Select Person</option>
            {Object.keys(metrics.perPerson).map(name => <option key={name}>{name}</option>)}
          </select>
          {selectedPerson && (
            <p>
              Avg: {metrics.perPerson[selectedPerson].avg}, 
              Min: {metrics.perPerson[selectedPerson].min}, 
              Max: {metrics.perPerson[selectedPerson].max}
            </p>
          )}

          <ChartView data={data} person={selectedPerson || null} />
        </>
      )}
    </div>
  );
}
