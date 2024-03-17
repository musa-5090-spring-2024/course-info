## Slides

- https://musa-5090-spring-2024.github.io/presentation_slides/week07/SLIDES.html

## Resources

### URL Formatting (for APIs and other web requests)

- [Percent-Encoding](https://en.wikipedia.org/wiki/Percent-encoding) (Wikipedia)
- An [ASCII table](https://www.ascii-code.com/)
- Python's [`urllib.parse.quote` and `urllib.parse.unquote`](https://docs.python.org/3/library/urllib.parse.html#url-quoting) from the Python standard library
- JavaScript's [`encodeURIComponent`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) and [`decodeURIComponent`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent)

### Managing Python environemnts and requirements

- [Get started with `conda` environments 🤝](https://www.dataschool.io/intro-to-conda-environments/)
- [Generating Requirements the easy way with `pipreqs`](https://python.plainenglish.io/generating-requirements-the-easy-way-with-pipreqs-e24678b550eb)

### Editing your code

- [VS Code Basic Editing and Keyboard Shortcuts](https://code.visualstudio.com/docs/editor/codebasics)

### Data lakes

- [Wtf is a datalake?](https://www.reddit.com/r/dataengineering/comments/t4kz8u/comment/hyz7w2f/) (Reddit, in r/dataengineering; short and to the point)
- [Data Lake vs. Data Warehouse: What’s the Difference?](https://www.coursera.org/articles/data-lake-vs-data-warehouse) (Coursera; there's a useful video -- less than 10 minutes -- half-way down the page)
- [Schema auto-detection in BigQuery](https://cloud.google.com/bigquery/docs/schema-detect) (Google Cloud documentation)

#### Parquet files in Python
Apache Arrow is a cross-language development platform for in-memory data. It specifies a standardized language-independent columnar memory format for flat and hierarchical data, organized for efficient analytic operations on modern hardware.

- [Reading and Writing Parquet Files](https://arrow.apache.org/docs/python/parquet.html) (Apache Arrow documentation)

#### Parquet files in Node.js
DuckDB is an in-memory analytical database (similar to `DataFrame`s in Pandas or R). It has libraries for many languages; I recommend the `duckdb-async` library for Node.js.

- The [duckdb-async package](https://www.npmjs.com/package/duckdb-async) on npm
- [Importing Data](https://duckdb.org/docs/data/overview) (DuckDB documentation)
- [Writing to Parquet Files](https://duckdb.org/docs/data/parquet/overview#writing-to-parquet-files) (DuckDB documentation)

### GCP Identity & Access Management (IAM) Roles

- [Service accounts overview](https://cloud.google.com/iam/docs/service-account-overview)
- [IAM basic and predefined roles](https://cloud.google.com/iam/docs/understanding-roles)
- [How Application Default Credentials works](https://cloud.google.com/docs/authentication/application-default-credentials)