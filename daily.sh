#!/bin/bash

curl -L http://prod.publicdata.landregistry.gov.uk.s3-website-eu-west-1.amazonaws.com/pp-monthly-update-new-version.csv | sed 's/ 00\:00//g' >> pp-monthly-update-new-version.csv

if ! gsutil hash gs://uk-house-price-data/pp-monthly-update-new-version.csv ./pp-monthly-update-new-version.csv; then
  gsutil mv pp-monthly-update-new-version.csv gs://uk-house-price-data/pp-monthly-update-new-version.csv
  bq load uk_house_price_data.all_data gs://uk-house-price-data/pp-monthly-update-new-version.csv
fi