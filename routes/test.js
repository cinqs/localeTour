var express = require('express')
var router = express.Router()

router.get('/', function(req, res){
  var number = req.query.number

  console.log(number)
  if (number >= 10) {
    res.status(404).json({
      'status':'error',
      'error':'too big'
    })
  }else{
    res.status(200).json({
      'status':'ok',
      'error': null
    })
  }
})

module.exports = router
