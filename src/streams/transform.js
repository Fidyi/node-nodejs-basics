import { Transform } from 'stream';

const reverseText = new Transform({
  transform(chunk, encoding, callback) {
    const reversedChunk = chunk.toString().split('').reverse().join('');
    this.push(reversedChunk);
    callback();
  }
});

const transform = async () => {
    process.stdin.pipe(reverseText).pipe(process.stdout);
};

await transform();