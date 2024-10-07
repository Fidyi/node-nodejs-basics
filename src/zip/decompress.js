import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
    const archivePath = path.join(__dirname, 'files', 'archive.gz');
    const fileToDecompressPath = path.join(__dirname, 'files', 'fileToCompress.txt');
    const readableStream = fs.createReadStream(archivePath);
    const gunzip = zlib.createGunzip();
    const writableStream = fs.createWriteStream(fileToDecompressPath);
    readableStream.pipe(gunzip).pipe(writableStream);
};
await decompress();
