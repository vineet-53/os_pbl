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
    <div className="flex flex-col gap-4 sm:flex-row justify-center sm:items-end sm:flex-wrap">
      <input
        type="number"
        className="border p-2 rounded"
        placeholder="Arrival Time"
        value={arrivalTime}
        onChange={onArrivalChange}
      />
      <input
        type="number"
        className="border p-2 rounded"
        placeholder="Burst Time"
        value={burstTime}
        onChange={onBurstChange}
      />

      {selectedAlgo === "priority" && (
        <input
          type="number"
          className="border p-2 rounded w-full sm:w-40"
          placeholder="Priority"
          value={priority}
          onChange={onPriorityChange}
        />
      )}

      <button
        className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded hover:bg-blue-600"
        onClick={onAdd}
      >
        Add
      </button>
    </div>
  );
}
