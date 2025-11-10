export interface Metrics {
  overall: {
    avg: number;
    min: number;
    max: number;
  };
  perPerson: Record<string, { avg: number; min: number; max: number }>;
}

export const calculateMetrics = (rows: { date: string; person: string; milesRun: number }[]): Metrics => {
  if (!rows.length) {
    return { overall: { avg: 0, min: 0, max: 0 }, perPerson: {} };
  }

  const allMiles = rows.map((r) => r.milesRun);
  const overall = {
    avg: Number((allMiles.reduce((a, b) => a + b, 0) / allMiles.length).toFixed(2)), // convert back to number
    min: Math.min(...allMiles),
    max: Math.max(...allMiles),
  };

  const perPerson: Record<string, { avg: number; min: number; max: number }> = {};
  const grouped: Record<string, number[]> = {};

  rows.forEach((r) => {
    if (!grouped[r.person]) grouped[r.person] = [];
    grouped[r.person].push(r.milesRun);
  });

  for (const [person, miles] of Object.entries(grouped)) {
    perPerson[person] = {
      avg: Number((miles.reduce((a, b) => a + b, 0) / miles.length).toFixed(2)),
      min: Math.min(...miles),
      max: Math.max(...miles),
    };
  }

  return { overall, perPerson };
};
