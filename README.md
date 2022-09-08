This repository compares the output of the `oats` tool from @influxdata/oats and from a forked @bonitoo-io/oats on 
files processed by https://github.com/influxdata/ui .

## Installation

```
yarn
git clone git@github.com:influxdata/openapi.git ../openapi && git checkout master
yarn prepare
```

## Usage

```
yarn clean
yarn generate
yarn diff
yarn oats-bonitoo_docs
yarn validate
```

