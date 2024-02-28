import pathlib
import requests

DATA_DIR = pathlib.Path(__file__).parent / 'raw_data'

# Download the OPA Properties data as a CSV
url = 'https://opendata.arcgis.com/datasets/84baed491de44f539889f2af178ad85c_0.geojson'
filename = DATA_DIR / 'phl_pwd_parcels.geojson'

response = requests.get(url)
response.raise_for_status()

with open(filename, 'wb') as f:
    f.write(response.content)

print(f'Downloaded {filename}')
