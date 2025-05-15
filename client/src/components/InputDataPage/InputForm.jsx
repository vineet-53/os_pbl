export default function InputForm({
  arrivalTime,
  burstTime,
  priority,
  selectedAlgo,
  onArrivalChange,
  onBurstChange,
  onPriorityChange,
  onAdd,
}) {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-4">
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium">Arrival Time</label>
        <input
          type="number"
          className="border border-slate-700 rounded px-3 py-2"
          placeholder="e.g. 0"
          value={arrivalTime}
          onChange={onArrivalChange}
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium">Burst Time</label>
        <input
          type="number"
          className="border border-slate-700 rounded px-3 py-2"
          placeholder="e.g. 5"
          value={burstTime}
          onChange={onBurstChange}
        />
      </div>

      {selectedAlgo === "priority" && (
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Priority</label>
          <input
            type="number"
            className="border border-slate-700 rounded px-3 py-2"
            placeholder="e.g. 2"
            value={priority}
            onChange={onPriorityChange}
          />
        </div>
      )}

      <div className="flex items-end">
        <button
          onClick={onAdd}
          className="cursor-pointer flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}
