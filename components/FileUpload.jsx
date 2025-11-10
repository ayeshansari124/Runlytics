import { useState } from "react";

export default function FileUpload({ onData }) {
  const [error, setError] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const { parseCSV } = await import("../utils/parseCSV");
      const data = await parseCSV(file);
      onData(data);
      setError("");
    } catch (err) {
      setError(err.join(", "));
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFile} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
