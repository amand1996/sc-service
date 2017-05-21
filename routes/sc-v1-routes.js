/**
 * @name sc-v1-routes-api
 * @description This module packages the JSON patch and Image thumbnail generation API (post login).
 */
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const jwtAuth = require('fwsp-jwt-auth');
var jsonpatch = require('jsonpatch');
var Jimp = require('jimp');

const ServerResponse = require('fwsp-server-response');

let serverResponse = new ServerResponse();
serverResponse.enableCORS(true);express.response.sendError = function(err) {
  serverResponse.sendServerError(this, {result: {error: err}});
};
express.response.sendOk = function(result) {
  serverResponse.sendOk(this, {result});
};

let api = express.Router();

/**
* @name Image thumbnail generation api
* @description Uses 'jimp' npm module for generate 50x50 thumbnail images from public image URLs.
*/

api.get('/imageupload', function(req, res){
    res.render('imageupload');
})

api.post('/imageoutput', function(req, res){
  if(req.body.image.trim() != ""){
    Jimp.read(req.body.image, function (err, image) {
      if(err){
        res.send(err);
      }
      else{
        image.resize(50, 50)
         .getBuffer(Jimp.MIME_JPEG, function(err, buffer){
           if(err){
             res.send(err);
           }
            res.setHeader('content-type', 'image/jpeg');

            res.send(buffer);
          })
      }
    });
  }
  else{
    res.send("Incorrect data");
  }
})

/**
* @name JSON patch API
* @description Uses 'jsonpatch' npm module for applying patches over json objects
*/

api.get('/jsoninput', function(req, res){
    res.render('jsonpatchinput');
})

api.post('/jsonoutput', function(req, res){
  var obj = JSON.parse(req.body.json_object);
  var patch = JSON.parse(req.body.json_patch);
  res.send(JSON.stringify(jsonpatch.apply_patch(obj, patch),null,2));
})

/**
* @name Authentication and dashboard rendering API
* @description This api is the public endpoint with login authentication functionality. Uses JSON Web Tokens for validation.
*/

api.post('/dashboard', function(req, res){
  if(req.body.username == "aman" && req.body.password == "musicstar"){
    res.render('dashboard');
  }
  else{
    res.send("Incorrect login");
  }
})

api.get('/dashboard', function(req, res){
    res.render('dashboard');
})

// api.get('/', hydraExpress.validateJwtToken(),
// (req, res) => {
//   res.sendOk({greeting: 'Welcome to Hydra Express!'});
// });

module.exports = api;
