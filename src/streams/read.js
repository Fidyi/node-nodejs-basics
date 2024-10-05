import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const read = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
    const readableStream = fs.createReadStream(filePath, 'utf8');
    readableStream.pipe(process.stdout);
};
await read();