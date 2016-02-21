$(document).ready(function(){
  /**
    *this is to get the password and compares if they are the same
  */
  $("input[name='confirmpwd']").keyup(function(){
    var pwd = $("input[name='pwd']").val();
    var cpwd = $(this).val();
    if (pwd === cpwd) {
      $("#confirmpwdwrong").html("");
    }else {
      $("#confirmpwdwrong").html("Password not accept");
    }
  })
})
