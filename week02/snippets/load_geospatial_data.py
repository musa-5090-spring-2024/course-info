import geopandas as gpd
import sqlalchemy as sqa

# Load the shp into a DataFrame.
df = gpd.read_file('data/indego_station_statuses.geojson')

# Load the DataFrame into the database.
USERNAME = 'postgres'
PASSWORD = 'postgres'
DATABASE = 'musa_509'

engine = sqa.create_engine(
    f'postgresql://{USERNAME}:{PASSWORD}@localhost:5432/{DATABASE}'
)
df.to_postgis(
    'pandas_indego_station_statuses',
    engine,
    if_exists='replace',
    index=False,
)
