/* global describe, it */
// https://groundberry.github.io/development/2016/12/10/testing-express-with-mocha-and-chai.html

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index');

var expect = chai.expect;

chai.use(chaiHttp);

after(function() {
  app.stop();
});

describe('App', function() {
  describe('/pairhorn', function() {
    describe('when invalid access token', function() {
      it('it returns a 401', function(done) {
      chai.request(app)
        .post('/pairhorn')
        .send({ token: 'blah' })
        .end(function(err, res) {
          expect(res).to.have.status(401);
          done();
        });
      });
    });
    
    describe('when valid access token', function() {
      it('it responds with 200 and instructions', function(done) {
        chai.request(app)
          .post('/pairhorn')
          .send({ token: process.env.SLACK_VERIFICATION_TOKEN })
          .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body.text).to.have.string('How to use /pairhorn');
            done();
          });
      });
    });
  });
});