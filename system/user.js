var model = require("../model");
var public = require("./public")

var userLogin = function(userData){

}

var userRegister = function(userData, callback){
  userUnique(userData, function(result){
    if (result) {
      userData.pwd = public.encode(userData.pwd);
      model.user.saveUser(userData, function(){
        model.user.searchUser(userData, function(result){
          delete(result[0]["pwd"])
          callback({
            "status":200,
            "msg":"ok",
            "user":result[0]
          })
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
  if (!req.cookies.token) {
    next();
  }else {
    var user = public.deToken(req.cookies.token);
    req.user = user;
    model.user.checkUser(user._id, function(result){
      if (result.length == 1 && result[0].status) {
        req.user = result[0];
        next("route");
      }else if (!result.length) {
        next()
      }else {
        req.user.status = 423;
        next("route");
      }
    })
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
