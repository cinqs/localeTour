var bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");

var config = require("../config")

var encode = function(data){
  var salt = bcrypt.genSaltSync(config.saltLen);
  var hash = bcrypt.hashSync(data, salt);
  return hash;
}

var pwdCompare = function(origin, crypted){
  return bcrypt.compareSync(origin, crypted);
}

var genToken = function(data){
  return jwt.sign(data, config.secret);
}

var deToken = function(data){
  return jwt.verify(data, config.secret);
}

var siteInfo = function(req, res, next){
  var info = {};
  info.url = req.protocol + '://' + req.get('host') + req.originalUrl;
  info.ip = req.headers['x-real-ip'] || req.ip;
  info.logoutUrl = req.protocol + '://' + req.get('host') + '/user/logout/?rUrl=' + req.originalUrl;

  req.info = info;
  next();
}

module.exports = {
  "encode"      : encode,
  "pwdCompare"  : pwdCompare,
  "genToken"    : genToken,
  "deToken"     : deToken,
  "siteInfo"    : siteInfo,
}
