import { useState } from "react";

export default function FileUpload({ onData }) {
  const [error, setError] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { parseCSV } = await import("../utils/parseCSV");
      const data = await parseCSV(file);
      onData(data);
      setError("");
    } catch (err) {
      const msg = Array.isArray(err) ? err.join(" • ") : String(err);
      setError(msg);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block">
        <input
          type="file"
          accept=".csv"
          onChange={handleFile}
          className="block w-full text-sm border rounded-md p-3 cursor-pointer bg-black/10 text-white focus:outline-none focus:ring-2 focus:ring-zinc-900"
        />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
