var express = require('express');
var router = express.Router();
var system = require("../system");

router.get('/', system.user.userIden, function(req, res, next) {
  var filter = {
    "amount": 6,
    "sortby": "postDate",
    "order": -1,
  }
  system.post.postGet(filter, function(result){
    res.render("index", {
      "status": 200,
      "title": "Locale Tour",
      "msg": "ok",
      "post": result
    })
  })
});


module.exports = router;
