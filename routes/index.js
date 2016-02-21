var express = require('express');
var router = express.Router();
var system = require("../system");
var packagejson = require("../package.json");

/**
  *first page
  *@param [null || amount&order&sortby in the future version]
  *@return [html] {render a page from jade with the content of the post}
*/
router.get('/', system.user.userIden, function(req, res, next) {
  var filter = {
    "amount": 8,
    "sortby": "postDate",
    "order": -1,
  }
  system.post.postGet(filter, function(result){
    for (var key in result) {
      if (result.hasOwnProperty(key)) {
        var date = new Date(result[key].postDate);
        result[key].date = {};
        result[key].date.year = date.getFullYear();
        result[key].date.month = date.getMonth() + 1;
        result[key].date.day = date.getDay();
      }
    }
    res.status(200).render("index", {
      "status": 200,
      "title": "Locale Tour",
      "msg": "ok",
      "post": result,
      "user": req.user,
      "info": req.info
    })
  })
});

/**
  *this is to get the current version
  *@param [null]
  *@return [json]{json with the version property}
*/
router.get("/version", function(req, res, next){
  var version = packagejson.version;
  res.status(200).json({
    "status": 200,
    "msg": "ok",
    "version": version,
  })
})


module.exports = router;
