library(RPostgreSQL)

# Load the CSV into a DataFrame.
df <- read.csv("data/indego_stations.csv")

# Load the DataFrame into the database.
drv <- dbDriver("PostgreSQL")
con <- dbConnect(drv,
    user = "postgres", password = "postgres",
    dbname = "musa_509", host = "localhost")

if (dbExistsTable(con, "r_indego_stations"))
    dbRemoveTable(con, "r_indego_stations")

dbWriteTable(con,
    name = "r_indego_stations",
    value = df, row.names = FALSE)
