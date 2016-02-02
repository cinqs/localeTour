var config      = require("../config");
var MongoClient = require("mongodb").MongoClient;
var assert      = require("assert");

var dburl = config.dburl;

var savePost = function(data, callback){
  callback({
    "status":200,
    "msg":"fake message"
  })
}

var checkPostUnique = function(data){

}

module.exports = {
  "savePost": savePost,
}
