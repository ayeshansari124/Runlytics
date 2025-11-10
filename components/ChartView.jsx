import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

export default function ChartView({ data, person }) {
  const chartData = person
    ? data.filter(d => d.person === person)
    : data;

  return (
    <LineChart width={600} height={300} data={chartData}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="miles run" stroke="#8884d8" />
    </LineChart>
  );
}
