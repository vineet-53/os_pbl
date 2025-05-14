import { useState } from "react";
import { useLocation } from "react-router-dom";
import InputForm from "../InputDataPage/InputForm";
import ResultTable from "../InputDataPage/ResultTable";
import GanttChart from "../InputDataPage/GanttChart";
import { runFCFS } from "../../algorithm/fcfs.js";
import { runLJF } from "../../algorithm/ljf.js";
import { runSJF } from "../../algorithm/sjf.js";
import { runRR } from "../../algorithm/rr.js";
import { runPriority } from "../../algorithm/priority.js";

export default function InputDataPage() {
  const location = useLocation();
  const selectedAlgo = location.state?.selectedAlgo || "";

  const [processes, setProcesses] = useState([]);
  const [arrivalTime, setArrivalTime] = useState("");
  const [burstTime, setBurstTime] = useState("");
  const [priority, setPriority] = useState("");
  const [timeQuantum, setTimeQuantum] = useState(2); // Used only once

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
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-sky-700">
          CPU Scheduling Input ({selectedAlgo.toUpperCase()})
        </h1>

        <InputForm
          arrivalTime={arrivalTime}
          burstTime={burstTime}
          priority={priority}
          selectedAlgo={selectedAlgo}
          onArrivalChange={(e) => setArrivalTime(e.target.value)}
          onBurstChange={(e) => setBurstTime(e.target.value)}
          onPriorityChange={(e) => setPriority(e.target.value)}
          onAdd={addProcess}
        />

        {selectedAlgo === "rr" && (
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <label className="text-sm font-medium text-sky-600">
              Time Quantum:
            </label>
            <input
              type="number"
              className="border p-2 rounded w-full sm:w-40"
              placeholder="Time Quantum"
              value={timeQuantum}
              onChange={(e) => setTimeQuantum(e.target.value)}
            />
          </div>
        )}

        <div>
          {processes.length !== 0 ? (
            <h2 className="text-lg font-semibold text-sky-600">Processes:</h2>
          ) : (
            <></>
          )}
          <ul className="space-y-1">
            {processes.map((p) => (
              <li key={p.id}>
                <span className="font-mono">
                  P{p.id} - Arrival: {p.arrivalTime}, Burst: {p.burstTime}
                  {p.priority !== undefined && `, Priority: ${p.priority}`}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <button
          className="bg-green-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-green-600"
          onClick={runSimulation}
          disabled={processes.length === 0}
        >
          Run Simulation
        </button>

        {result.length > 0 && (
          <>
            <ResultTable
              result={result}
              totalTime={totalTime}
              avgWaitingTime={avgWaitingTime}
              avgTurnaroundTime={avgTurnaroundTime}
              cpuUtilization={cpuUtilization}
            />
            <GanttChart ganttData={ganttData} />
          </>
        )}
      </div>
    </div>
  );
}
