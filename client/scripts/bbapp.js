var app = {
  rooms: {}
};

app.init = function () {
  app.fetch();
  setTimeout(function () {
    $('#roomSelect').append(roomView.render().el);  
  }, 2000)
}


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
      userCol.add(response.results);
      app.roomCollectionAdd(response.results);
    }
  });
};

app.roomCollectionAdd = function (response) {
  var results = [];
  for (var i = 0 ; i < response.length ; i++) {
    app.rooms[response[i]['roomname']] = true;
  }

  for (var room in app.rooms) {
    results.push({roomname : room})
  }
  roomCol.add(results);
}


app.init();