from dotenv import load_dotenv
load_dotenv()

import os
from google.cloud import bigquery

bucket_name = os.getenv('DATA_LAKE_BUCKET')
dataset_name = os.getenv('DATA_LAKE_DATASET')

# Load the data into BigQuery as an external table
prepared_blobname = 'tables/phl_opa_properties/phl_opa_properties.jsonl'
table_name = 'phl_opa_properties'
table_uri = f'gs://{bucket_name}/{prepared_blobname}'

create_table_query = f'''
CREATE OR REPLACE EXTERNAL TABLE {dataset_name}.{table_name} (
  `objectid` STRING,
  `assessment_date` STRING,
  `basements` STRING,
  `beginning_point` STRING,
  `book_and_page` STRING,
  `building_code` STRING,
  `building_code_description` STRING,
  `category_code` STRING,
  `category_code_description` STRING,
  `census_tract` STRING,
  `central_air` STRING,
  `cross_reference` STRING,
  `date_exterior_condition` STRING,
  `depth` STRING,
  `exempt_building` STRING,
  `exempt_land` STRING,
  `exterior_condition` STRING,
  `fireplaces` STRING,
  `frontage` STRING,
  `fuel` STRING,
  `garage_spaces` STRING,
  `garage_type` STRING,
  `general_construction` STRING,
  `geographic_ward` STRING,
  `homestead_exemption` STRING,
  `house_extension` STRING,
  `house_number` STRING,
  `interior_condition` STRING,
  `location` STRING,
  `mailing_address_1` STRING,
  `mailing_address_2` STRING,
  `mailing_care_of` STRING,
  `mailing_city_state` STRING,
  `mailing_street` STRING,
  `mailing_zip` STRING,
  `market_value` STRING,
  `market_value_date` STRING,
  `number_of_bathrooms` STRING,
  `number_of_bedrooms` STRING,
  `number_of_rooms` STRING,
  `number_stories` STRING,
  `off_street_open` STRING,
  `other_building` STRING,
  `owner_1` STRING,
  `owner_2` STRING,
  `parcel_number` STRING,
  `parcel_shape` STRING,
  `quality_grade` STRING,
  `recording_date` STRING,
  `registry_number` STRING,
  `sale_date` STRING,
  `sale_price` STRING,
  `separate_utilities` STRING,
  `sewer` STRING,
  `site_type` STRING,
  `state_code` STRING,
  `street_code` STRING,
  `street_designation` STRING,
  `street_direction` STRING,
  `street_name` STRING,
  `suffix` STRING,
  `taxable_building` STRING,
  `taxable_land` STRING,
  `topography` STRING,
  `total_area` STRING,
  `total_livable_area` STRING,
  `type_heater` STRING,
  `unfinished` STRING,
  `unit` STRING,
  `utility` STRING,
  `view_type` STRING,
  `year_built` STRING,
  `year_built_estimate` STRING,
  `zip_code` STRING,
  `zoning` STRING,
  `pin` STRING,
  `building_code_new` STRING,
  `building_code_description_new` STRING,
  `geog` STRING,
)
OPTIONS (
  format = 'JSON',
  uris = ['{table_uri}']
)
'''

bigquery_client = bigquery.Client()
bigquery_client.query_and_wait(create_table_query)
print(f'Loaded {table_uri} into {dataset_name}.{table_name}')
