# UK House Price Data Website

## Installation

- Fork this repo and create a Google Cloud Project
- Within that project, create an IAM service account with access to storage and bigQuery
- Add the following credentials to the Github secrets: GKE_SERVICE_EMAIL, GKE_SERVICE_KEY, GCP_PROJECT_ID
- Now run the Github Workflow called `Initial Data`
- You should now have the data available for you to query within big query.
- Now upload this repository to a Cloudflare Worker and add the same secrets to the Cloudflare worker and add a Key Value store called KV_UK_HOUSE_PRICE mapped to a JS Variable.
- Run the worker!