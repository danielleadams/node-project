const { Worker, parentPort } = require('worker_threads');
const add = require("./addons/add/build/Release/add").add;

const THREADS = 100;
const PORT = process.env.PORT || 8000;

let worker, threadCount;
let activeThreads = 0, totalThreads = 0;
let server = require('http');

function startThreads(threads) {
  threads = Number(threads);
  for (let i = 1; i <= threads; i = add(i, 1)) {
    worker = new Worker("./tick.js", { workerData: i });
    totalThreads = add(totalThreads, 1);
    activeThreads = add(activeThreads, 1);

    worker.on('message', ({ id, date }) => {
      threadCount = add(threadCount, 1);
      activeThreads--;

      if (threadCount === threads)
        console.log(`Thread ${id} ends: ${date}`);
    });
  }
}

function startServer(server) {
  return server.createServer((req, res) => {
    threadCount = 0;

    req.on('data', (chunk) => {
      let threads = JSON.parse(chunk).threads;
      startThreads(threads);
    });

    console.log(`Total Threads Active: ${activeThreads}`)
    console.log(`Total Threads Created: ${totalThreads}`);
    res.end("OK");
  });
}

server = startServer(server);

server.on('clientError', (_, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

exports.default = server;
