import dotenv from 'dotenv';
import findConfig from 'find-config';
dotenv.config({ path: findConfig('.env') });

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import functions from '@google-cloud/functions-framework';
import { Storage } from '@google-cloud/storage';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


functions.http('extract_phl_opa_properties', async (req, res) => {
  console.log('Extracting PHL OPA Properties data...');

  // Download the OPA Properties data as a CSV
  const url = 'https://opendata-downloads.s3.amazonaws.com/opa_properties_public.csv';
  const filename = path.join(__dirname, 'phl_opa_properties.csv');

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  await fs.writeFile(filename, await response.text());

  console.log(`Downloaded ${filename}`);

  // Upload the downloaded file to cloud storage
  const BUCKET_NAME = process.env.DATA_LAKE_BUCKET
  const blobname = 'raw/phl_opa_properties/phl_opa_properties.csv';

  const storageClient = new Storage();
  const bucket = storageClient.bucket(BUCKET_NAME);
  await bucket.upload(filename, {
    destination: blobname,
  });

  console.log(`Uploaded ${filename} to ${BUCKET_NAME}`);

  res.send(`Downloaded and uploaded ${filename}`);
});
