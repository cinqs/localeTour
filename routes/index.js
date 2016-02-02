var express = require('express');
var router = express.Router();
var model = require("../model")

/* GET home page. */
router.get('/', function(req, res, next) {
  var sort    = req.query.sort || "date";
  var order   = parseInt(req.query.order) || -1;

  if (order != 1 && order != -1) {
    var response = {
      "status": 422,
      "msg"   : "order number should be 1 or -1"
    }
    res.status(200).render("index", response);
  }else{
    var let = {
      "sort"    : sort,
      "order"   : order,
    };

    model.post.getPost(let, function(post){
      var response = {
        "status": 200,
        "msg"   : "ok",
        "post"  : post
      }
      res.status(200).render("index", response);
    });
  }


});


module.exports = router;
