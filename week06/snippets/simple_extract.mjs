import https from 'https';
import fs from 'fs';

const url = 'https://opendata-downloads.s3.amazonaws.com/opa_properties_public.csv';

https.get(url, (response) => {
  const f = fs.createWriteStream('opa_properties.csv');
  response.pipe(f);
});