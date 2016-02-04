$(document).ready(function(){
  $("#savePost").click(function(){
    var nickname = $("input[name='nickname']").val() || null;
    var city = $("input[name='city']").val() || null;
    var contact = $("input[name='contact']").val() || null;

    if (!nickname || !city || !contact) {
      $("#warningPostForm").html("*Please fill all the needed information with *");
    }else{
      $.ajax({
        url:"/admin/post/save",
        method:"POST",
        data:"nickname="+nickname+"&city="+city+"&contact="+contact,
        dataType:"json",
        success:function(json){
          $("#warningPostForm").html(json.msg);
        }
      })
    }
  })
})
