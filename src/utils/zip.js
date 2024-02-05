import { open, stat } from 'node:fs/promises';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { basename, join } from 'node:path';
import { extractPaths, isPathExists, resolvePathArg } from '../helpers/path.js';
import { II } from '../constants/error.js';
import { red, green } from './logger.js';


export const compress = async (fromto) => {
  try {
    let [source, destination] = extractPaths(fromto).map(path => resolvePathArg(path));

    console.log(source, destination);

    if((await isPathExists(destination)) && (await stat(destination))?.isDirectory) {
      destination = join(destination, basename(source) + '.br');
    }

    const [fdSource, fdDestination] = await Promise.all([
      open(source, 'r'),
      open(destination, 'w')
    ])

    await pipeline(
      fdSource.createReadStream(),
      createBrotliCompress(),
      fdDestination.createWriteStream()
    )

    console.log(`File ${green(source)} was compressed to ${green(destination)}`);
  } catch {
    console.error(red(II));
  }
};

export const decompress = async (fromto) => {
  try {
    let [source, destination] = extractPaths(fromto).map(path => resolvePathArg(path));

    if((await isPathExists(destination)) && (await stat(destination))?.isDirectory) {
      destination = join(destination, basename(source).replace(/\.br$/, ''))
    }

    const [fdSource, fdDestination] = await Promise.all([
      open(source, 'r'),
      open(destination, 'w')
    ])
    
    await pipeline(
      fdSource.createReadStream(),
      createBrotliDecompress(),
      fdDestination.createWriteStream()
    )
    
    console.log(`File ${green(source)} was decompressed to ${green(destination)}`);
  } catch {
    console.error(red(II));
  }
};