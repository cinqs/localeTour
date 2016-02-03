var bcrypt = require("bcrypt-nodejs");

var config = require("../config")
var encode = function(data){
  var salt = bcrypt.genSaltSync(config.saltLen);
  var hash = bcrypt.hashSync(data, salt);
  return hash;
}

var pwdCompare = function(origin, crypted){
  return bcrypt.compareSync(origin, crypted);
}

module.exports = {
  "encode"      : encode,
  "pwdCompare"  : pwdCompare
}
