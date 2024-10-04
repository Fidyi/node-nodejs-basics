import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const copy = async () => {
    const sourceDir = path.join(__dirname, 'files');
    const destDir = path.join(__dirname, 'files_copy');
    try {
        await fs.access(sourceDir);
    } catch (err) {
        throw new Error('FS operation failed');
    }
    try {
        await fs.access(destDir);
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
    }
    try {
        const files = await fs.readdir(sourceDir);
        await fs.mkdir(destDir);
        await Promise.all(files.map(async (file) => {
            const srcFile = path.join(sourceDir, file);
            const destFile = path.join(destDir, file);
            await fs.copyFile(srcFile, destFile);
        }));

        console.log(`Files copied successfully from ${sourceDir} to ${destDir}`);
    } catch (err) {
        console.error(err.message);
        throw new Error('FS operation failed');
    }
};
await copy();