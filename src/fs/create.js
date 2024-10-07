import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const create = async () => {
    const filePath = path.join(__dirname, 'files', 'fresh.txt');
    const content = 'I am fresh and young';

    try {
        try {
            await fs.access(filePath);
            throw new Error('FS operation failed');
        } catch (err) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
        }
        await fs.writeFile(filePath, content, { flag: 'wx' });
        console.log(`File fresh.txt was created successfully inside ${filePath}`);
    } catch (err) {
        console.error(err.message);
        throw new Error('FS operation failed');
    }
};

await create();