import pathlib
import requests

DATA_DIR = pathlib.Path(__file__).parent / 'raw_data'

# Download the L&I Permits data as a GeoPackage
url = 'https://phl.carto.com/api/v2/sql?q=SELECT+*+FROM+business_licenses&filename=business_licenses&format=geojson&skipfields=cartodb_id'
filename = DATA_DIR / 'business_licenses.geojson'

response = requests.get(url)
response.raise_for_status()

with open(filename, 'wb') as f:
    f.write(response.content)

print(f'Downloaded {filename}')
