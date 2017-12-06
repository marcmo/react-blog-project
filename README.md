# React Readable

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Usage

### Install app with dependencies

    yarn install

### Run the dev web server

    yarn start

### Development scripts

running linter

    yarn lint

## Test backend

### Run the dev API backend service

example server taken from [readable-starter](https://github.com/udacity/reactnd-project-readable-starter)

    cd api-server & yarn install & node server.js

## Gotchas

### react-icons with typescript

    module xyz has no default export

see https://github.com/Microsoft/TypeScript/issues/3337

instead of using:

    import Pencil from 'react-icons/lib/ti/pencil';
    ...
    <Pencil size={25} />

use this:

    import * as b from 'react-icons/lib/fa';
    ...
    <b.FaPencil size={25} />

### typescript: import fails with 'no default export'

Add "allowSyntheticDefaultImports": true to your tsconfig.json

