"use client";
import { useState } from "react";

export default function FileUpload({ onData }: { onData: any }) {
  const [error, setError] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { parseCSV } = await import("../utils/parseCSV");
      const data = await parseCSV(file);
      onData(data);
      setError("");
    } catch (err) {
      setError(Array.isArray(err) ? err.join(" • ") : String(err));
    }
  };

  return (
    <div className="space-y-3">
      <input type="file" accept=".csv" onChange={handleFile} className="block w-full text-sm border rounded-md p-3 cursor-pointer bg-black/10 focus:outline-none focus:ring-2 focus:ring-zinc-900" />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
