import React, { useState } from "react";

export default function InputDataPage() {
  const [processes, setProcesses] = useState([]);
  const [arrivalTime, setArrivalTime] = useState("");
  const [burstTime, setBurstTime] = useState("");
  const [result, setResult] = useState([]);
  const [ganttData, setGanttData] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const [totalTime, setTotalTime] = useState(0);
  const [cpuUtilization, setCpuUtilization] = useState(0);
  const [avgWaitingTime, setAvgWaitingTime] = useState(0);
  const [avgTurnaroundTime, setAvgTurnaroundTime] = useState(0);

  const addProcess = () => {
    if (arrivalTime === "" || burstTime === "") return;
    const newProcess = {
      id: processes.length + 1,
      arrivalTime: parseInt(arrivalTime),
      burstTime: parseInt(burstTime),
    };
    setProcesses([...processes, newProcess]);
    setArrivalTime("");
    setBurstTime("");
  };

  const runSimulation = () => {
    const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    let time = 0;
    const output = [];
    const gantt = [];

    sorted.forEach((p) => {
      if (p.arrivalTime > time) {
        gantt.push({
          id: "Idle",
          start: time,
          duration: p.arrivalTime - time,
        });
        time = p.arrivalTime;
      }

      const start = time;
      const completion = start + p.burstTime;
      const turnaround = completion - p.arrivalTime;
      const waiting = start - p.arrivalTime;

      output.push({
        ...p,
        start,
        completion,
        turnaround,
        waiting,
      });

      gantt.push({
        id: p.id,
        start,
        duration: p.burstTime,
      });

      time = completion;
    });

    // Metrics
    const totalBurstTime = sorted.reduce((sum, p) => sum + p.burstTime, 0);
    const endTime =
      gantt[gantt.length - 1].start + gantt[gantt.length - 1].duration;
    const totalWaiting = output.reduce((sum, p) => sum + p.waiting, 0);
    const totalTurnaround = output.reduce((sum, p) => sum + p.turnaround, 0);
    const avgWaiting = totalWaiting / output.length;
    const avgTurnaround = totalTurnaround / output.length;
    const utilization = (totalBurstTime / endTime) * 100;

    setResult(output);
    setGanttData([]);
    setTotalTime(endTime);
    setCpuUtilization(utilization.toFixed(2));
    setAvgWaitingTime(avgWaiting.toFixed(2));
    setAvgTurnaroundTime(avgTurnaround.toFixed(2));
    setIsAnimating(true);

    gantt.forEach((block, index) => {
      setTimeout(() => {
        setGanttData((prev) => [...prev, block]);
        if (index === gantt.length - 1) setIsAnimating(false);
      }, index * 1000);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">CPU Scheduling Input</h1>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="number"
            className="border p-2 rounded w-full"
            placeholder="Arrival Time"
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
          />
          <input
            type="number"
            className="border p-2 rounded w-full"
            placeholder="Burst Time"
            value={burstTime}
            onChange={(e) => setBurstTime(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={addProcess}
          >
            Add
          </button>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Processes:</h2>
          <ul className="space-y-1">
            {processes.map((p) => (
              <li key={p.id}>
                <span className="font-mono">
                  P{p.id} - Arrival: {p.arrivalTime}, Burst: {p.burstTime}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={runSimulation}
          disabled={processes.length === 0}
        >
          Run Simulation
        </button>

        {result.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Simulation Result (FCFS):
            </h2>
            <table className="w-full text-left border mt-2">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Process</th>
                  <th className="p-2 border">Arrival</th>
                  <th className="p-2 border">Burst</th>
                  <th className="p-2 border">Start</th>
                  <th className="p-2 border">Completion</th>
                  <th className="p-2 border">Turnaround</th>
                  <th className="p-2 border">Waiting</th>
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

            {/* New: Summary metrics */}
            <div className="mt-4 space-y-1 text-sm text-gray-800">
              <p>
                <strong>Total Time (Makespan):</strong> {totalTime}
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
        )}

        {ganttData.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Gantt Chart:</h2>
            <div className="overflow-x-auto max-w-full">
              <div className="flex items-center space-x-1 border p-3 rounded bg-gray-50 relative min-w-max">
                {ganttData.map((block, index) => (
                  <div
                    key={index}
                    className={`${
                      block.id === "Idle" ? "bg-gray-400" : "bg-blue-500"
                    } text-white text-sm text-center rounded p-2 transition-all duration-500 shadow relative`}
                    style={{ minWidth: `${block.duration * 30}px` }}
                  >
                    <div className="font-bold">
                      {block.id === "Idle" ? "Idle" : `P${block.id}`}
                    </div>
                    <div className="text-xs">
                      {block.start} - {block.start + block.duration}
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline scale */}
              <div className="flex space-x-1 mt-1 pl-1">
                {ganttData.map((block, index) => (
                  <div
                    key={index}
                    className="text-xs text-gray-700"
                    style={{ minWidth: `${block.duration * 30}px` }}
                  >
                    {block.start}
                  </div>
                ))}
                <div className="text-xs text-gray-700">
                  {ganttData[ganttData.length - 1].start +
                    ganttData[ganttData.length - 1].duration}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
