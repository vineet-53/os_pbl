async function simulateProcessing(fileName) {
  const time = Math.floor(Math.random() * 3000) + 1000;
  return new Promise((resolve) => setTimeout(resolve, time));
}

export async function processFilesFCFS(fileQueue) {
  const results = [];

  for (const { file, arrivalTime } of fileQueue) {
    const start = Date.now();

    // mimicing some processing like encryption or decryption of the file.
    await simulateProcessing(file?.originalname);
    const end = Date.now();
    const burstTime = end - start; // BT: encryption duration

    results.push({
      file: file.originalname,
      arrivalTime,
      startTime: start,
      endTime: end,
      burstTime,
    });
  }
  return results;
}

export async function processFilesSJFS(fileQueue) {
  const results = [];

  fileQueue.sort((a, b) => a.burstTime - b.burstTime);

  for (const { file, arrivalTime } of fileQueue) {
    const start = Date.now();

    await simulateProcessing(file?.originalname);

    const end = Date.now();

    const burstTime = end - start;

    results.push({
      file: file.originalname,
      arrivalTime,
      startTime: start,
      endTime: end,
      burstTime,
    });
  }

  return results;
}
export async function processFilesLJFS(fileQueue) {
  const results = [];

  fileQueue.sort((a, b) => b.burstTime - a.burstTime);

  for (const { file, arrivalTime } of fileQueue) {
    const start = Date.now();

    await simulateProcessing(file?.originalname);

    const end = Date.now();

    const burstTime = end - start;

    results.push({
      file: file.originalname,
      arrivalTime,
      startTime: start,
      endTime: end,
      burstTime,
    });
  }

  return results;
}
