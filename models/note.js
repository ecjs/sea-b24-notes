var mongoose = require('mongoose');
var noteSchema = mongoose.Schema({

  noteBody: {type: String},
  category: {type: String},
  date: {type: Date}
});

module.exports = mongoose.model('Note', noteSchema);
