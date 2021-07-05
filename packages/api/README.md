# CTO Core API #

Core API is middleware layer to serve any data from any data source (ex.Magento, CM)S to Frontend. It's build on top Graphql

![coverage statements](https://bitbucket.org/centraltechnology/centech-api/raw/HEAD/packages/api/badges/badge-statements.svg)
![coverage branches](https://bitbucket.org/centraltechnology/centech-api/raw/HEAD/packages/api/badges/badge-branches.svg)
![coverage functions](https://bitbucket.org/centraltechnology/centech-api/raw/HEAD/packages/api/badges/badge-functions.svg)
![coverage lines](https://bitbucket.org/centraltechnology/centech-api/raw/HEAD/packages/api/badges/badge-lines.svg)

### How to Install ###
```sh
cp .env.example .env
# Set .env file
yarn
yarn build
yarn start
```

### How to Deploy to AWS manually ###

```sh
cp .env.example .env
# Set .env file such as BU=CDS
yarn
yarn build
```
Make sure you have configured a proper AWS profile for AWS CLI e.g. cg-cds-prod
```sh
yarn deploy --aws-profile cg-cds-prod
```
