const { workerData, parentPort } = require('worker_threads');

(function() {
  parentPort.postMessage({
    id: workerData,
    date: new Date()
  });
})();
