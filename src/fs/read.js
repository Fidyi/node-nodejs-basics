import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const read = async () => {
    const filePath = path.join(__dirname,'files', 'fileToRead.txt');
    try {
        await fs.access(filePath);
    } catch (err) {
        throw new Error('FS operation failed');
    }
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        console.log(content);
    } catch (err) {
        console.error(err.message);
        throw new Error('FS operation failed');
    }
};
await read();