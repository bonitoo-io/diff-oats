This repository compares the output of `oats` tool from @influxdata/oats and from a forked @bonitoo-io/oats.
Openapi files from https://github.com/influxdata/ui are used to compare generated code.

## Installation

```
yarn
git clone git@github.com:influxdata/openapi.git ../openapi && git -C ../openapi checkout master
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

