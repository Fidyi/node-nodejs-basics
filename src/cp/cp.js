import { spawn } from 'child_process';
import path from 'path';

const spawnChildProcess = async (args) => {
    const scriptPath = path.resolve('src/cp/files/script.js');
    const child = spawn('node', [scriptPath, ...args], {
        stdio: ['pipe', 'pipe', 'inherit']
    });
    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);
    child.on('close', (code) => {
        console.log(`Child process exited ${code}`);
    });
};
spawnChildProcess(['arg1', 'arg2']);
