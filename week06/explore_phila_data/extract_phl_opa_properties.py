import pathlib
import requests

DATA_DIR = pathlib.Path(__file__).parent / 'raw_data'

# Download the OPA Properties data as a CSV
url = 'https://opendata-downloads.s3.amazonaws.com/opa_properties_public.csv'
filename = DATA_DIR / 'phl_opa_properties.csv'

response = requests.get(url)
response.raise_for_status()

with open(filename, 'wb') as f:
    f.write(response.content)

print(f'Downloaded {filename}')
