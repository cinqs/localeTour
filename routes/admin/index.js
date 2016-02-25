var express = require('express');
var router = express.Router();
var path = require('path');
var chalk = require('chalk');

var model = require("../../model");
var system = require("../../system");

/**
  *to add all the url gateway with a siteInfo get and userAuth identify function, which means that these two are required.
*/

router.get("/*", system.user.userAuth, system.public.siteInfo, function(req, res, next){
  res.redirect("/user/login");
});

/**
  *to add the userAuth middle ware to identify user
  */

router.post("/*", system.user.userAuth, function(req, res, next){
  res.status(200).json({
    "status":401,
    "msg": "You are not authrized"
  })
});

/**
  *@param [String] {user: got from the userAuth middleware}
  *@param [String] {info: got from the siteInfo middleware}
  *@return [html] {admin/index: rendered jade engine}
  */

router.get("/", function(req, res, next){
  res.render("admin/index", {
    "user": req.user,
    "info": req.info
  })
})

/**
  *the req.info is existing because the siteInfo middleware
  *req.info.idUrl is to send the url of the user profile to the admin/profile
*/

router.get('/profile', function(req, res, next) {
  console.log(JSON.stringify(req.info));
  res.render("admin/profile", {
    "user": req.user,
    "info": req.info
  });
});

module.exports = router;
