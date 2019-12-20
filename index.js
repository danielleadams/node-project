const { Worker, parentPort } = require('worker_threads');
const THREADS = 100;

let worker, threadCount = 0;

for (let i = 1; i <= THREADS; i++) {
  worker = new Worker("./tick.js", { workerData: i });

  worker.on('message', ({ id, date }) => {
    threadCount++;

    if (threadCount === THREADS)
      console.log(`Thread ${id} ends: ${date}`);
  });
}
