var startDebugger = function() {
    console.log('start debugger');

    var URL = 'http://localhost:8081';
    var socket = io.connect(URL);
    var domain = '';
    if (window.location.hostname == '' || typeof(window.location.hostname) == "undefined" || window.location.hostname == null) {
        domain = 'localhost';
    } else {
        domain = window.location.hostname;
    }
    socket.on('connect', function () {

        socket.emit('server_name', domain);

        socket.on('message', function (msg) {
            console.log("Exite debugger: " + JSON.stringify(msg));
        });
        socket.on('senderror', function (msg) {
            console.error("Exite debugger: " + JSON.stringify(msg));
        });
        socket.on('sendinfo', function (msg) {
            console.info("Exite debugger: " + JSON.stringify(msg));
        });
    });
};


var loadScript = function (callback)
{
    // Adding the script tag to the head as suggested before

    console.log('load socket io lib');
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '../jspart/bower_components/socket.io-client/socket.io.js';

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
};