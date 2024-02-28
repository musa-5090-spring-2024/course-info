import json
import pathlib

RAW_DATA_DIR = pathlib.Path(__file__).parent / 'raw_data'
PROCESSED_DATA_DIR = pathlib.Path(__file__).parent / 'processed_data'

raw_filename = RAW_DATA_DIR / 'phl_pwd_parcels.geojson'
processed_filename = PROCESSED_DATA_DIR / 'phl_pwd_parcels.jsonl'

# Load the data from the GeoJSON file
with open(raw_filename, 'r') as f:
    data = json.load(f)


# Write the data to a JSONL file
with open(processed_filename, 'w') as f:
    for feature in data['features']:
        row = feature['properties']
        row['geog'] = (
            json.dumps(feature['geometry'])
            if feature['geometry'] and feature['geometry']['coordinates']
            else None
        )
        f.write(json.dumps(row) + '\n')

print(f'Processed data into {processed_filename}')
