import dotenv from 'dotenv';
import findConfig from 'find-config';
dotenv.config({ path: findConfig('.env') });

import fs from 'fs/promises';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';

import functions from '@google-cloud/functions-framework';
import { BigQuery } from '@google-cloud/bigquery'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SQL_DIR_NAME = path.join(__dirname, 'sql');


functions.http('run_sql', async (req, res) => {
  // Read SQL file specified in the request
  const sqlPath = path.join(SQL_DIR_NAME, req.query['sql']);

  // Check that the file exists
  try {
    await fs.access(sqlPath);
  } catch (err) {
    // If not, return a 404
    res.status(404).send(`SQL file ${sqlPath} not found: ${err}`);
    return;
  }

  // Read the SQL file
  const sqlQueryTemplate = await fs.readFile(sqlPath, 'utf8');
  const sqlQuery = renderTemplate(
    sqlQueryTemplate,
    {
      bucket_name: process.env.DATA_LAKE_BUCKET,
      dataset_name: process.env.DATA_LAKE_DATASET,
    },
  )

  // Run the query
  const bigqueryClient = new BigQuery();
  await bigqueryClient.query(sqlQuery);

  console.log(`Ran the SQL file ${sqlPath}`);
  res.send(`Ran the SQL file ${sqlPath}`);
});


function renderTemplate(sqlQueryTemplate, context) {
  const cleanTemplate = sqlQueryTemplate.replace(/`/g, '\\`')
  return eval(`
    (function() {
      ${Object.entries(context).map(
        ([key, value]) => `const ${key} = '${value}';`
      ).join('\n')}
      return \`${cleanTemplate}\`;
    })()`
  );
}
