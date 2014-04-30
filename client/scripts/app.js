// YOUR CODE HERE:
var app = {
  rooms: {},
  friends: {}, 
  user: window.location.search.slice(10)
};

app.init = function () {
  setInterval(function () {
    app.fetch();
    console.log('Retrieving new messages...')
  }, 5000);
};

app.send = function (message) {
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function (room) {
  var parameters = encodeURI('order=-createdAt')
  var filter = encodeURI('where={"roomname":"' + room + '"}');

  if(room !== undefined) { var parameters = parameters + '&' + filter; }

  $.ajax({
    url : 'https://api.parse.com/1/classes/chatterbox',
    type : 'GET',
    data : parameters,
    contentType: 'application/json',
    success: function (response) {
      app.spread(response);
    }
  });
};

app.server = 'https://api.parse.com/1/classes/chatterbox'

app.clearMessages = function () {
  $('#chats').empty();
};

app.addMessage = function (message) {
  var username = message.username;
  var text = message.text;
  var room = message.room;

  $('#chats').append('<div class="messages" "'+ username +'">' + username + ': ' + text + '</div>')

};

app.currentRoom;

app.addRoom = function (roomName) {
  _.each(app.rooms, function (element, key) {
    // console.log(key);

    if (key.indexOf('<') === -1 && key.indexOf('.') === -1 && key.indexOf(' ') === -1 && key.indexOf('!') === -1 && key.indexOf("'")) {
      if ($('#roomSelect').find('.' + key).length === 0) {
         $('#roomSelect').append('<button value="' + key + '" class="roomButtons ' + key + '">' + key + '</button>')  
      }
    }

  });

  $('.roomButtons').on('click', function () {
    var val = $(this).val();
    app.currentRoom = val;    
    $('.header').html('<h1>chatterbox: ' + val + '</h1>');
    $('#chats').append('<h1>' + val.toUpperCase() + '</h1>')
    _.each(app.rooms[val], function (msg) {
      var username = msg.username;
      var objectId = msg.objectId;
      var text = msg.text;
      $('#chats').append('<div class="messages '+ objectId + ' ' + val + '"></div><hr>');
      $('#chats').find('.' + objectId).text(username + ': ' +  text);
    });
    $('#chats').animate({scrollTop: $('#chats').prop('scrollHeight')}, 500);
  });
}

app.addFriend = function () {

};

app.handleSubmit = function () {

};

app.spread = function (response) {
  var message = response.results;
  for (var i = 0 ; i < message.length ; i++) {
    // console.log(message[i])
    var roomname = message[i]['roomname'];
    if (roomname === '' || roomname === 'undefined' || roomname === null) {
      roomname = 'lobby';
      if (app.rooms.hasOwnProperty(roomname)) {
        app.rooms[roomname].unshift({username: message[i]['username'], text: message[i]['text'], createdAt: message[i]['createdAt'], objectId: message[i]['objectId'], set: false});
      } else {
        app.rooms[roomname] = [{username: message[i]['username'], text: message[i]['text'], createdAt: message[i]['createdAt'], objectId: message[i]['objectId'], set: false}]
      }
    } else {
      if (app.rooms.hasOwnProperty(roomname)) {
        app.rooms[roomname].unshift({username: message[i]['username'], text: message[i]['text'], createdAt: message[i]['createdAt'], objectId: message[i]['objectId'], set: false});
      } else {
        app.rooms[roomname] = [{username: message[i]['username'], text: message[i]['text'], createdAt: message[i]['createdAt'], objectId: message[i]['objectId'], set: false}]
      }
    }
  }
  app.addRoom();
  app.init();
}