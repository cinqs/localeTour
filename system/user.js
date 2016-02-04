var model = require("../model");
var public = require("./public")

var userLogin = function(userData, callback){
  model.user.searchUser(userData, function(result){
    if (!result.length) {
      callback({
        "status": 404,
      })
    }else if (result.length == 1 && result[0].status) {
      delete(result[0]["pwd"])
      callback({
        "status": 200,
        "msg": "ok",
        "user": result[0]
      })
    }else{
      callback({
        "status": 423,
      })
    }
  })
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

var userIden = function(req, res, next){
  if (!req.cookies.token) {
    req.user = {
      "status": 401,
      "id": "Login or Registe"
    };
    next();
  }else {
    var user = public.deToken(req.cookies.token);
    req.user = user;
    model.user.checkUser(user._id, function(result){
      if (result.length == 1 && result[0].status) {
        delete(result[0]["pwd"]);
        //reset the cookie every time it requeries
        res.cookie("token", public.genToken(result[0]), {
          "expires": new Date(Date.now() + 24 * 60 * 60 * 1000)
        });
        req.user = result[0];
        next();
      }else {
        req.user = {
          "status": 401,
          "id":"Login or Registe"
        };
        next();
      }
    })
  }
}

var userAuth = function(req, res, next){
  if (!req.cookies.token) {
    //res.redirect("/user/login");
    next();
  }else {
    var user = public.deToken(req.cookies.token);
    req.user = user;
    model.user.checkUser(user._id, function(result){
      if (result.length == 1 && result[0].status) {
        delete(result[0]["pwd"]);
        //reset the cookie every time it requeries
        res.cookie("token", public.genToken(result[0]), {
          "expires": new Date(Date.now() + 24 * 60 * 60 * 1000)
        })
        req.user = result[0];
        next("route");
      }else {
        //res.redirect("/user/login");
        next();
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
  "userIden"    : userIden,
  "userLogin"   : userLogin
}
