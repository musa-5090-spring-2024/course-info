import fetch from 'node-fetch';
import fs from 'fs/promises';

const __dirname = new URL('.', import.meta.url).pathname;
const DATA_DIR = __dirname + 'raw_data/';

const url = 'https://opendata-downloads.s3.amazonaws.com/opa_properties_public.csv';
const filename = DATA_DIR + 'phl_opa_properties.csv';

const response = await fetch(url);
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}

await fs.writeFile(filename, await response.text());

console.log(`Downloaded ${filename}`);
