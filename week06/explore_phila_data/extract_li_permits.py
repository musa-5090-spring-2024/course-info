import pathlib
import requests

DATA_DIR = pathlib.Path(__file__).parent / 'raw_data'

# Download the L&I Permits data as a GeoPackage
url = 'https://phl.carto.com/api/v2/sql?filename=permits&format=gpkg&skipfields=cartodb_id&q=SELECT%20*%20FROM%20permits%20WHERE%20permitissuedate%20%3E=%20%272016-01-01%27'
filename = DATA_DIR / 'phl_li_permits.gpkg'

response = requests.get(url)
response.raise_for_status()

with open(filename, 'wb') as f:
    f.write(response.content)

print(f'Downloaded {filename}')
