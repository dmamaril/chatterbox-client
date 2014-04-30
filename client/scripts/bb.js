// var templateHelper = function (id) {
//   return _.template( $('#' + id).html() );
// }

var User = Backbone.Model.extend({
  defaults: {
    username: 'anon',
    text: 'Stuff',
    roomname: 'lobby'
  }
});

// ****** CHAT ANIMATE FUNCTIONALITY ****** //
    // $('#chats').animate({scrollTop: $('#chats').prop('scrollHeight')}, 500);

// Define Collection with model: User;
var Users = Backbone.Collection.extend({ model: User });

// Define single UserView 
var UserView = Backbone.View.extend({
  template: _.template('<%-username%>' + ': ' + '<%-text%><hr>'),
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

// Define Collection View
var UsersView = Backbone.View.extend({
  render: function () {
    this.collection.each(function (user) {
      var newUser = new UserView({model: user});
      this.$el.append( newUser.render().el );
    }, this);
    return this;
  }
});


// ----------------------------------------------------------------

// ----------------------------------------------------------------

// ----------------------------------------------------------------


var Room = Backbone.Model.extend({
  defaults: {
    roomname: 'lobby'
  }
});

var Rooms = Backbone.Collection.extend({ model : Room });

// Define single RoomView 
var RoomView = Backbone.View.extend({
  tagName: 'button',
  template: _.template('<%-roomname%>'),
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

// Define Collection View
var RoomsView = Backbone.View.extend({
  render: function () {
    this.collection.each(function (room) {
      var newRoom = new RoomView({model: room});
      this.$el.append( newRoom.render().el);
    }, this);
    return this;
  }
});

// DEFINE COLLECTION
var userCol = new Users;
var roomCol = new Rooms;
// DEFINE USERVIEW 
var userView = new UsersView({ collection: userCol });
var roomView = new RoomsView({ collection: roomCol });
