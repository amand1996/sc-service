/**
 * @name sc-v1-routes-api
 * @description This module packages the JSON patch and Image thumbnail generation API (post login).
 */
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
var jsonpatch = require('jsonpatch');
var Jimp = require('jimp');
var jwt = require('jsonwebtoken');
const payload = {
  userID: 'aman',
  admin: true
};

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

api.get('/imageupload', function(req, res) {
  var token = req.cookies['cookie-token'];
  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) {
      hydraExpress.log('error', err);
      res.status(401).send('Please login');
    }
    else {
      hydraExpress.log('info', 'Cookie verified');
      res.render('imageupload');
    }
  });
});

api.post('/imageoutput', function(req, res) {
  var token = req.cookies['cookie-token'];
  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) {
      hydraExpress.log('error', err);
      res.status(401).send('Please login');
    }
    else {
      hydraExpress.log('info', 'Cookie verified');
      if (req.body.image.trim() != '') {
        Jimp.read(req.body.image, function (err, image) {
          if (err) {
            res.send(err);
          }
          else {
            image.resize(50, 50)
             .getBuffer(Jimp.MIME_JPEG, function(err, buffer) {
               if (err) {
                 hydraExpress.log('error', err);
                 res.send(err);
               }
               res.setHeader('content-type', 'image/jpeg');
               res.send(buffer);
             });
          }
        });
      }
      else {
        hydraExpress.log('error', 'Incorrect data');
        res.send('Incorrect data');
      }
    }
  });
});

/**
* @name JSON patch API
* @description Uses 'jsonpatch' npm module for applying patches over json objects
*/

api.get('/jsoninput', function(req, res) {
  var token = req.cookies['cookie-token'];
  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) {
      hydraExpress.log('error', err);
      res.status(401).send('Please login');
    }
    else {
      hydraExpress.log('info', 'Cookie verified');
      res.render('jsonpatchinput');
    }
  });
});

api.post('/jsonoutput', function(req, res) {
  var token = req.cookies['cookie-token'];
  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) {
      hydraExpress.log('error', err);
      res.status(401).send('Please login');
    }
    else {
      hydraExpress.log('info', 'Cookie verified');
      var obj = JSON.parse(req.body.json_object);
      var patch = JSON.parse(req.body.json_patch);
      res.send(JSON.stringify(jsonpatch.apply_patch(obj, patch),null,2));
    }
  });
});

/**
* @name Authentication and dashboard rendering API
* @description This api is the public endpoint with login authentication functionality. Uses JSON Web Tokens for validation.
*/

api.post('/dashboard', function(req, res) {
  if (req.body.username == 'aman' && req.body.password == 'musicstar') {
    hydraExpress.log('info', 'Authentication Successful');
    var token = jwt.sign(payload, 'secret', { expiresIn: 60 * 60 }, function(err, token) {
      if (err) {
        hydraExpress.log('error', err);
        res.send('Error');
      }
      function getToken() {
        return token;
      }
      res.cookie('cookie-token', getToken());
      res.render('dashboard');
    });
  }
  else {
    hydraExpress.log('error', 'Authentication failed');
    res.send('Incorrect login');
  }
});

api.get('/dashboard', function(req, res) {
  var token = req.cookies['cookie-token'];
  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) {
      hydraExpress.log('error', err);
      res.status(401).send('Please login');
    }
    else {
      hydraExpress.log('info', 'Cookie verified');
      res.render('dashboard');
    }
  });
});

/**
* @name JSON Web Token Deletion API
* @description This api is deletes the JSON Web Token from the cookie.
*/

api.get('/deletetoken', function(req, res) {
  hydraExpress.log('info', 'Token deleted');
  res.clearCookie('cookie-token');
  res.render('index');
});

module.exports = api;
