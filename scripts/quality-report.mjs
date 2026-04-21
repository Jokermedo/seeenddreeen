import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const includeExtensions = new Set(['.ts', '.tsx', '.js', '.mjs']);
const ignoredDirectories = new Set(['.next', '.swc', 'coverage', 'node_modules']);

const walk = async (currentDir) => {
  const entries = await readdir(currentDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name)) {
        continue;
      }

      files.push(...(await walk(path.join(currentDir, entry.name))));
      continue;
    }

    if (!includeExtensions.has(path.extname(entry.name))) {
      continue;
    }

    files.push(path.join(currentDir, entry.name));
  }

  return files;
};

const sourceFiles = await walk(rootDir);
const report = await Promise.all(
  sourceFiles.map(async (filePath) => {
    const content = await readFile(filePath, 'utf8');
    const lines = content.split('\n').length;

    return {
      relativePath: path.relative(rootDir, filePath),
      lines,
    };
  })
);

const oversizedFiles = report
  .filter((file) => file.lines >= 200)
  .sort((left, right) => right.lines - left.lines);

console.log('Quality report');
console.log(`source files: ${report.length}`);
console.log(`oversized files (>= 200 lines): ${oversizedFiles.length}`);

if (oversizedFiles.length > 0) {
  oversizedFiles.forEach((file) => {
    console.log(`- ${file.relativePath}: ${file.lines} lines`);
  });
}
