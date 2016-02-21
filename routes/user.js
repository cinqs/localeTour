var express = require('express');
var router = express.Router();
var chalk = require("chalk");

var system = require("../system");

/**
  *this is to get the login page rendered
  *once you are redirected or directed here, you login cookies will be cleared
  *This means even if you are logged in, you should not get here
  *@param [null]
  *@return [html] {rendered page for login}
*/
router.get("/login", function(req, res, next){
  res.clearCookie("token");
  res.render("user/login");
})

/**
  *this is to render the register page
  *@param [null]
  *@return [html] {rendered page of the register}
*/

router.get("/register", function(req, res, next){
  res.status(200).render("user/register");
})

/**
  *this is the provide a link for logout
  *logout will clear the cookies and redirect you to the page where you are from
  *you may be redirected again after you are directed to the page you are from
  *it depends on if the page you are from is auth required or not
*/
router.get("/logout", function(req, res, next){
  var rUrl = req.query.rUrl;

  res.clearCookie("token");
  res.redirect(rUrl);
})

/**
  *this the receiver of the post of login
  *@param [string] {id:the nickname or ID}
  *@param [string] {pwd: the password which is related to the ID}
  *@return [html] {missing content if the post content contains not enough information required}
  *@return [html] {user not found, with a status of 404}
  *@return [redirect] {redirect to /admin/ if user login successfully, at the mean time, set the user login cookie}
  *@return [html] {status of 423, which means account status if abnormal}
*/
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

/**
  *@param [string] {id:the id should be used as unique id for user}
  *@param [string] {pwd:password for the id}
  *@return [html] {parameters provided not suffient}
  *@return [html] {ok, and the same time return the user login cookies}
  *@return [html] {status 409, which means the user is already existing}
*/
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
