//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//

var database = require('./database.js');

var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');
var request = require("request");

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));
var messages = [];
var sockets = [];

//collection=userList&amp;criteria={"accountType":"dummy"}&amp;sort={}&amp;limit=500
  
io.on('connection', function (socket) {
    messages.forEach(function (data) {
      socket.emit('message', data);
    });

    sockets.push(socket);

    socket.on('disconnect', function () {
      sockets.splice(sockets.indexOf(socket), 1);
      updateRoster();
    });

    socket.on('message', function (msg) {
      var text = String(msg || '');

      if (!text)
        return;

      socket.get('name', function (err, name) {
        var data = {
          name: name,
          text: text
        };

        broadcast('message', data);
        messages.push(data);
      });
    });

    socket.on('identify', function (name) {
      socket.set('name', String(name || 'Anonymous'), function (err) {
        updateRoster();
      });
    });
  });

function updateRoster() {
  async.map(
    sockets,
    function (socket, callback) {
      socket.get('name', callback);
    },
    function (err, names) {
      broadcast('roster', names);
    }
  );
}

function broadcast(event, data) {
  sockets.forEach(function (socket) {
    socket.emit(event, data);
  });
}

server.listen(7878, function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
  
  
  /*for (var i = 0; i < 100; i++) {
    request("http://www.naver.com", function(error, response, body) {
    if(error){
      console.log("error = " + error);
    } 
    console.log(body);
  });
  }*/
  
  
  
});
/*

database.connect(function() {
  // Start the application after the database connection is ready
  //app.listen(3000);
  console.log("database.connect");
  setInterval(function(){
    database.doSomethingWithDatabase(function(docs){
      console.log((docs));
    });
    //console.log("xxxxx");
  },5000); 
}); */

 