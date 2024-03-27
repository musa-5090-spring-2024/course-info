## Deploying

_extract_phl_opa_properties_:

```shell
gcloud functions deploy extract_phl_opa_properties \
--gen2 \
--region=us-central1 \
--runtime=python312 \
--source=. \
--entry-point=extract_phl_opa_properties \
--service-account=data-pipeline-robot-2024@musa-344004.iam.gserviceaccount.com \
--memory=4Gi \
--timeout=240s \
--set-env-vars=DATA_LAKE_BUCKET=mjumbewu_musa_5090_data_lake \
--trigger-http \
--no-allow-unauthenticated
```

```shell
gcloud functions call extract_phl_opa_properties
```

_prepare_phl_opa_properties_:

```shell
gcloud functions deploy prepare_phl_opa_properties \
--gen2 \
--region=us-central1 \
--runtime=nodejs20 \
--source=. \
--entry-point=prepare_phl_opa_properties \
--service-account=data-pipeline-robot-2024@musa-344004.iam.gserviceaccount.com \
--memory=8Gi \
--timeout=480s \
--set-env-vars=DATA_LAKE_BUCKET=mjumbewu_musa_5090_data_lake \
--trigger-http \
--no-allow-unauthenticated
```

```shell
gcloud functions call prepare_phl_opa_properties
```

pipeline workflow:
```shell
gcloud workflows deploy phl-property-data-pipeline \
--source=phl-property-data-pipeline.yaml \
--service-account='data-pipeline-robot-2024@musa-344004.iam.gserviceaccount.com'

gcloud scheduler jobs create http phl-property-data-pipeline \
--schedule='0 0 * * 1' \
--time-zone='America/New_York' \
--uri='https://workflowexecutions.googleapis.com/v1/projects/musa-344004/locations/us-central1/workflows/phl-property-data-pipeline/executions' \
--oauth-service-account-email='data-pipeline-robot-2024@musa-344004.iam.gserviceaccount.com' \
--oidc-service-account-email='data-pipeline-robot-2024@musa-344004.iam.gserviceaccount.com'
```

```shell
gcloud workflows run phl-property-data-pipeline