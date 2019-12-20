// const describe = require("mocha").describe;
const mocha = require("mocha");
let chai = require('chai');
let chaiHttp = require('chai-http');
let sinon = require("sinon");

let server;

chai.use(chaiHttp);
sinon.stub(console, "log");

describe('server', () => {
  beforeEach(function() {
    server = require('../server.js').default;
  });

  it('returns 200', (done) => {
    chai.request(server).post('/').end((err, res) => {
      chai.assert(res.statusCode, 200);
      done();
    });
  });

  context('with params', function() {
    it('returns 200', (done) => {
      chai.request(server).post('/').send({ threads: 10 }).end((err, res) => {
        chai.assert(res.statusCode, 200);
        done();
      });
    });
  });

  context("when error thrown", function() {
    beforeEach(() => {
      server.createServer = () => {
        throw ParamsError;
      };
    });

    it('returns 400', (done) => {
      chai.request(server).post('/').send().end((err, res) => {
        chai.assert(res.statusCode, 400);
        done();
      });
    });
  });
});
