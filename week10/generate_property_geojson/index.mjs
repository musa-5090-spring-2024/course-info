import dotenv from 'dotenv';
import findConfig from 'find-config';
dotenv.config({ path: findConfig('.env') });

import { BigQuery } from '@google-cloud/bigquery';
import { Storage } from '@google-cloud/storage';

const bigqueryClient = new BigQuery();

console.log('Starting query...')
const sql = `
  SELECT
    property.parcel_number        AS id,
    LEFT(property.sale_date, 10)  AS last_sale_date,
    property.sale_price           AS last_sale_price,
    ST_ASGEOJSON(parcel.geometry) AS geometry
  FROM phl.opa_properties AS property
  JOIN phl.pwd_parcels    AS parcel
    ON LPAD(property.parcel_number, 10, '0') = LPAD(CAST(parcel.BRT_ID AS STRING), 10, '0')
  WHERE property.zip_code = '19104'
`;

const queryResults = await bigqueryClient.query(sql);
const rows = queryResults[0];
console.log('Finished query.');

const features = [];
for (const row of rows) {
  features.push({
    type: 'Feature',
    properties: {
      id: row.id,
      last_sale_date: row.last_sale_date,
      last_sale_price: row.last_sale_price,
    },
    geometry: JSON.parse(row.geometry),
  });
}

const featureCollection = {
  type: 'FeatureCollection',
  features: features,
};

const geojson = JSON.stringify(featureCollection);

console.log('Uploading to GCS...');
const storage = new Storage();
const bucket = storage.bucket('my-bucket');
const file = bucket.file('properties.geojson');
await file.save(geojson);
console.log('Finished uploading.');