import Papa from "papaparse";

export const parseCSV = (file) =>
  new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const errors = [];
        const data = results.data.map((row, index) => {
          if (!row.date || !row.person || !row["miles run"]) {
            errors.push(`Row ${index + 1} missing fields`);
          }
          if (isNaN(Number(row["miles run"]))) {
            errors.push(`Row ${index + 1}: miles run not a number`);
          }
          if (isNaN(new Date(row.date))) {
            errors.push(`Row ${index + 1}: invalid date`);
          }
          return row;
        });
        if (errors.length) reject(errors);
        else resolve(data);
      },
    });
  });
