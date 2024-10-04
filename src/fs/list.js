import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const list = async () => {
   const dirPath = path.join(__dirname, 'files');
   try {
        await fs.access(dirPath);
   } catch(err) {
    throw new Error('FS operation falied');
   }
   try {
    const files = await fs.readdir(dirPath);
    console.log(files)
   } catch (err) {
    console.error(err.message);
    throw new Error('FS operation falied');
   }
};
await list();