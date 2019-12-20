const { Worker, parentPort } = require('worker_threads');
const add = require("./addons/add/build/Release/add").add;

const THREADS = 100;
const PORT = process.env.PORT || 8000;

let worker, threadCount;
let server = process.env.DEV ? require('http') : require('https');

function startThreads(threads) {
  for (let i = 1; i <= threads; i = add(i, 1)) {
    worker = new Worker("./tick.js", { workerData: i });

    worker.on('message', ({ id, date }) => {
      threadCount = add(threadCount, 1);

      if (threadCount === threads)
      console.log(`Thread ${id} ends: ${date}`);
    });
  }
}

server = server.createServer((req, res) => {
  threadCount = 0;

  req.on('data', (chunk) => {
    let threads = JSON.parse(chunk).threads;
    startThreads(threads);
  });

  res.end("OK");
});

server.on('clientError', (_, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
