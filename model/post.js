var config      = require("../config");
var mongodb     = require("mongodb")
var MongoClient = mongodb.MongoClient;
var ObjectId    = mongodb.ObjectId;
var assert      = require("assert");
var chalk       = require("chalk")

var dburl = config.dburl;

var searchPost = function(post, callback){
  MongoClient.connect(dburl, function(err, db){
    assert.equal(err, null);
    var result = db.collection("post").find(post);
    result.toArray(function(err, result){
      assert.equal(err, null);
      db.close();
      callback(result);
    })
  })
}

var savePost = function(post, callback){
  MongoClient.connect(dburl, function(err, db){
    assert.equal(err, null);
    post.postDate = new Date();
    db.collection("post").insertOne(post, function(err, result){
      db.close();
      callback();
    })
  })
}

var getPost = function(filter, callback){
  var sortby = filter.sortby || "postDate";
  var order = filter.order || -1;
  var orderby = JSON.parse('{"'+sortby+'":'+order+'}');
  MongoClient.connect(dburl, function(err, db){
    assert.equal(err, null);
    var result = db.collection("post").find().limit(filter.amount).sort(orderby);
    result.toArray(function(err, result){
      assert.equal(err, null);
      callback(result);
    })
  })
}

module.exports = {
  "searchPost": searchPost,
  "savePost": savePost,
  "getPost": getPost
}
