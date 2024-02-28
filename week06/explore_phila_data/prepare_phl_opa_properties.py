import csv
import json
import pathlib
import pyproj
from shapely import wkt

RAW_DATA_DIR = pathlib.Path(__file__).parent / 'raw_data'
PREPARED_DATA_DIR = pathlib.Path(__file__).parent / 'prepared_data'

raw_filename = RAW_DATA_DIR / 'phl_opa_properties.csv'
prepared_filename = PREPARED_DATA_DIR / 'phl_opa_properties.jsonl'

# Load the data from the CSV file
with open(raw_filename, 'r') as f:
    reader = csv.DictReader(f)
    data = list(reader)

# Set up the projection
src_proj = pyproj.Proj(init='epsg:2272')
dst_proj = pyproj.Proj(init='epsg:4326')

# Write the data to a JSONL file
with open(prepared_filename, 'w') as f:
    for row in data:
        geom_wkt = row.pop('shape').split(';')[1]
        if geom_wkt == 'POINT EMPTY':
            row['geog'] = None
        else:
            geom = wkt.loads(geom_wkt)
            geom = pyproj.transform(src_proj, dst_proj, geom.x, geom.y)
            row['geog'] = f'POINT({geom[0]} {geom[1]})'
        f.write(json.dumps(row) + '\n')

print(f'Processed data into {prepared_filename}')
