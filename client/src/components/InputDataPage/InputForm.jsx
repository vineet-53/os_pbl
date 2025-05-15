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
    <div className="flex flex-col text-purple gap-4 sm:flex-row justify-center sm:items-end sm:flex-wrap">
      <input
        type="number"
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:purple"
        placeholder="Arrival Time"
        value={arrivalTime}
        onChange={onArrivalChange}
      />
      <input
        type="number"
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:purple"
        placeholder="Burst Time"
        value={burstTime}
        onChange={onBurstChange}
      />

      {selectedAlgo === "priority" && (
        <input
          type="number"
          className="border p-2 rounded w-full sm:w-40 focus:outline-none focus:ring-2 focus:purple"
          placeholder="Priority"
          value={priority}
          onChange={onPriorityChange}
        />
      )}

      <button
        className=" bg-violet-700 text-white cursor-pointer px-4 py-2 rounded hover:bg-violet-500"
        onClick={onAdd}
      >
        Add
      </button>
    </div>
  );
}
