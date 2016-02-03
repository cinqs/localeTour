var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectId;
var assert      = require("assert");

var config = require("../config");

var dburl = config.dburl;

var checkUser = function(_id, callback){
  MongoClient.connect(dburl, function(err, db){
    assert.equal(err, null);
    var result = db.collection("user").find({
      "_id":ObjectId(_id)
    })
    result.toArray(function(err, result){
      assert.equal(err, null);
      callback(result);
    })
  })
}

var searchUser = function(userData, callback){
  var id = userData.id;
  MongoClient.connect(dburl, function(err, db){
    assert.equal(err, null);
    var result = db.collection("user").find({
      $or:[
        {
          "id":id
        },
        {
          "nickname":id
        },
        {
          "email":id
        }
      ]
    })

    result.toArray(function(err, result){
      assert.equal(err, null);
      callback(result);
    })
  })
}

var saveUser = function(userData, callback){
  userData.createDate = new Date();
  userData.status = true;
  MongoClient.connect(dburl, function(err, db){
    assert.equal(err, null);
    db.collection("user").insertOne(userData, function(err, result){
      assert.equal(err, null);
      callback()
    })
  })
}

module.exports = {
  "saveUser": saveUser,
  "searchUser": searchUser,
  "checkUser": checkUser
}
