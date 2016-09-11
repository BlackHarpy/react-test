var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var weaponSchema = new Schema({
  id: { type: String },
  name: { type: String },
  type: { type: String },
  damage: { type: String },
  speed: { type: Number },
  weight: { type: Number },
  thaco: { type: Number },
  special: { type: String }
});

module.exports = mongoose.model('Weapon', weaponSchema);
