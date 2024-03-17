import dotenv from 'dotenv';
dotenv.config();

import * as csv from 'csv/sync';
import * as codes from '@esri/proj-codes';
import fs from 'fs/promises';
import { wktToGeoJSON } from 'betterknown';
import proj4 from 'proj4';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';
import { Storage } from '@google-cloud/storage';
import { BigQuery } from '@google-cloud/bigquery'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_DATA_DIR = path.join(__dirname, 'raw_data/');
const PREPARED_DATA_DIR = path.join(__dirname, 'prepared_data/');

const rawFilename = path.join(RAW_DATA_DIR, 'phl_opa_properties.csv');
const preparedFilename = path.join(PREPARED_DATA_DIR, 'phl_opa_properties.jsonl');

const bucketName = process.env.DATA_LAKE_BUCKET;
const storageClient = new Storage();
const bucket = storageClient.bucket(bucketName);

// Download the raw data from cloud storage
const rawBlobname = 'raw/phl_opa_properties/phl_opa_properties.csv';
await bucket.file(rawBlobname).download({ destination: rawFilename });
console.log(`Downloaded to ${rawFilename}`);

// Load the data from the CSV file
const data = csv.parse(
  await fs.readFile(rawFilename),
  {columns: true},
);

// Set up the projection
proj4.defs('EPSG:2272', codes.lookup(2272).wkt);
proj4.defs('EPSG:4326', codes.lookup(4326).wkt);

// Write the data to a JSONL file
const f = await fs.open(preparedFilename, 'w');
for (const row of data) {
  const geom = wktToGeoJSON(row.shape, { proj: proj4 });
  const [x, y] = geom.coordinates;
  row.geog = `POINT (${x} ${y})`;

  delete row.shape;
  await f.write(JSON.stringify(row) + '\n');
}

console.log(`Processed data into ${preparedFilename}`);

// Upload the prepared data to cloud storage
const preparedBlobname = 'tables/phl_opa_properties/phl_opa_properties.jsonl';
await bucket.upload(preparedFilename, { destination: preparedBlobname });
console.log(`Uploaded to ${preparedBlobname}`);

// Load the data into BigQuery as an external table
const datasetName = process.env.DATA_LAKE_DATASET;
const tableName = 'phl_opa_properties';
const tableUri = `gs://${bucketName}/${preparedBlobname}`;

const createTableQuery = `
CREATE OR REPLACE EXTERNAL TABLE ${datasetName}.${tableName}
OPTIONS (
  format = 'JSON',
  uris = ['${tableUri}']
)
`;

const bigqueryClient = new BigQuery();
await bigqueryClient.query(createTableQuery);
console.log(`Loaded ${tableUri} into ${datasetName}.${tableName}`);
