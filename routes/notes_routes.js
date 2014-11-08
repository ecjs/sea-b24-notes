'use strict';
var Note = require('../models/note');
var authController = require('../controllers/auth');

module.exports = function(app) {
  app.get('/api/notes', authController.isAuthenticated, function(req, res) {
    Note.find({}, function(err, data) {
      if (err) return res.status(500).send(err);
      res.json(data);
    });
  });

  app.get('/api/notes/:id', authController.isAuthenticated, function(req, res) {
    Note.findOne({'_id': req.params.id}, function(err, data) {
      if (err) return res.status(500).send(err);
      res.json(data);
    });
  });

  app.post('/api/notes', authController.isAuthenticated, function(req, res) {
    var note = new Note(req.body);
    note.date = new Date();
    note.save(function(err, data) {
      if (err) return res.status(500).send(err);
      res.json(data);
    });
  });

  app.put('/api/notes/:id', authController.isAuthenticated, function(req, res) {
    var note = req.body;
    delete note._id;
    Note.findOneAndUpdate({'_id': req.params.id}, note, function(err, data) {
      if (err) return res.status(500).send(err);
      res.json(data);
    });
  });

  app.delete('/api/notes/:id', authController.isAuthenticated, function(req, res) {
    Note.remove({'_id': req.params.id}, function(err) {
      if (err) return res.status(500).send(err);
      res.json({msg: 'success!'});
    });
  });
};
