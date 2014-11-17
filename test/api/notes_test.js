process.env.MONGO_URL = 'mongodb://localhost/notes_test';
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var jwt = require('jwt-simple');


require('../../server');

var expect = chai.expect;

describe('basic notes crud', function() {
  var id;
  var userJWT;
  it('should be able to create a user', function(done) {
    chai.request('http://localhost:3000')
      .post('/users')
      .send({'username':'example', 'password':'pass123', 'passwordConfirmed':'pass123'})
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.not.have.status(500);
        expect(res.body).to.have.property('jwt')
          .that.is.a('string');
        userJWT = res.body;
        done();
      });
  });
  it('should return a token', function(done) {
    chai.request('http://localhost:3000')
      .get('/users')
      .auth('example', 'pass123')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res.body).to.have.property('jwt');
        done();
      });
  });

  it('should be able to create a note', function(done) {
    chai.request('http://localhost:3000')
    .post('/api/notes')
    .send({noteBody: 'hello world'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.noteBody).to.eql('hello world');
      expect(res.body).to.have.property('_id');
      id = res.body._id;
      done();
    });
  });

  it('should be able to get an index with auth', function(done) {
    chai.request('http://localhost:3000')
    .get('/api/notes')
    .set(userJWT)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.be.true;
      done();
    });
  });

  it('should be able to get a single note', function(done) {
    chai.request('http://localhost:3000')
    .get('/api/notes/' + id)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.noteBody).to.eql('hello world');
      done();
    });
  });

  it('should be able to update a note', function(done) {
    chai.request('http://localhost:3000')
    .put('/api/notes/' + id)
    .send({noteBody: 'new note body'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.noteBody).to.eql('new note body');
      done();
    });
  });

  it('should be able to destroy a note', function(done) {
    chai.request('http://localhost:3000')
    .delete('/api/notes/' + id)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('success!');
      done();
    });
  });
});
