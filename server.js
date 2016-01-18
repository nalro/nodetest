/*
io.on('connection', function (socket) {
  console.log("connection");
  
  socket.on('disconnect', function () {
       console.log("disconnect");
    });
    
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
      socket.set('name', String(name || '손님'), function (err) {
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
}*/

//var async = require('async');
//var express = require('express');
 
//var api = require('./client/api');
//var app = express();


var http = require('http');  

var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
  console.log("xxxx");
});

var addr = server.address();
console.log("Chat server listening at", addr.address + ":" + addr.port);
  



var sockets[];
var io = require('socket.io')(server);

io.sockets.on('connection', function (socket) { 
  console.log("connection"); 
  
  sockets.push(socket);
  
  socket.emit("hi", "hello");
  
  socket.on('disconnect', function () {
    sockets.splice(sockets.indexOf(socket), 1);
    printStatus();
  }); 
  
}); 

server.listen(7000);

function printStatus() {
  console.log("socket counht = " + sockets.length);
}
 
