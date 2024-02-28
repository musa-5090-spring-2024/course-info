import * as csv from 'csv-parse/sync';
import * as codes from '@esri/proj-codes';
import fs from 'fs';
import proj4 from 'proj4';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_DATA_DIR = path.join(__dirname, 'raw_data/');
const PREPARED_DATA_DIR = path.join(__dirname, 'prepared_data/');

const rawFilename = RAW_DATA_DIR + 'phl_opa_properties.csv';
const preparedFilename = PREPARED_DATA_DIR + 'phl_opa_properties.jsonl';

// Load the data from the CSV file
const data = csv.parse(
  fs.readFileSync(rawFilename),
  {columns: true},
);

// Set up the projection
const srcProj = codes.lookup(2272).wkt;
const dstProj = proj4.defs('EPSG:4326');

function parsePointWKT(wkt) {
  const regex = /POINT\s*\(\s*([-.\d]+)\s*([-.\d]+)\s*\)/;
  const match = wkt.match(regex);
  if (match) {
    const [_, x, y] = match;
    return [parseFloat(x), parseFloat(y)];
  }
  return null;
}

// Write the data to a JSONL file
const f = fs.createWriteStream(preparedFilename);
for (const row of data) {
  const geomWKT = row.shape.split(';')[1];
  delete row.shape;
  if (geomWKT == 'POINT EMPTY') {
    row.geog = null;
  } else {
    const point = parsePointWKT(geomWKT);
    const [x, y] = proj4(srcProj, dstProj, point);
    row.geog = `POINT(${x} ${y})`;
  }
  f.write(JSON.stringify(row) + '\n');
}

console.log(`Processed data into ${preparedFilename}`);
