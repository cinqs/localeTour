$(document).ready(function(){

  $("input").keyup(function(){
    if (pwdConfirm() && 1) {
      $("#confirmpwdwrong").html("");
      $("input[type='submit']").prop("disabled", false);
    }else {
      $("#confirmpwdwrong").html("Password not compatiable");
    }
  })
})

var regPost = function(){
  var id = $("input[name='id']").val();
  var pwd = $("input[name='pwd']").val();
  $.ajax({
    method:"post",
    url:'/user/register',
    data:"id="+id+"&pwd="+pwd,
    dataType:"json",
    success:function(json){

    }
  })
}

var pwdConfirm = function(){
  var pwd = $("input[name='pwd']").val();
  var cpwd = $("input[name='confirmpwd']").val();
  if (pwd === cpwd) {
    return true;
  }else {
    return false;
  }
}
