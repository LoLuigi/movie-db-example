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

export async function writeCsvFile(relPath, content){
  // console.log(content)

  const __dirname = path.dirname('');

  const data = {};
  content.forEach(element => {
    Object.entries(element).forEach(([key, value])=>{
      const values = data[key] || [];
      values.push(value || "");
      data[key] = values
    });  
  });

  const csvData = [
    Object.keys(data),
   ];

  for (let i = 0; i < Object.values(data)[0].length; i++) {
    const v = Object.keys(data).map((key) => {
      return data[key][i];
    });
    csvData.push(v);
  }

  try {
    await fs.writeFile(path.join(__dirname, relPath), csvData.join('\r\n'), err => {
      console.log(err);
    });
  } catch (error) {
    console.log(error);
  }

  return true;
}
