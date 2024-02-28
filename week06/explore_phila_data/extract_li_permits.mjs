import fetch from 'node-fetch';
import fs from 'fs/promises';

const __dirname = new URL('.', import.meta.url).pathname;
const DATA_DIR = __dirname + 'raw_data/';

// Download the L&I Permits data as a GeoPackage
const url = 'https://phl.carto.com/api/v2/sql?filename=permits&format=gpkg&skipfields=cartodb_id&q=SELECT%20*%20FROM%20permits%20WHERE%20permitissuedate%20%3E=%20%272016-01-01%27';
const filename = DATA_DIR + 'phl_li_permits.gpkg';

const response = await fetch(url);
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}

await fs.writeFile(filename, await response.text());

console.log(`Downloaded ${filename}`);
