/**
  *@author Abner
  *@description there are some funcitons which would be used
  *             frenquentely, so they were gethered here.
*/

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt-nodejs");

var config = require("../config");

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


module.exports = {
  "deToken": deToken,
  "genToken": genToken,
}
