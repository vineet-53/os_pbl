import Encryptor from "file-encryptor";
var key = "encryption key";
var options = { algorithm: "sha256" };

function simulateProcessing(fileName) {
  const time = Math.floor(Math.random() * 3000) + 1000;
  console.log(`Processing: ${fileName} for ${time}ms`);
  return new Promise((resolve) => setTimeout(resolve, time));
}

export async function processFilesFCFS(fileQueue) {
  const results = [];

  for (const { file, arrivalTime } of fileQueue) {
    console.log(
      `⏳ Starting: ${file.originalname} at ${new Date(arrivalTime).toISOString()}`,
    );

    const start = Date.now();

    // mimicing some processing like encryption or decryption of the file.
    await simulateProcessing(file?.originalname);

    const end = Date.now();

    const burstTime = end - start; // BT: encryption duration

    console.log(
      `✅ Finished: ${file.originalname} at ${new Date(end).toISOString()}`,
    );
    console.log(`🕒 Burst Time: ${burstTime}ms`);

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
