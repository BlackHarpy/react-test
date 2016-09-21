var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var models = require('./schemas/weapon.js')(app, mongoose);
var Weapon = mongoose.model('Weapon');

app.use(express.static('static'));

app.use(bodyParser.json());

app.get('/api/weapons', function(req,res) {
  Weapon.find(function(err, weaponsList) {
    if(err) res.send(500, err.message);
    res.json(weaponsList);
  });
});

app.post('/api/weapons', function(req, res) {
  var weapon = new Weapon(req.body);
  weapon.save(function(err, weapon) {
    if(err) return res.status(500).send( err.message);
    res.status(200).json(weapon);
  });
});

mongoose.connect('mongodb://localhost/baldurs_gate', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
});
