var model = require("../model");

var postSave = function(post, callback){
  postUnique(post, function(result){
    if (result) {
      model.post.savePost(post, function(){
        callback(200)
      })
    }else {
      callback(409)
    }
  })
}

var postGet = function(filter, callback){
  model.post.getPost(filter, function(result){
    callback(result);
  })
}

var postUnique = function(post, callback){
  model.post.searchPost(post, function(result){
    if (result.length) {
      callback(false);
    }else{
      callback(true);
    }
  })
}

module.exports = {
  "postSave": postSave,
  "postGet": postGet
}
