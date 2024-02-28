import * as csv from 'csv/sync';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_DATA_DIR = path.join(__dirname, 'raw_data/');
const PREPARED_DATA_DIR = path.join(__dirname, 'prepared_data/');

const GTFS_FEEDS = ['septa_bus', 'septa_rail'];

for (const gtfsFeed of GTFS_FEEDS) {
  const gtfsFeedFolder = RAW_DATA_DIR + gtfsFeed + '/';
  for (const gtfsFileName of await fs.readdir(gtfsFeedFolder)) {

    // Read the data from the raw GTFS CSV file.
    const gtfsFilePath = gtfsFeedFolder + gtfsFileName;
    const content = await fs.readFile(gtfsFilePath, 'utf8');
    const data = csv.parse(content, { "skip_empty_lines": true });

    // Write the data to a new prepared CSV file, creating the folder if it
    // doesn't exist.
    const outputFolder = PREPARED_DATA_DIR + gtfsFeed + '/';
    const outputPath = outputFolder + gtfsFileName.replace('.txt', '.csv');
    await fs.mkdir(outputFolder, { recursive: true });
    await fs.writeFile(outputPath, csv.stringify(data), 'utf8');
  }
}