'use strict'
/**
  *@author Abner
  *@description {1: for user identification identify purpose}
  *             {2: for password encryption and decryption}
  *             {3: for web token encode and decode}
*/

var tool = require("./tool");
var model = require("../model");



/**
  *trying to write a pre requested funciton which is pre processed
*/

var checkAuth = function(data){

}


/**
  *This is for restrict user authentication
  *If not authrized, go to the next middleware, it will be redirected to
  *'/user/login', otherwisely, it will go to next route.

  *often used by router.all("/*"), as a pre-decided gateway.
  *if authrised, go to the next route,
  *if not authrized, go to the next middleware to be determined by the route.
  *
  *since this is restrictly required by authentication, so you should always
  *-- using the router.all("/*") for all the request.

*/
var userAuthRestrict = function(req, res, next){
  if (!req.cookies || !req.cookies.token) {
    //if cookies not existing, or the token in cookies not existing,
    //go to the next middleware
    next();
  }else {
    // this is to de-token the token in the cookies
    var user = tool.deToken(req.cookies.token);
    var userId = user._id || null;
    model.user.checkUser(userId, function(users){
      if (users.length === 1 && users[0].status) {
        //delete the pwd in the user result
        delete(users[0].pwd);
        var token = tool.genToken(users[0]);
        //reset the password
        res.cookie("token", token, {
          "expires": new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        //add the user in the req session
        req.user = users[0];
        next("route");
      }else {
        next();
      }
    })
  }
}

/**
  *For some pages, the user authentication is not a must,
  *which mean, you can or not to login, like the first home page.
  *if you login, you will get customerised page,
  *if not, it's ok

  *this middleware is used individually for every router.
  *like router.get("/home", system.auth.userAuthOptional, function(req, res){});
*/

var userAuthOptional = function(req, res, next){
  if (!req.cookies || !req.cookies.token) {
    //cookies not contain exist or token not exsit in coookie
    req.user = {
      "status": 401,
      "id": "Login",
    };
    next();
  }else {
    //cookie exists and below is to check the existing and it's status
    var user = tool.deToken(req.cookies.token);
    var userId = user._id || null;
    model.user.checkUser(userId, function(users){
      if (users.length === 1 && users[0].status) {
        //users unique and status is true
        delete(users[0].pwd);
        var token = tool.genToken(users[0]);
        res.cookie("token", token, {
          "expires": new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        req.user = users[0];
        next();
      }else {
        //user not unique or duplex or status false
        req.user = {
          "status": 401,
          "id": "Login"
        }
      }
    })
  }
}
