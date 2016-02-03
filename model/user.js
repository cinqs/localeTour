var MongoClient = require("mongodb").MongoClient;
var assert      = require("assert");

var config = require("../config");

var dburl = config.dburl;

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
  "searchUser": searchUser
}
