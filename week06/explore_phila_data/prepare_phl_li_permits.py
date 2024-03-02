import fiona
import json
import pathlib

RAW_DATA_DIR = pathlib.Path(__file__).parent / 'raw_data'
PREPARED_DATA_DIR = pathlib.Path(__file__).parent / 'prepared_data'

raw_filename = RAW_DATA_DIR / 'phl_li_permits.gpkg'
prepared_filename = PREPARED_DATA_DIR / 'phl_li_permits.jsonl'

# Load the data from the GeoPackage file
with fiona.open(raw_filename, 'r') as source:
    data = [feature for feature in source]

# Write the data to a JSONL file
with open(prepared_filename, 'w') as f:
    for feature in data:
        row = dict(feature['properties'])
        row['geog'] = json.dumps(dict(feature['geometry']))
        f.write(json.dumps(row) + '\n')

print(f'Processed data into {prepared_filename}')
