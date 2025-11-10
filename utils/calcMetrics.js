export const calculateMetrics = (data) => {
  const miles = data.map(d => Number(d["miles run"]));
  const overall = {
    avg: (miles.reduce((a,b)=>a+b,0)/miles.length).toFixed(2),
    min: Math.min(...miles),
    max: Math.max(...miles)
  };
  const perPerson = {};
  data.forEach(d => {
    if(!perPerson[d.person]) perPerson[d.person] = [];
    perPerson[d.person].push(Number(d["miles run"]));
  });
  const perPersonMetrics = Object.fromEntries(
    Object.entries(perPerson).map(([name, miles]) => [
      name,
      { avg: (miles.reduce((a,b)=>a+b,0)/miles.length).toFixed(2), min: Math.min(...miles), max: Math.max(...miles) }
    ])
  );
  return { overall, perPerson: perPersonMetrics };
};
