$(document).ready(function () {
  app.fetch();

  $('.addMsg').on('click', function () {
    var val = $('.inputMsg').val();
    // document.getElementById( 'chats' ).scrollIntoView();
    var message = {
      'username': app.user,
      'text': val,
      'roomname': app.currentRoom
    };
    console.log(message);
    // console.log(JSON.stringify(message));
    app.send(message);
    // append message to current room;  
    app.addMessage(message)
    $('#chats').animate({scrollTop: $('#chats').prop('scrollHeight')}, 500);
  });
});