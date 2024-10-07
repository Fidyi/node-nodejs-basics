import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rename = async () => {
    const oldFilePath = path.join(__dirname, 'files', 'wrongFilename.txt');
    const newFilePath = path.join(__dirname, 'files', 'properFilename.md');
    try {
        await fs.access(oldFilePath);
    } catch (err) {
        throw new Error('FS operation failed');
    }
    try {
        await fs.access(newFilePath);
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
    }
    try {
        await fs.rename(oldFilePath, newFilePath);
        console.log(`File renamed from ${oldFilePath} to ${newFilePath}`);
    } catch (err) {
        console.error(err.message);
        throw new Error('FS operation failed');
    }
};
await rename();