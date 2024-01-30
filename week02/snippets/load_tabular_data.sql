DROP TABLE IF EXISTS indego_stations;
CREATE TABLE indego_stations
(
  station_id   INTEGER,
  station_name TEXT,
  go_live_date TEXT
);

COPY indego_stations
FROM '/path/to/indego_stations.csv'
WITH (FORMAT csv, HEADER true);

ALTER TABLE indego_stations
ALTER COLUMN go_live_date TYPE DATE
  USING to_date(go_live_date, 'MM/DD/YYYY');