$(document).ready(function(){
  //FORM SUBMIT AJAX CALL
  $('form').on('submit', function (e){
    e.preventDefault();
    var input =$('input').val();
    
    if(input.length > 0){

      $.ajax({
        url: "/todos",
        dataType: "json",
        method: "POST",
        data:{
          input: input
        }
      
      }).done(function(serverResponse){
        var array = serverResponse.todos;
        $('input').val("");//CLEARS INPUT BAR
        $('ul').empty();//CLEARS ALL OLD INPUTS AND UPDATES PAGE WITH ALL OLD INPUTS + NEW INPUT
        array.forEach(function(el){
          $('ul').append("<li>" + el.task + "</li>");
        });
      });
    }
    else{
      console.log('no input');
    }
  });

  $('#clear_todo').on('click', function(e){
    e.preventDefault();
    $('ul').empty();
    $.ajax({
      url:"/clear",
      dataType: "json",
      method: "DELETE"
    }).done(function(serverResponse){
    });
  });
});