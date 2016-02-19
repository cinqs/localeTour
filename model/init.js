var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var config = require("../config")

var dburl = config.dburl;

var initConn = function(callback){
  MongoClient.connect(dburl, function(err, db){
    if (err == null) {
      callback(true);
    }else {
      callback(false);
    }
  })
}

module.exports = {
  "initConn": initConn,
}
