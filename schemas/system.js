var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var systemSchema = new Schema({
  _id: { type : String },
  values: { type: Array }
}, {
  collection: 'system'
});

module.exports = mongoose.model('System', systemSchema);
