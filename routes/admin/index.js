var express = require('express');
var router = express.Router();
var path = require('path');
var chalk = require('chalk');

var model = require("../../model");
var system = require("../../system");

router.get("/*", system.public.siteInfo, system.user.userAuth, function(req, res, next){
  res.redirect("/user/login");
});

router.post("/*", system.user.userAuth, function(req, res, next){
  res.status(200).json({
    "status":401,
    "msg": "You are not authrized"
  })
});

router.get("/", function(req, res, next){
  res.render("admin/index", {
    "user": req.user,
    "info": req.info
  })
})

router.get('/profile', function(req, res, next) {
  req.info.idUrl = req.protocol + '://' + req.headers['host'] + "/user/" + req.user._id;
  console.log(JSON.stringify(req.info));
  res.render("admin/profile", {
    "user": req.user,
    "info": req.info
  });
});

module.exports = router;
