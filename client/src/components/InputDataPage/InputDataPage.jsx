import { useState } from "react";
import InputForm from "../InputDataPage/InputForm";
import ResultTable from "../InputDataPage/ResultTable";
import GanttChart from "../InputDataPage/GanttChart";
import { runFCFS } from "../../algorithm/fcfs.js";
import { runLJF } from "../../algorithm/ljf.js";
import { runSJF } from "../../algorithm/sjf.js";
import { runRR } from "../../algorithm/rr.js";
import { runPriority } from "../../algorithm/priority.js";

export default function InputDataPage() {
  const [selectedAlgo, setSelectedAlgo] = useState("fcfs");
  const [processes, setProcesses] = useState([]);
  const [arrivalTime, setArrivalTime] = useState("");
  const [burstTime, setBurstTime] = useState("");
  const [priority, setPriority] = useState("");
  const [timeQuantum, setTimeQuantum] = useState(2);

  const [result, setResult] = useState([]);
  const [ganttData, setGanttData] = useState([]);
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
    if (selectedAlgo === "priority") {
      if (priority === "") return;
      newProcess.priority = parseInt(priority);
    }
    setProcesses([...processes, newProcess]);
    setArrivalTime("");
    setBurstTime("");
    setPriority("");
  };

  const runSimulation = () => {
    let simulationResult;
    switch (selectedAlgo) {
      case "fcfs":
        simulationResult = runFCFS(processes);
        break;
      case "sjfs":
        simulationResult = runSJF(processes);
        break;
      case "ljfs":
        simulationResult = runLJF(processes);
        break;
      case "rr":
        simulationResult = runRR(processes, parseInt(timeQuantum));
        break;
      case "priority":
        simulationResult = runPriority(processes);
        break;
      default:
        console.error("Unknown algorithm selected.");
        return;
    }

    const {
      result,
      gantt,
      totalTime,
      avgWaitingTime,
      avgTurnaroundTime,
      cpuUtilization,
    } = simulationResult;

    setResult(result);
    setGanttData([]);
    setTotalTime(totalTime);
    setAvgWaitingTime(avgWaitingTime);
    setAvgTurnaroundTime(avgTurnaroundTime);
    setCpuUtilization(cpuUtilization);
    gantt.forEach((block, index) => {
      setTimeout(() => {
        setGanttData((prev) => [...prev, block]);
      }, index * 1000);
    });
  };

  return (
    <div className="dark:text-white min-h-screen bg-gray-100 dark:bg-gray-800 p-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-md shadow-md p-6">
        <h1 className="text-xl font-bold text-center text-blue-600 dark:text-white mb-4">
          CPU Scheduling ({selectedAlgo.toUpperCase()})
        </h1>

        <div className="mb-4">
          <label className="block font-medium mb-1 dark:text-gray-400">
            Select Algorithm:
          </label>
          <select
            value={selectedAlgo}
            onChange={(e) => setSelectedAlgo(e.target.value)}
            className="w-full border border-slate-700  rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
          >
            <option value="fcfs">FCFS</option>
            <option value="ljfs">LJFS</option>
            <option value="sjfs">SJFS</option>
            <option value="rr">RR</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        <InputForm
          arrivalTime={arrivalTime}
          burstTime={burstTime}
          priority={priority}
          selectedAlgo={selectedAlgo}
          setSelectedAlgo={setSelectedAlgo}
          onArrivalChange={(e) => setArrivalTime(e.target.value)}
          onBurstChange={(e) => setBurstTime(e.target.value)}
          onPriorityChange={(e) => setPriority(e.target.value)}
          onAdd={addProcess}
        />

        {selectedAlgo === "rr" && (
          <div className="mb-4">
            <label className="block mb-1 dark:text-gray-400">
              Time Quantum:
            </label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
              value={timeQuantum}
              onChange={(e) => setTimeQuantum(e.target.value)}
            />
          </div>
        )}

        {processes.length > 0 && (
          <div className="mb-4">
            <h2 className="font-semibold mb-2 dark:text-white">
              Process List:
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-sm dark:text-gray-300">
              {processes.map((p) => (
                <li key={p.id}>
                  P{p.id} - Arrival: {p.arrivalTime}, Burst: {p.burstTime}
                  {p.priority !== undefined && `, Priority: ${p.priority}`}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={runSimulation}
          disabled={processes.length === 0}
          className="cursor-pointer w-full flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
        >
          Run Simulation
        </button>

        {result.length > 0 && (
          <div className="mt-6 space-y-6">
            <ResultTable
              result={result}
              totalTime={totalTime}
              avgWaitingTime={avgWaitingTime}
              avgTurnaroundTime={avgTurnaroundTime}
              cpuUtilization={cpuUtilization}
            />
            <GanttChart ganttData={ganttData} />
          </div>
        )}
      </div>
    </div>
  );
}
