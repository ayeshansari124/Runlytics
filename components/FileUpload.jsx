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
    <div className="space-y-2">
      <input
        type="file"
        accept=".csv"
        onChange={handleFile}
        className="block w-full text-sm text-gray-600 border border-gray-300 rounded-md p-2 cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}
