import crypto from "crypto";
import fs from "fs";
import {fileURLToPath} from "url";
import { dirname } from 'path';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const calculateHash = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');
    const hash = crypto.createHash('sha256');
    const fileStream = fs.createReadStream(filePath);
    fileStream.on("data", (chunk) => {
        hash.update(chunk);
    })
    return new Promise((resolve, reject) => {
        fileStream.on('end', () => {
            const fileHash = hash.digest('hex');
            console.log(`SHA256 hash: ${fileHash}`);
            resolve(fileHash);
        });
        fileStream.on('error', (err) => {
            console.error('Error reading the file', err);
            reject(err);
        });
    });
};

await calculateHash();