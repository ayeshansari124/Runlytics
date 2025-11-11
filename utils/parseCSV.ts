import Papa from "papaparse";

export interface CsvRow {
  date: string;
  person: string;
  "miles run": number;
}

export const parseCSV = (file: File): Promise<CsvRow[]> =>
  new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const errors: string[] = [];
        const headers = results.meta.fields || [];
        const required = ["date", "person", "miles run"];

        if (!required.every(h => headers.includes(h))) 
          return reject([`CSV missing headers: ${required.join(", ")}`]);

        const data: CsvRow[] = (results.data as any[]).map((row, i) => {
          const date = row.date?.trim() || "";
          const person = row.person?.trim() || "";
          let miles = parseFloat((row["miles run"] ?? "0").toString().replace(/,/g, ""));
          if (!date) errors.push(`Row ${i+1}: missing date`);
          if (!person) errors.push(`Row ${i+1}: missing person`);
          if (isNaN(miles)) { miles = 0; errors.push(`Row ${i+1}: invalid miles run`); }
          if (date && isNaN(new Date(date).getTime())) errors.push(`Row ${i+1}: invalid date`);
          return { date, person, "miles run": miles };
        });

        errors.length ? reject(errors) : resolve(data);
      },
      error: (err) => reject([err.message || "Failed to parse CSV"])
    });
  });
