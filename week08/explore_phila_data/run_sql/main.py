from dotenv import load_dotenv
load_dotenv()

import os
import pathlib
import functions_framework
from google.cloud import bigquery

DIR_NAME = pathlib.Path(__file__).parent
SQL_DIR_NAME = DIR_NAME / 'sql'


@functions_framework.http('GET')
def load_phl_opa_properties(request):
    bucket_name = os.getenv('DATA_LAKE_BUCKET')
    dataset_name = os.getenv('DATA_LAKE_DATASET')

    # Read the SQL file specified in the request
    sql_path = SQL_DIR_NAME / request.args.get('sql')
    # Check that the file exists
    if (not sql_path.exists()) or (not sql_path.is_file()):
        # Return a 404 (not found) response if not
        return f'File {sql_path} not found', 404

    with open(sql_path, 'r') as f:
        sql_query = f.read(encoding='utf-8')

    # Run the SQL query
    bigquery_client = bigquery.Client()
    bigquery_client.query_and_wait(sql_query.replace('${', '{').format(dataset_name=dataset_name, bucket_name=bucket_name))

    print(f'Ran the SQL file {sql_path}')
    return f'Ran the SQL file {sql_path}'
