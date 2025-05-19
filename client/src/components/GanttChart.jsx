import React, { useState, useEffect, useRef } from "react";
import ProcessBar from "./ProcessBar.jsx";
import Timeline from "./Timeline.jsx";
import { Play, Pause, RotateCcw } from "lucide-react";
import { formatTime } from "../utils/timeUtils.js";

const GanttChart = ({ processes }) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);
  const [animate, setAnimate] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  // Find min and max times for scaling
  const minTime = Math.min(...processes.map((p) => p.arrivalTime));
  const maxTime = Math.max(...processes.map((p) => p.endTime));

  // Calculate time scale (px per ms)
  const timeScale = (containerWidth / (maxTime - minTime)) * 0.9; // 90% of container width to leave margins

  // Sort processes by start time
  const sortedProcesses = [...processes].sort(
    (a, b) => a.startTime - b.startTime,
  );

  // Update container width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const restartAnimation = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Process Scheduler Gantt Chart
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={restartAnimation}
            className="cursor-pointer p-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      <div ref={containerRef} className="relative overflow-x-auto">
        <div className="relative h-48 border-t border-b border-gray-200">
          <div
            className="absolute h-full w-full bg-gray-50 bg-opacity-50"
            style={{
              backgroundImage:
                "linear-gradient(rgba(156, 163, 175, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(156, 163, 175, 0.1) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>

          {sortedProcesses.map((process, index) => (
            <ProcessBar
              key={index}
              process={process}
              index={index}
              minTime={minTime}
              maxTime={maxTime}
              timeScale={timeScale}
              animate={animate}
              isPlaying={isPlaying}
            />
          ))}
        </div>

        <div className="mt-8">
          <h3 className="mb-2 text-lg font-semibold text-gray-700">
            Process Details
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Process</th>
                  <th className="px-4 py-2">Arrival Time</th>
                  <th className="px-4 py-2">Start Time</th>
                  <th className="px-4 py-2">End Time</th>
                  <th className="px-4 py-2">Burst Time</th>
                  <th className="px-4 py-2">Waiting Time</th>
                </tr>
              </thead>
              <tbody>
                {sortedProcesses.map((process) => (
                  <tr
                    key={process.file}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-2 font-medium text-gray-900">
                      {process.file}
                    </td>
                    <td className="px-4 py-2">
                      {formatTime(process.arrivalTime)}
                    </td>
                    <td className="px-4 py-2">
                      {formatTime(process.startTime)}
                    </td>
                    <td className="px-4 py-2">{formatTime(process.endTime)}</td>
                    <td className="px-4 py-2">
                      {formatTime(process.burstTime)}
                    </td>
                    <td className="px-4 py-2">
                      {formatTime(process.startTime - process.arrivalTime)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
