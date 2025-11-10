import Papa from "papaparse";

export const parseCSV = (file) =>
  new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const errors = [];
        const headers = results.meta.fields || [];
        const expected = ["date", "person", "miles run"];
        if (!expected.every(h => headers.includes(h))) {
          return reject(["Invalid CSV headers. Required: date, person, miles run"]);
        }

        const parsed = results.data.map((row, index) => {
          if (!row.date || !row.person || row["miles run"] === undefined || row["miles run"] === "") {
            errors.push(`Row ${index + 1} missing required fields`);
          }
          const miles = parseFloat(row["miles run"]);
          if (isNaN(miles)) errors.push(`Row ${index + 1}: miles run is not a number`);
          if (isNaN(new Date(row.date))) errors.push(`Row ${index + 1}: invalid date`);
          return { date: row.date, person: row.person, "miles run": miles };
        });

        if (errors.length) return reject(errors);
        resolve(parsed);
      },
      error: (err) => reject([err.message || "Failed to parse CSV"]),
    });
  });
