import fs from 'fs';
import path from 'path';

import { parse } from 'csv-parse';
import { getStreamAsArray } from 'get-stream';

export async function readCsvFile(relPath) {
  const parseStream = parse({
    columns: true,
    delimiter: ',',
    trim: true,
  });

  const __dirname = path.dirname('');

  const data = await getStreamAsArray(
    fs.createReadStream(path.join(__dirname, relPath))
      .pipe(parseStream)
  );

  return data;
}
