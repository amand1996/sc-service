# sc-service



## Pre-installation

It's recommended that [NVM](https://github.com/creationix/nvm) be used to manage NodeJS versions.
The project includes an .nvmrc which specifies NodeJS 6.2.1.

## Installation

```javascript
$ cd sc-service
$ nvm use
$ npm install
```

## Trial

```shell
$ npm start
```
## Documentation

This is a microservice implementation of Node.js using [Hydra-express](https://github.com/flywheelsports/hydra-express).
The main functionlities of this module are:
- Authentication
- JSON patching
- Image Thumbnail Generation

## Authentication

A username password pair is required to login into the module. It returns a signed [Json Web Token](https://jwt.io​) which can be used to validate future requests. The JWT payload token is stored in cookie. The JWT in the cookie is verified each time a request is sent in post login. We can logout of the application at anytime by deleting the jwt cookie (by clicking the Delete cookie button in post login).
![Screenshot](https://github.com/amand1996/sc-service/blob/master/login.png)
![Screenshot](https://github.com/amand1996/sc-service/blob/master/dashboard.png)


## JSON patching

We input a JSON object along with a JSON patch. This api makes use of [jsonpatch](https://www.npmjs.com/package/jsonpatch) npm module. This API returns the patched JSON object to the client.
![Screenshot](https://github.com/amand1996/sc-service/blob/master/jsonpatch.png)

## Image Thumbnail Generation

A public image url is sent to this api in a request body. This api then uses [jimp](https://www.npmjs.com/package/jimp) npm module for image processing. It then returns an image of 50x50 pixels.
![Screenshot](https://github.com/amand1996/sc-service/blob/master/thumbnailgenerate.png)

## Docs

For generating the documentation of the module, JSDoc has been used. The output of the JSDoc is in the 'out' folder.
![Screenshot](https://github.com/amand1996/sc-service/blob/master/docs.png)

## Docker Configuration

Docker configuration is present in 'scripts/docker.js'

## Logging

HydraExpressLogger has been used for logging the requests. It has been implemented using 'fwsp-logger' npm module.

## JS Linting

'eslint' has been used for javascript linting to produce clean code.

## Tests

Mocha has been used for testing. Testing code can be found in 'specs/test.js'.
First start the server using
```shell
$ npm start
```
Then run the tests using
```shell
$ npm test
```
[Istanbul](https://github.com/gotwarlost/istanbul) has been used for mocha test code coverage. The results are stored in the 'coverage' folder.
