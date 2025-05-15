export default function ResultTable({
  result,
  totalTime,
  avgWaitingTime,
  avgTurnaroundTime,
  cpuUtilization,
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 text-sky-600">
        Simulation Result:
      </h2>
      <table className="w-full border mt-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Process ID</th>
            <th className="p-2 border">Arrival Time</th>
            <th className="p-2 border">Burst TIme</th>
            <th className="p-2 border">Start Time</th>
            <th className="p-2 border">Completion Time</th>
            <th className="p-2 border">Turn Around Time</th>
            <th className="p-2 border">Waiting Time</th>
          </tr>
        </thead>
        <tbody>
          {result.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2 border">P{p.id}</td>
              <td className="p-2 border">{p.arrivalTime}</td>
              <td className="p-2 border">{p.burstTime}</td>
              <td className="p-2 border">{p.start}</td>
              <td className="p-2 border">{p.completion}</td>
              <td className="p-2 border">{p.turnaround}</td>
              <td className="p-2 border">{p.waiting}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 space-y-1 text-base text-gray-800">
        <p>
          <strong>Total Time:</strong> {totalTime}
        </p>
        <p>
          <strong>CPU Utilization:</strong> {cpuUtilization}%
        </p>
        <p>
          <strong>Average Waiting Time:</strong> {avgWaitingTime}
        </p>
        <p>
          <strong>Average Turnaround Time:</strong> {avgTurnaroundTime}
        </p>
      </div>
    </div>
  );
}
