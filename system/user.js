var jwt = require("jsonwebtoken");
var model = require("../model");
var public = require("./public")

var userLogin = function(userData){

}

var userRegister = function(userData, callback){
  userUnique(userData, function(result){
    if (result) {
      userData.pwd = public.encode(userData.pwd);
      model.user.saveUser(userData, function(){
        callback({
          "status":200,
          "msg":"ok"
        })
      })
    }else{
      callback({
        "status":409,
        "msg":"*duplicated user"
      })
    }
  })

}

var userAuth = function(req, res, next){
  if (Math.random() < 0.5) {
    next("route")
  }else {
    next();
  }
}

var userUnique = function(userData, callback){
  model.user.searchUser(userData, function(result){
    if (result.length) {
      callback(false)
    }else {
      callback(true)
    }
  })
}

module.exports = {
  "userRegister": userRegister,
  "userAuth"    : userAuth,
}
