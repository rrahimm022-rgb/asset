"use client";

import { useState, useMemo } from "react";

interface MapRow {
  id: string;
  oldId: string;
  newId: string;
  type: string;
}

export default function Home() {
  const [kind, setKind] = useState("Animation");
  const [paste, setPaste] = useState("");
  const [oldId, setOldId] = useState("");
  const [newId, setNewId] = useState("");
  const [rows, setRows] = useState<MapRow[]>([]);
  const [msg, setMsg] = useState("Your mappings stay in this browser session.");

  // Menggunakan Array.from dan Set yang aman untuk TypeScript & Vercel
  const found = useMemo(() => Array.from(new Set(paste.match(/\d{3,}/g) || [])), [paste]);

  function addDetected() {
    if (!found.length) {
      setMsg("Paste asset IDs first.");
      return;
    }
    setRows((prev) => {
      const known = new Set(prev.map((x) => x.oldId));
      return [
        ...found
          .filter((x) => !known.has(x))
          .map((x) => ({ id: x, oldId: x, newId: "", type: kind })),
        ...prev,
      ];
    });
    setMsg(`Detected ${found.length} unique ID(s). Fill replacement IDs in the table.`);
  }

  function addPair() {
    const a = oldId.match(/\d+/)?.[0];
    const b = newId.match(/\d+/)?.[0];
    if (!a || !b) {
      setMsg("Both IDs must contain a numeric asset ID.");
      return;
    }
    if (a === b) {
      setMsg("The original and replacement IDs must be different.");
      return;
    }
    setRows((prev) => [{ id: a, oldId: a, newId: b, type: kind }, ...prev.filter((r) => r.oldId !== a)]);
    setOldId("");
    setNewId("");
    setMsg("Mapping saved in this browser session.");
  }

  function update(id: string, value: string) {
    const v = value.match(/\d+/)?.[0] || "";
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, newId: v } : r)));
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Roblox Asset ID Mapper</h1>
      <p className="mb-4 text-gray-600">{msg}</p>
      
      <div className="mb-4 flex gap-2">
        <textarea
          className="border p-2 w-full rounded"
          rows={3}
          placeholder="Paste text containing IDs here..."
          value={paste}
          onChange={(e) => setPaste(e.target.value)}
        />
        <button
          onClick={addDetected}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 whitespace-nowrap"
        >
          Detect IDs
        </button>
      </div>

      <div className="border rounded p-4 bg-gray-50">
        <h2 className="font-semibold mb-2">Mappings ({rows.length})</h2>
        {rows.length === 0 ? (
          <p className="text-gray-500 text-sm">No mappings added yet.</p>
        ) : (
          <ul>
            {rows.map((row) => (
              <li key={row.id} className="flex gap-2 mb-2 items-center">
                <span className="w-1/3 text-sm">Old: {row.oldId}</span>
                <input
                  type="text"
                  className="border p-1 rounded w-1/3"
                  placeholder="New ID"
                  value={row.newId}
                  onChange={(e) => update(row.id, e.target.value)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
