import * as csv from 'csv/sync';
import fs from 'fs/promises';

const __dirname = new URL('.', import.meta.url).pathname;
const RAW_DATA_DIR = __dirname + 'raw_data/';
const PROCESSED_DATA_DIR = __dirname + 'prepared_data/';

const rawFilename = RAW_DATA_DIR + 'phl_pwd_parcels.geojson';
const processedFilename = PROCESSED_DATA_DIR + 'phl_pwd_parcels.jsonl';

// Load the data from the GeoJSON file
const data = await BigJSON.parse({
  body: fs.readFileSync(rawFilename)
});

// Write the data to a JSONL file
const f = fs.createWriteStream(processedFilename);
for (const feature of data.features) {
  const row = feature.properties;
  row.geog = (
    feature.geometry && feature.geometry.coordinates
    ? JSON.stringify(feature.geometry)
    : null
  );
  f.write(JSON.stringify(row) + '\n');
}

console.log(`Processed data into ${processed_filename}`);
