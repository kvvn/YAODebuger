<?php
/**
 * Created by PhpStorm.
 * User: kvvn
 * Date: 4/7/16
 * Time: 11:42 AM
 */
include_once('SocketIO.php');

class YAODebugger {
    private $host, $port, $socket_io, $domain;
    private static $_instance = null;

    private function __construct(array $config) {
        $this->socket_io = new SocketIO();
        $this->host = $config['host'];
        $this->port = $config['port'];
        $this->domain = $config['domain'];
    }
    protected function __clone() {
    }

    static public function getInstance(array $config) {
        if(is_null(self::$_instance))
        {
            self::$_instance = new self($config);
        }
        return self::$_instance;
    }

    public function log($data) {
        $this->sendReqest($data, 'message');
    }
    public function error($data) {
        $this->sendReqest($data, 'senderror');
    }
    public function info($data) {
        $this->sendReqest($data, 'sendinfo');
    }

    private function sendReqest($data, $type = 'message') {
        $message = [];
        $message['data'] = $data;
        $message['domain'] = $this->domain;
        $this->socket_io->send($this->host, $this->port, $type, json_encode($message));
    }



}


