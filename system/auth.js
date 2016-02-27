var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt-nodejs");

var config = require("../config");


var checkAuth = function(data){

}
/**
  *to generate the token using jsonwebtoken
  *@param [json] {data:contents that you want to be crypted}
  *@param [String] {secret: the string you want to use to crypt}
  *@return [String] {token: the generated token}
*/

var genToken = function(data){
  return jwt.sign(data, config.secret)
}

/**
  *this is to de-token the token
  *using the 'jsonwebtoken' module which is required above.
  *@param [String] {token: the token you want to de-token}
  *@param [String] {secret: this is not in the parameters, but it is required int the function}
  *@return [json] {user: this user is inside the token}
*/

var deToken = function(token){
  return jwt.verify(token, config.secret);
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

  }
}

var userAuthOptional = function(){

}
