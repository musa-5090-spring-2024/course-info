import dotenv
dotenv.load_dotenv()

import json

from google.cloud import bigquery
from google.cloud import storage
import functions_framework

@functions_framework.http('GET')
def generate_property_geojson(request):
    bigquery_client = bigquery.Client()

    print('Starting query...')
    sql = '''
        SELECT
            property.parcel_number        AS id,
            LEFT(property.sale_date, 10)  AS last_sale_date,
            property.sale_price           AS last_sale_price,
            ST_ASGEOJSON(parcel.geometry) AS geometry
        FROM phl.opa_properties AS property
        JOIN phl.pwd_parcels    AS parcel
            ON LPAD(property.parcel_number, 10, '0') = LPAD(CAST(parcel.BRT_ID AS STRING), 10, '0')
        WHERE property.zip_code = '19104'
    '''

    query_results = bigquery_client.query_and_wait(sql)
    rows = list(query_results)
    print('Finished query.')

    features = []
    for row in rows:
        features.append({
            'type': 'Feature',
            'properties': {
                'id': row['id'],
                'last_sale_date': row['last_sale_date'],
                'last_sale_price': row['last_sale_price'],
            },
            'geometry': json.loads(row['geometry'])
        })

    feature_collection = {
        'type': 'FeatureCollection',
        'features': features
    }

    geojson = json.dumps(feature_collection)

    print('Uploading to GCS...')
    storage_client = storage.Client()
    bucket = storage_client.bucket('my-bucket')
    blob = bucket.blob('properties.geojson')
    blob.upload_from_string(geojson)
    print('Finished uploading.')

    return 'Success!'