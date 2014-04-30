$(document).ready(function () {
  app.fetch();

  $('.addMsg').on('click', function () {
    var val = $('.inputMsg').val();
    $('.inputMsg').val('');
    var message = {
      'username': app.user,
      'text': val,
      'roomname': app.currentRoom
    };
    app.send(message);
    // append message to current room;  
    app.addMessage(message)
    $('#chats').animate({scrollTop: $('#chats').prop('scrollHeight')}, 500);
  });

  $('.inputMsg').on('keypress', function(e) {
    if(e.which === 13) {
      var val = $('.inputMsg').val();
      $('.inputMsg').val('');
      var message = {
        'username': app.user,
        'text': val,
        'roomname': app.currentRoom
      };
      app.send(message);
      // append message to current room;  
      app.addMessage(message)
      $('#chats').animate({scrollTop: $('#chats').prop('scrollHeight')}, 500);   
    }
  });

});