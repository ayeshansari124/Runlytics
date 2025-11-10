import Papa from "papaparse";

interface CsvRow {
  date: string;
  person: string;
  "miles run": number;
}

/**
 * Parses a CSV file and validates its structure.
 * @param file - The CSV file to parse (File object from input)
 * @returns A promise that resolves with parsed data or rejects with validation errors.
 */
export const parseCSV = (file: File): Promise<CsvRow[]> =>
  new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const errors: string[] = [];
        const headers = results.meta.fields || [];
        const expected = ["date", "person", "miles run"];

        // ✅ Validate required headers
        if (!expected.every((h) => headers.includes(h))) {
          return reject([
            "Invalid CSV headers. Required: date, person, miles run",
          ]);
        }

        // ✅ Validate data rows
        const parsed: CsvRow[] = (results.data as any[]).map((row, index) => {
          if (
            !row.date ||
            !row.person ||
            row["miles run"] === undefined ||
            row["miles run"] === ""
          ) {
            errors.push(`Row ${index + 1}: missing required fields`);
          }

          const miles = parseFloat(row["miles run"]);
          if (isNaN(miles))
            errors.push(`Row ${index + 1}: miles run is not a number`);
          if (isNaN(new Date(row.date).getTime()))
            errors.push(`Row ${index + 1}: invalid date`);

          return { date: row.date, person: row.person, "miles run": miles };
        });

        if (errors.length) return reject(errors);
        resolve(parsed);
      },
      error: (err) => reject([err.message || "Failed to parse CSV"]),
    });
  });
