ogr2ogr \
    "data/opa_properties_public-4326.csv" \
    "data/opa_properties_public.geojson" \
    -lco GEOMETRY=AS_WKT \
    -lco GEOMETRY_NAME=geog \
    -skipfailures