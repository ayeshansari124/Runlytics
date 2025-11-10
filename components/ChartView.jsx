import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

export default function ChartView({ data, person }) {
  const filtered = person ? data.filter(d => d.person === person) : data;

  // Build aggregated data by date (sum miles per date)
  const dateMap = {};
  filtered.forEach(row => {
    const d = row.date;
    const miles = Number(row["miles run"]);
    if (!dateMap[d]) dateMap[d] = 0;
    dateMap[d] += miles;
  });

  const chartData = Object.keys(dateMap).sort().map(date => ({
    date,
    "miles run": Number(dateMap[date].toFixed(2)),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="miles run" stroke="#2563EB" strokeWidth={2} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
