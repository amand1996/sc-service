/**
* @name sc node-microservice
* @summary Sc Hydra Express service entry point
* @description Node.js task
*/
'use strict';

const version = require('./package.json').version;
const hydraExpress = require('hydra-express');
var ejs = require('ejs');

const jwtAuth = require('fwsp-jwt-auth');
const HydraExpressLogger = require('fwsp-logger').HydraExpressLogger;
hydraExpress.use(new HydraExpressLogger());

let config = require('fwsp-config');

/**
* @name Config file init
* @description Load configuration file and initialize hydraExpress app
*/
config.init('./config/config.json')
  .then(() => {
    config.version = version;
    return jwtAuth.loadCerts(null, config.jwtPublicCert);
  })
  .then(status => {
    return hydraExpress.init(config.getObject(), version, () => {
      const app = hydraExpress.getExpressApp();
      app.set('views', './views');
      app.set('view engine', 'ejs');

      hydraExpress.registerRoutes({
        '/v1/sc': require('./routes/sc-v1-routes')
      });

      app.get('/', function(req, res){
        res.render('index');
      });
    });
  })
  .then(serviceInfo => console.log('serviceInfo', serviceInfo))
  .catch(err => console.log('err', err));
