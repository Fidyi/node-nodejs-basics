import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
    const writableStream = fs.createWriteStream(filePath);
    process.stdin.pipe(writableStream);
};

await write();