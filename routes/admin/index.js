var express = require('express');
var router = express.Router();
var path = require('path');
var chalk = require('chalk');

var model = require("../../model");

/**
  *@param [null]
  *@return [page] which is for you to insert new
*/
router.get('/', function(req, res, next) {
  console.log("The method entered");
  res.sendFile(path.join(__dirname, '../../public/admin/index.html'));
});


/**
*@param [String] (nickname)
*@param [String] (city)
*@param [String] (contact)
*@return [redirected]
*/
router.post('/save', function(req, res){
  var nickname = req.body.nickname || null;
  var city     = req.body.city || null;
  var contact  = req.body.contact || null;

  var data = {
    "nickname": nickname,
    "city"    : city,
    "contact" : contact
  }

  console.log(chalk.green(data));

  var response = {
    "date": new Date(),
  }

  if (nickname || city || contact) {
    response.code = 200;
    response.msg  = "Some param(s) is / are missing";
    res.status(200).json(response);
  }else{
    var promise = new Promise(function(resolve, reject){
      var trial = 0;
      model.post.savePost(data, function(result){
        if (result.status == 200) {
          resolve({
            "status": 200,
            "msg"   : result.msg
          })
        }else{
          reject({
            "status": 504,
            "msg"   : result.msg
          })
        }
      });
    })

    promise
      .then(function(result){
        res.status(result.status).json(result);
      })
  }
})

module.exports = router;
