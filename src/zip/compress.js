import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
    const fileToComprePath = path.join(__dirname, 'files', 'fileToCompress.txt');
    const archivePath = path.join(__dirname, 'files', 'archive.gz');
    const readableStream = fs.createReadStream(fileToComprePath);
    const gzip = zlib.createGzip();
    const writableStream = fs.createWriteStream(archivePath);
    readableStream.pipe(gzip).pipe(writableStream);
};

await compress();