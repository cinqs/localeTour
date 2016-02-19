var chalk = require("chalk");
var model = require("../model");


var dbinit = function(){
  console.log(chalk.blue("**testing the database connection"));
  model.init.initConn(function(result){
    if (result) {
      console.log(chalk.green("connection trial to database successfully"));
    }else {
      console.log(chalk.red("connection trial to database failed"));
    }
  })
}


module.exports = {
  "dbinit": dbinit,
}
