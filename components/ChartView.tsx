"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { CsvRow } from "../utils/parseCSV";

export default function ChartView({ data, person }: { data: CsvRow[], person: string | null }) {
  const filtered = person ? data.filter(d=>d.person===person) : data;
  const dateMap: Record<string, number> = {};

  filtered.forEach(r => { 
    dateMap[r.date] = (dateMap[r.date] || 0) + (r["miles run"] ?? 0);
  });

  const chartData = Object.keys(dateMap).sort().map(date => ({ date, "miles run": +dateMap[date].toFixed(2) }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{top:10,right:20,bottom:10,left:0}}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="miles run" stroke="#2563EB" strokeWidth={2} dot={{r:3}} />
      </LineChart>
    </ResponsiveContainer>
  );
}
