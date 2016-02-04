var express = require('express');
var router = express.Router();
var model   = require("../model");


router.get("/*", function(req, res, next){
  res.end();
})

module.exports = router;
