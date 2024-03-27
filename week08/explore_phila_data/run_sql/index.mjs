import dotenv from 'dotenv';
import findConfig from 'find-config';
dotenv.config({ path: findConfig('.env') });

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import process from 'process';
import functions from '@google-cloud/functions-framework';
import { BigQuery } from '@google-cloud/bigquery'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SQL_DIR_NAME = path.join(__dirname, 'sql');


functions.http('load_phl_opa_properties', async (req, res) => {
  const bucketName = process.env.DATA_LAKE_BUCKET;
  const datasetName = process.env.DATA_LAKE_DATASET;

  // Read SQL file specified in the request
  const sqlPath = path.join(SQL_DIR_NAME, req.query['sql']);
  // Check that the file exists
  try {
    await fs.promises.access(sqlPath);
  } catch (err) {
    // If not, return a 404
    res.status(404).send(`SQL file ${sqlPath} not found`);
    return;
  }

  const sqlQuery = await fs.readFile(sqlPath, 'utf8');

  // Run the query
  const bigqueryClient = new BigQuery();
  await bigqueryClient.query(eval(sqlQuery.replace(/`/g, '\\`')));

  console.log(`Ran the SQL file ${sqlPath}`);
  res.send(`Ran the SQL file ${sqlPath}`);
});
