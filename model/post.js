var config      = require("../config");
var mongodb     = require("mongodb")
var MongoClient = mongodb.MongoClient;
var ObjectId    = mongodb.ObjectId;
var assert      = require("assert");
var chalk       = require("chalk")

var dburl = config.dburl;

var savePost = function(data, callback){
  checkPostUnique(data, function(uniqueResult){
    if (uniqueResult.status == 200) {
      data.date = new Date();
      MongoClient.connect(dburl, function(err, db){
        db.collection("post").insertOne(data, function(err, insertResult){
          assert.equal(err, null);
          db.close();
          callback(uniqueResult);
        })
      })
    }else{
      callback(uniqueResult);
    }
  })
}

var getPost = function(let, callback){
  //to create a orderby JSON object
  var sort = let.sort || "date";
  var order = let.order || -1;
  var orderby = JSON.parse('{"'+let.sort+'":'+let.order+'}');

  //to filter by a search requirement
  MongoClient.connect(dburl, function(err, db){
    assert.equal(err, null);
    var result = db.collection('post').find().sort(orderby);
    result.toArray(function(err, result){
      assert.equal(err, null);
      /*for (var i = 0; i < result.length; i++) {
        delete(result[i]['_id']);
      }*/
      callback(result);
    })
  })
}

var getPost_id = function(_id, callback){
  var getPostIdResult = {};
  MongoClient.connect(dburl, function(err, db){
    assert.equal(err, null);
    var result = db.collection("post").find({
      "_id": ObjectId(_id)
    });

    result.toArray(function(err, result){
      assert.equal(err, null);
      getPostIdResult.status  = result.length? 200 : 404;
      getPostIdResult.msg     = result.length? "ok" : "post not found";
      getPostIdResult.post    = result.length? result : "none";
      callback(getPostIdResult);
    })
  })
}

var checkPostUnique = function(data, callback){
  MongoClient.connect(dburl, function(err, db){
    var uniqueResult = {};
    assert.equal(err, null);
    var result = db.collection("post").find(data);
    result.toArray(function(err, result){
      assert.equal(err, null);
      uniqueResult.status = result.length? 409:200;
      uniqueResult.msg    = result.length? "duplicated content":"ok";
      db.close();
      callback(uniqueResult);
    })
  })
}

module.exports = {
  "savePost"    : savePost,
  "getPost"     : getPost,
  "getPost_id"  : getPost_id
}
