'use strict';

/**
* Change into specs folder so that file loading works.
*/
process.chdir('./specs');

require('./helpers/chai.js');

var request = require('request');
var should = require('should');
var expect = require('chai').expect;
var baseUrl = "http://localhost:3000";
var util = require('util');

// Tests go here.

describe('test get /', function(){
  it('returns status 200', function(done){
    request.get({url: baseUrl}, function(error, response, body){
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

describe('test get /v1/sc/dashboard', function(){
  it('returns status 401', function(done){
    function getURL(){
      return baseUrl + '/v1/sc/dashboard';
    }
    request.get({url: getURL()},function(error, response, body){
        expect(response.statusCode).to.equal(401);
        done();
    });
  });
});

describe('test get /v1/sc/imageupload', function(){
  it('returns status 401', function(done){
    function getURL(){
      return baseUrl + '/v1/sc/imageupload';
    }
    request.get({url: getURL()},function(error, response, body){
        expect(response.statusCode).to.equal(401);
        done();
    });
  });
});

describe('test get /v1/sc/jsoninput', function(){
  it('returns status 401', function(done){
    function getURL(){
      return baseUrl + '/v1/sc/jsoninput';
    }
    request.get({url: getURL()},function(error, response, body){
        expect(response.statusCode).to.equal(401);
        done();
    });
  });
});
