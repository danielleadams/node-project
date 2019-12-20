// const describe = require("mocha").describe;
const mocha = require("mocha");
let chai = require('chai');
let chaiHttp = require('chai-http');

let server = require('../index.js');
// let should = chai.should();

chai.use(chaiHttp);

describe('server', function() {
  it('succeeds at POST', function(done) {
    chai.request(server).post('/').end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  });
});
