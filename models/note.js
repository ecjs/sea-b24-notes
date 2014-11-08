var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var noteSchema = mongoose.Schema({

  noteBody: {type: String, required: true, unique: true},
  category: {type: String},
  date: {type: Date, required: true, unique: true}
});
noteSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Note', noteSchema);
