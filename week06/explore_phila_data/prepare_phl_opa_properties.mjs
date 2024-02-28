import * as csv from 'csv-parse/sync';
import fs from 'fs';
import proj4 from 'proj4';
import wellknown from 'wellknown';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_DATA_DIR = path.join(__dirname, 'raw_data/');
const PREPARED_DATA_DIR = path.join(__dirname, 'prepared_data/');

const rawFilename = RAW_DATA_DIR + 'phl_pwd_parcels.geojson';
const preparedFilename = PREPARED_DATA_DIR + 'phl_pwd_parcels.jsonl';

// Load the data from the CSV file
const data = csv.parse(
  fs.readFileSync(rawFilename),
  {columns: true},
);

// Set up the projection
const srcProj = proj4.defs('EPSG:2272');
const dstProj = proj4.defs('EPSG:4326');

// Write the data to a JSONL file
const f = fs.createWriteStream(preparedFilename);
for (const row of data) {
  const geomWKT = row.shape.split(';')[1];
  delete row.shape;
  if (geomWKT == 'POINT EMPTY') {
    row.geog = null;
  } else {
    const geom = wellknown.parse(geomWKT);
    const [x, y] = proj4(srcProj, dstProj, geom.coordinates);
    row.geog = `POINT(${x} ${y})`;
  }
  f.write(JSON.stringify(row) + '\n');
}

console.log(`Processed data into ${prepared_filename}`);
