var express = require('express');
var router = express.Router();
var model   = require("../model");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/:id", function(req, res){
  var _id = req.params.id || null;

  if (!_id) {
    res.status(200).json({
      "status": 422,
      "msg"   : "id format not right"
    })
  }else{
    model.post.getPost_id(_id, function(result){
      res.status(200).json(result);
    })
  }

})

module.exports = router;
