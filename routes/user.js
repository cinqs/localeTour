var express = require('express');
var router = express.Router();

var system = require("../system");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/login", function(req, res, next){
  res.render("user/login");
})

router.get("/register", function(req, res, next){
  res.render("user/register");
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
        res.json(result);
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
