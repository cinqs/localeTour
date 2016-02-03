var express = require('express');
var router = express.Router();
var model = require("../model");
var system = require("../system");


/*router.get("/*", system.user.userIden, function(req, res, next){

})*/

router.get('/', system.user.userIden, function(req, res, next) {
  var sort    = req.query.sort || "date";
  var order   = parseInt(req.query.order) || -1;

  var response = {
    title: "Locale Tour"
  }

  if (order != 1 && order != -1) {
    response.status = 422;
    response.msg = "order number should be 1 or -1"
    res.status(200).render("index", response);
  }else{
    var let = {
      "sort"    : sort,
      "order"   : order,
    };

    model.post.getPost(let, function(post){
      response.status = 200;
      response.msg    = "ok",
      response.post   = post
      res.status(200).render("index", response);
    });
  }


});


module.exports = router;
