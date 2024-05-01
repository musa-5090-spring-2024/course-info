#!/usr/bin/env bash
set -ex

# Download the property_tile_info.geojson file from the temp bucket.
gcloud storage cp \
  gs://musa5090s24_team01_temp_data/property_tile_info.geojson \
  ./property_tile_info.geojson

# Convert the geojson file to a vector tileset in a folder named "properties".
# The tile set will be in the range of zoom levels 12-18. See the ogr2ogr docs
# at https://gdal.org/drivers/vector/mvt.html for more information.
ogr2ogr \
  -f MVT \
  -dsco MINZOOM=12 \
  -dsco MAXZOOM=18 \
  -dsco COMPRESS=NO \
  ./properties \
  ./property_tile_info.geojson

# Upload the vector tileset to the public bucket.
gcloud storage cp \
  --recursive \
  ./properties \
  gs://musa5090s24_team01_public/tiles