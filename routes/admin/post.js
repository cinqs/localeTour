var express = require('express');
var router = express.Router();

var system = require("../../system");

router.post("/*", system.public.siteInfo, system.user.userAuth, function(req, res, next){
  res.status(200).json({
    "status": 401,
    "msg": "You are not authrized"
  })
})

router.get("/*", system.public.siteInfo, system.user.userAuth, function(req, res, next){
  res.redirect("/user/login")
});

router.post("/save", function(req, res, next){
  var nickname = req.body.nickname || null;
  var city = req.body.city || null;
  var contact = req.body.contact || null;

  if (!nickname || !city || !contact) {
    res.json({
      "status": 422,
      "msg": "* There is / are paramter(s) missing"
    })
  }else{
    var post = {
      "nickname": nickname,
      "city": city,
      "contact": contact,
      "user_id": req.user._id,
    };
    system.post.postSave(post, function(result){
      if (result == 200) {
        res.json({
          "status": 200,
          "msg": "Good, you proposal is accepted!"
        })
      }else {
        res.json({
          "status": 409,
          "msg": "* Don't please re-post your proposal"
        })
      }
    })
  }
})

module.exports = router;
