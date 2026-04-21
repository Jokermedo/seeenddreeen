import { rm } from 'node:fs/promises';
import path from 'node:path';

const pathsToRemove = ['.next', '.swc', 'coverage', path.join('node_modules', '.cache')];

const deletePath = async (target) => {
  await rm(target, { force: true, recursive: true });
  console.log(`removed ${target}`);
};

await Promise.all(pathsToRemove.map(deletePath));
