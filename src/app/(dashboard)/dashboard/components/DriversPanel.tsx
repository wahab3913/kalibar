export default function DriversPanel() {
  const rows = [
    { name: 'Alex D', onTime: '96%', exceptions: 2, trend: '+2%' },
    { name: 'Jordan K', onTime: '92%', exceptions: 4, trend: '+8%' },
    { name: 'Sam P', onTime: '85%', exceptions: 6, trend: '-3%' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 text-sm">
        <button className="px-3 py-1.5 rounded-md bg-black/5">Daily</button>
        <button className="px-3 py-1.5 rounded-md">Weekly</button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-black/10 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-black/5">
            <tr>
              <th className="text-left px-4 py-2 font-medium">Driver</th>
              <th className="text-left px-4 py-2 font-medium">On-time</th>
              <th className="text-left px-4 py-2 font-medium">Exceptions</th>
              <th className="text-left px-4 py-2 font-medium">Trend</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-t border-black/5">
                <td className="px-4 py-2">{r.name}</td>
                <td className="px-4 py-2">{r.onTime}</td>
                <td className="px-4 py-2">{r.exceptions}</td>
                <td className="px-4 py-2">{r.trend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="rounded-lg border border-black/10 p-4 bg-white">
        <div className="font-medium">Excel Upload (UI only)</div>
        <div className="mt-2 text-sm text-black/70">Drag and drop or choose file</div>
        <div className="mt-3 flex items-center gap-2">
          <input type="file" className="text-sm" />
          <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm">Upload</button>
        </div>
      </div>
    </div>
  );
}


