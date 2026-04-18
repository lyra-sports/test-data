import { createDataFileContent } from './generators';
import * as fs from 'fs';
import * as path from 'path';

const args = process.argv.slice(2);
const numParticipants = parseInt(args[0] ?? '100', 10);
const targetFilename = args[1] ?? './output/comp-small.json';

if (isNaN(numParticipants) || numParticipants <= 0) {
  console.error('Usage: node index.js [numParticipants] [outputFile]');
  console.error('  numParticipants  Total number of participants to generate (default: 100)');
  console.error('  outputFile       Output file path (default: ./output/comp-small.json)');
  process.exit(1);
}

const outputDir = path.dirname(targetFilename);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const compData = createDataFileContent(numParticipants);

fs.writeFileSync(targetFilename, JSON.stringify(compData, null, ' '), 'utf8');
console.log(`Written to ${targetFilename}`);
