var express = require('express');
var router = express.Router();
var chalk = require("chalk");

router.get('/', function(req, res){

  var promise = new Promise(function(resolve, reject){
    limit = 0
    var exam = function(){
      if(Math.random() < 0.5){
        resolve("pass");
      }else{
        limit += 1;
        if (limit < 2) {
          console.log(chalk.red("failed"));
          exam();
        }else{
          reject("failed anyway");
        }
      }
    }
    exam();
  });

  promise
    .then(function(result){
      console.log(chalk.green(result));
      return result;
    }, function(result){
      console.log(chalk.red(result));
      return result;
    })
    .then(function(result){
      res.status(200).json({
        "result":result
      });
    })
})

module.exports = router
