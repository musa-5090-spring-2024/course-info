import dotenv from 'dotenv';
import findConfig from 'find-config';
dotenv.config({ path: findConfig('.env') });

import fs from 'fs/promises';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';

import * as csv from 'csv/sync';
import * as codes from '@esri/proj-codes';
import { wktToGeoJSON } from 'betterknown';
import proj4 from 'proj4';
import functions from '@google-cloud/functions-framework';
import { Storage } from '@google-cloud/storage';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


functions.http('prepare_phl_opa_properties', async (req, res) => {
  console.log('Preparing PHL OPA Properties data...');

  const rawFilename = path.join(__dirname, 'phl_opa_properties.csv');
  const preparedFilename = path.join(__dirname, 'phl_opa_properties.jsonl');

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

  res.send(`Processed and uploaded gs://${bucketName}/${preparedBlobname}`);
});
