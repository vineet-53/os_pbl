import React, { useState } from "react";
import Navbar from "../components/NavBar/NavBar";

const algorithms = {
  CPU: [
    {
      name: "FCFS (First Come First Serve)",
      definition:
        "A non-preemptive algorithm where the process that arrives first is executed first.",
      characteristics: [
        "Non-preemptive",
        "Simple to implement",
        "Processes executed in arrival order",
      ],
      advantages: ["Easy to implement", "Fair in terms of arrival time"],
      disadvantages: [
        "High average waiting time",
        "Convoy effect: short processes wait for long ones",
      ],
    },
    {
      name: "SJF (Shortest Job First)",
      definition:
        "Selects the process with the shortest burst time from available processes.",
      characteristics: [
        "Can be preemptive or non-preemptive",
        "Requires knowledge of burst time",
      ],
      advantages: ["Minimizes average waiting time"],
      disadvantages: [
        "Difficult to estimate burst time",
        "Starvation of longer processes",
      ],
    },
    {
      name: "LJF (Longest Job First)",
      definition:
        "Selects the process with the longest burst time from available processes.",
      characteristics: [
        "Can be preemptive or non-preemptive",
        "Opposite of SJF",
      ],
      advantages: ["Gives more CPU time to longer jobs"],
      disadvantages: [
        "Increases average waiting time",
        "Short jobs may starve",
      ],
    },
    {
      name: "Round Robin (RR)",
      definition:
        "Processes are assigned a fixed time quantum and executed in cyclic order.",
      characteristics: [
        "Preemptive",
        "Time quantum used",
        "Fair sharing of CPU",
      ],
      advantages: [
        "Good for time-sharing systems",
        "Reduces process starvation",
        "Improves system responsiveness",
      ],
      disadvantages: [
        "Higher average waiting time than SJF",
        "Frequent context switching overhead",
        "Performance depends on time quantum size",
      ],
    },
    {
      name: "Priority Scheduling",
      definition:
        "Processes are scheduled based on priority; higher priority processes run first.",
      characteristics: [
        "Can be preemptive or non-preemptive",
        "Requires priority assignment",
      ],
      advantages: [
        "Important tasks get CPU faster",
        "Flexible priority management",
        "Can improve overall system efficiency",
      ],
      disadvantages: [
        "Can cause starvation of low priority processes",
        "Priority inversion problem",
        "Complex priority assignment and management",
      ],
    },
  ],
  Disk: [
    {
      name: "FCFS (First Come First Serve)",
      definition: "Requests are served in the order they arrive.",
      characteristics: ["Simple and fair", "No starvation"],
      advantages: [
        "Easy to implement",
        "Fair to all requests",
        "Predictable behavior",
      ],
      disadvantages: [
        "Inefficient seek time",
        "Poor performance under heavy load",
        "Can cause long delays",
      ],
    },
    {
      name: "SSTF (Shortest Seek Time First)",
      definition: "Serves the request closest to the current head position.",
      characteristics: ["Minimizes seek time", "Can lead to starvation"],
      advantages: [
        "Better performance than FCFS",
        "Reduces average seek time",
        "Efficient for moderate load",
      ],
      disadvantages: [
        "Starvation possible for distant requests",
        "Unfair to far requests",
        "Complex implementation",
      ],
    },
    {
      name: "SCAN (Elevator Algorithm)",
      definition:
        "Head moves in one direction fulfilling requests then reverses.",
      characteristics: ["Prevents starvation", "More uniform wait time"],
      advantages: [
        "Efficient for large queues",
        "Fairer than SSTF",
        "Prevents starvation",
      ],
      disadvantages: [
        "Longer waiting time for edge requests",
        "More complex than FCFS and SSTF",
        "Can cause uneven wait times",
      ],
    },
    {
      name: "LOOK",
      definition:
        "Similar to SCAN but the head only goes as far as the furthest request in each direction before reversing.",
      characteristics: [
        "More efficient than SCAN",
        "Prevents unnecessary movement",
        "Reduces seek time",
      ],
      advantages: [
        "Better average seek time than SCAN",
        "Reduces total head movement",
        "Improves overall disk efficiency",
      ],
      disadvantages: [
        "Slightly more complex than SCAN",
        "May cause slightly uneven wait times",
        "Implementation overhead",
      ],
    },
  ],
};


const AlgorithmCard = ({ algo }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-800 text-white p-5 rounded-2xl shadow-lg transition-all duration-300 border border-cyan-600">
      <div
        className="cursor-pointer flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        <h3 className="text-xl font-bold">{algo.name}</h3>
        <span className="text-cyan-300">{open ? "−" : "+"}</span>
      </div>
      {open && (
        <div className="mt-4 text-lg space-y-4">
          <div>
            <strong>Definition:</strong>
            <p>{algo.definition}</p>
          </div>
          <div>
            <strong>Characteristics:</strong>
            <ul className="list-disc list-inside">
              {algo.characteristics.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Advantages:</strong>
            <ul className="list-disc list-inside text-green-300">
              {algo.advantages.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Disadvantages:</strong>
            <ul className="list-disc list-inside text-red-300">
              {algo.disadvantages.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const DocsPage = () => {
  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-[#0a1f2b] text-white p-6">
        <h1 className="text-4xl font-bold text-center mb-10">
          📚 Scheduling Algorithms Documentation
        </h1>

        <div className="max-w-6xl mx-auto space-y-16">
          <section>
            <h2 className="text-2xl mb-6 font-semibold border-b border-cyan-500 pb-2">
              🧠 CPU Scheduling Algorithms
            </h2>
            <div className="grid md:grid-cols-1 gap-6">
              {algorithms.CPU.map((algo, i) => (
                <AlgorithmCard key={i} algo={algo} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl mb-6 font-semibold border-b border-cyan-500 pb-2">
              💽 Disk Scheduling Algorithms
            </h2>
            <div className="grid md:grid-cols-1 gap-6">
              {algorithms.Disk.map((algo, i) => (
                <AlgorithmCard key={i} algo={algo} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default DocsPage;
