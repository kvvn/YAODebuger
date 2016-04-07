var io = require('socket.io').listen(8081);
var debug_data = {};
var servers = {};

io.sockets.on('connection', function (socket) {

  socket.on('server_name', function (url) {
    if(!servers[url]) servers[url] = [];
    servers[url].push(socket.id);
    console.log(servers);
  });

  socket.on('message', function (message) {
    debug_data = JSON.parse(message);
    sendDebug('message', debug_data);
  });

  socket.on('senderror', function (error) {
    debug_data = JSON.parse(error);
    sendDebug('senderror', debug_data);
  });

  socket.on('sendinfo', function (info) {
    debug_data = JSON.parse(info);
    sendDebug('sendinfo', debug_data);
  });

  socket.on('error', function(error){
    console.log(error);
  });

  socket.on('disconnect', function () {
    if (typeof(servers) != "undefined" && servers != null) {
      for (var key in servers) {
        var index = servers[key].indexOf(socket.id);
        if (index > -1) {
          servers[key].splice(index, 1);
        }
        if (servers[key].length == 0) {
          delete servers[key];
        }
      }
    }
  });

  function sendDebug(type, debug_data) {
    if(typeof(servers[debug_data['domain']]) != "undefined" && !isEmpty(servers[debug_data['domain']])) {
      servers[debug_data['domain']].forEach(function (v) {
        console.log(v);
        if(io.sockets.sockets[v]) {
          io.sockets.sockets[v].emit(type, debug_data['data']);
        }
      });
    } else {

      setTimeout(function(){sendDebug(type, debug_data)}, 3000);
    }
  }

  function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  }

});

console.log("Server started..");