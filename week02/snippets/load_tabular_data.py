import pandas as pd

# Load the CSV into a DataFrame.
df = pd.read_csv('data/indego_stations.csv')

# Load the DataFrame into the database.
USERNAME = 'postgres'
PASSWORD = 'postgres'
DATABASE = 'musa_509'

df.to_sql(
    'indego_stations',
    f'postgresql://{USERNAME}:{PASSWORD}@localhost:5432/{DATABASE}',
    if_exists='replace',
    index=False,
)
