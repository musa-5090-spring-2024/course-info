import { GeoPackageAPI } from '@ngageoint/geopackage';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_DATA_DIR = path.join(__dirname, 'raw_data/');
const PREPARED_DATA_DIR = path.join(__dirname, 'prepared_data/');

const rawFilename = RAW_DATA_DIR + 'phl_li_permits.gpkg';
const preparedFilename = PREPARED_DATA_DIR + 'phl_li_permits.jsonl';

// Load the data from the GeoJSON file
const gpkg = await GeoPackageAPI.open(rawFilename);
const tables = gpkg.getFeatureTables();

// There should only be one table in the GeoPackage
if (tables.length !== 1) {
  throw new Error('Expected exactly one table in the GeoPackage');
}
const features = gpkg.queryForGeoJSONFeaturesInTable(tables[0]);

// Write the data to a JSONL file
const f = await fs.open(preparedFilename, 'w');
for (const feature of features) {
  const row = feature.properties;
  row.geog = JSON.stringify(feature.geometry);
  await f.write(JSON.stringify(row) + '\n');
}

console.log(`Processed data into ${preparedFilename}`);
