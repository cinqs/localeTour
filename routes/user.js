var express = require('express');
var router = express.Router();
var chalk = require("chalk");

var system = require("../system");

router.get("/login", function(req, res, next){
  res.clearCookie("token");
  res.render("user/login");
})

router.get("/register", function(req, res, next){
  res.render("user/register");
})

router.get("/logout", function(req, res, next){
  var rUrl = req.query.rUrl;

  res.clearCookie("token");
  res.redirect(rUrl);
})

router.post("/login", function(req, res, next){
  var id = req.body.id || null;
  var pwd = req.body.pwd || null;

  if (!id || !pwd) {
    res.render("user/login", {
      "status": 422,
      "msg"   : "*There is / are parameter(s) missing"
    })
  }else {
    var userData = {
      "id": id,
      "pwd": pwd
    }
    system.user.userLogin(userData, function(result){
      if (result.status == 404) {
        res.render("user/login", {
          "status": 404,
          "msg": "* This account is not found"
        })
      }else if (result.status == 200) {
        res.cookie("token", system.public.genToken(result.user), {
          "expires": new Date(Date.now() + 24 * 60 * 60 * 1000)
        });
        res.redirect("/admin/")
      }else{
        res.render("user/login", {
          "status": 423,
          "msg"   : "* Your account is in a abnormal status"
        })
      }
    })
  }
})

router.post("/register", function(req, res, next){
  var id = req.body.id || null;
  var pwd = req.body.pwd || null;

  if (!id || !pwd) {
    res.status(200).render("user/register", {
      "status": 422,
      "msg"   : "*There is / are parameter(s) missing"
    });
  }else {
    var userData = {
      "id": id,
      "pwd": pwd
    };
    system.user.userRegister(userData, function(result){
      if (result.status == 200) {
        //res.json(result);
        res.cookie("token", system.public.genToken(result.user), {"expires": new Date(Date.now() + 24 * 60 * 60 * 1000)});
        res.redirect("/admin/profile");
      }else if (result.status == 409) {
        res.render("user/register", result);
      }
    })
  }
})

router.get("/:id", function(req, res){
  res.status(200).json({
    "id": req.params.id,
  })
})

module.exports = router;
