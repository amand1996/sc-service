/**
* @name Sc
* @summary Sc Hydra Express service entry point
* @description
*/
'use strict';

var jsonpatch = require('jsonpatch');
var Jimp = require('jimp');
const version = require('./package.json').version;
const hydraExpress = require('hydra-express');
var ejs = require('ejs');

const jwtAuth = require('fwsp-jwt-auth');
const HydraExpressLogger = require('fwsp-logger').HydraExpressLogger;
hydraExpress.use(new HydraExpressLogger());

let config = require('fwsp-config');

/**
* Load configuration file and initialize hydraExpress app
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

      app.get('/jsoninput', function(req, res){
          res.render('jsonpatchinput');
      })

      app.post('/jsonoutput', function(req, res){
        var obj = JSON.parse(req.body.json_object);
        var patch = JSON.parse(req.body.json_patch);
        res.send(JSON.stringify(jsonpatch.apply_patch(obj, patch),null,2));
      })

      app.get('/imageupload', function(req, res){
          res.render('imageupload');
      })

      app.post('/imageupload', function(req, res){
          res.render('imageupload');
      })
      app.post('/dashboard', function(req, res){
        if(req.body.username == "aman" && req.body.password == "musicstar"){
          res.render('dashboard');
        }
        else{
          res.send("Incorrect login");
        }
      })
      app.post('/imageoutput', function(req, res){
        if(req.body.image.trim() != ""){
          Jimp.read(req.body.image, function (err, image) {
              image.resize(50, 50)
                   .getBuffer(Jimp.MIME_JPEG, function(err, buffer){
                      res.setHeader('content-type', 'image/jpeg');
                      res.send(buffer);
                    })
          });
        }
        else{
          res.send("Incorrect data");
        }
      })
    });
  })
  .then(serviceInfo => console.log('serviceInfo', serviceInfo))
  .catch(err => console.log('err', err));
