'use strict';

/**
* Change into specs folder so that file loading works.
*/
process.chdir('./specs');

require('./helpers/chai.js');

// Tests go here.
process.env.NODE_ENV = 'test';
var chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../sc-service');
let should = chai.should();

chai.use(chaiHttp);

describe('Node.js Task', () => {

  describe('/GET index.ejs', () => {
      it('it should GET index.ejs', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
              done();
            });
      });
  });
  /*
  * Test the /POST route
  */
  // describe('/POST book', () => {
  //     it('it should not POST a book without pages field', (done) => {
  //       let book = {
  //           title: "The Lord of the Rings",
  //           author: "J.R.R. Tolkien",
  //           year: 1954
  //       }
  //       chai.request(server)
  //           .post('/book')
  //           .send(book)
  //           .end((err, res) => {
  //               res.should.have.status(200);
  //               res.body.should.be.a('object');
  //               res.body.should.have.property('errors');
  //               res.body.errors.should.have.property('pages');
  //               res.body.errors.pages.should.have.property('kind').eql('required');
  //             done();
  //           });
  //     });
  //
  // });
});
