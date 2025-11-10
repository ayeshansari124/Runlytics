export const calculateMetrics = (data) => {
  if (!data || data.length === 0) return null;

  const miles = data.map(d => Number(d["miles run"]));
  const overall = {
    avg: (miles.reduce((a,b) => a + b, 0) / miles.length).toFixed(2),
    min: Math.min(...miles),
    max: Math.max(...miles)
  };

  const perPerson = {};
  data.forEach(d => {
    if (!perPerson[d.person]) perPerson[d.person] = [];
    perPerson[d.person].push(Number(d["miles run"]));
  });

  const perPersonMetrics = {};
  Object.entries(perPerson).forEach(([name, arr]) => {
    perPersonMetrics[name] = {
      avg: (arr.reduce((a,b) => a + b, 0) / arr.length).toFixed(2),
      min: Math.min(...arr),
      max: Math.max(...arr)
    };
  });

  return { overall, perPerson: perPersonMetrics };
};
