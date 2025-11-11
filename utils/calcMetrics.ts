import { CsvRow } from "./parseCSV";

export interface Metrics {
  overall: { avg: number; min: number; max: number };
  perPerson: Record<string, { avg: number; min: number; max: number }>;
}

export const calculateMetrics = (rows: CsvRow[]): Metrics => {
  if (!rows.length) return { overall: { avg: 0, min: 0, max: 0 }, perPerson: {} };

  const allMiles = rows.map(r => r["miles run"] ?? 0);
  const sum = allMiles.reduce((a,b)=>a+b,0);
  const overall = { avg: +(sum/allMiles.length).toFixed(2), min: Math.min(...allMiles), max: Math.max(...allMiles) };

  const grouped: Record<string, number[]> = {};
  rows.forEach(r => (grouped[r.person] = [...(grouped[r.person]||[]), r["miles run"]]));

  const perPerson: Record<string,{avg:number;min:number;max:number}> = {};
  Object.entries(grouped).forEach(([name,miles])=>{
    const total = miles.reduce((a,b)=>a+b,0);
    perPerson[name] = { avg: +(total/miles.length).toFixed(2), min: Math.min(...miles), max: Math.max(...miles) };
  });

  return { overall, perPerson };
};
