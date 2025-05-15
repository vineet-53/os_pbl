export default function GanttChart({ ganttData }) {
  if (ganttData.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 text-purple font-poppins">Gantt Chart:</h2>
      <div className="overflow-x-auto max-w-full">
        <div className="flex items-center space-x-1 border p-3 rounded bg-gray-50 relative min-w-max">
          {ganttData.map((block, index) => (
            <div
              key={index}
              className={`${
                block.id === "Idle" ? "bg-gray-400" : "bg-blue-500"
              } text-white text-sm text-center rounded p-5 transition-all duration-500 shadow relative`}
              style={{ minWidth: `${block.duration * 45}px` }}
            >
              <div className="">
                {block.id === "Idle" ? "Idle" : `P${block.id}`}
              </div>
              <div className="text-xs">
                {block.start}-{block.start + block.duration}
              </div>
            </div>
          ))}
        </div>

        {/* <div className="flex space-x-1 mt-1 pl-4">
          {ganttData.map((block, index) => (
            <div
              key={index}
              className="text-xs text-gray-700"
              style={{ minWidth: `${block.duration * 28}px` }}
            >
              {block.start}
            </div>
          ))}
          <div className="text-xs text-gray-700">
            {ganttData[ganttData.length - 1].start +
              ganttData[ganttData.length - 1].duration}
          </div>
        </div> */}
      </div>
    </div>
  );
}
