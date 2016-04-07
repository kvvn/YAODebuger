# YAODebuger 
is Yet Another One debugger for PHP code

It allows to send debug information into native browser console.
To run server part "YAODebuger" you will need NodeJS with socket.io

(To setup use:
	sudo port install nodejs
	sudo port install npm
	npm install socket.io
)
And socket.io-client for clien side (it could be instaled by bower, see bower.json).

To start debugging get instanse of YAODebugger class in your PHP code.
And use one of it's methods: 

$config = [
    'host' => 'localhost', // url or your nodejs server
    'port' => 8081, // port of your nodejs server
    'domain' => 'localhost']; // host where php code is running
$debugger = YAODebugger::getInstance($config);
$debugger->log('some information');


To send information over socket to NodeJS server SocketIO PHP_SocketIO_Client (https://github.com/psinetron/PHP_SocketIO_Client) was used.


