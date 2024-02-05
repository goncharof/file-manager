import { open } from 'node:fs/promises';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { extractPaths, resolvePathArg } from '../helpers/path';
import { II } from '../constants/error';
import { red } from './logger';
import { basename } from 'node:path';

export const compress = async (fromto) => {
  try {
    const [source, destination] = extractPaths(fromto).map(path => resolvePathArg(path));

    const [fdSource, fdDestination] = await Promise.all([
      open(extendedDirname(source), 'r'),
      open(extendedDirname(destination), 'w')
    ])

    await pipeline(
      fdSource.createReadStream(),
      createBrotliCompress(),
      (await fdDestination.stat()).isDirectory()
        ? join(destination, basename(source) + '.br')
        : fdDestination.createWriteStream()
    )
  } catch {
    console.error(red(II));
  }
};

export const decompress = async () => {
  try {
    const [source, destination] = extractPaths(fromto).map(path => resolvePathArg(path));

    const [fdSource, fdDestination] = await Promise.all([
      open(extendedDirname(source), 'r'),
      open(extendedDirname(destination), 'w')
    ])
    
    await pipeline(
      fdSource.createReadStream(),
      createBrotliDecompress(),
      (await fdDestination.stat()).isDirectory()
        ? join(destination, basename(source).replace(/\.br$/, ''))
        : fdDestination.createWriteStream()
    )
  } catch {
    console.error(red(II));
  }
};