import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
    const numCores = os.cpus().length;
    const workers = [];
    const results = [];
    for (let i = 0; i < numCores; i++) {
        const workerPath = path.resolve(__dirname, 'worker.js');
        const worker = new Worker(workerPath, { type: 'module' });
        const n = 10 + i;
        worker.postMessage(n);
        workers.push(new Promise((resolve) => {
            worker.on('message', (message) => {
                resolve({ status: message.status, data: message.data });
            });

            worker.on('error', (error) => {
                resolve({ status: 'error', data: null });
            });

            worker.on('exit', (code) => {
                if (code !== 0) {
                    resolve({ status: 'error', data: null });
                }
            });
        }));
    }
    const workerResults = await Promise.all(workers);
    results.push(...workerResults);
    console.log(results);
};
performCalculations();
