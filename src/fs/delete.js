import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const remove = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToRemove.txt');
    try {
        await fs.access(filePath);
    } catch (err) {
        throw new Error('FS operation failed');
    }
    try {
        await fs.unlink(filePath);
        console.log(`File ${filePath} was deleted successfully`);
    } catch (err) {
        console.error(err.message);
        throw new Error('FS operation failed');
    }
};
await remove();