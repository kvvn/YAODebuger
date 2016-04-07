<?php
/**
 * Created by PhpStorm.
 * User: kvvn
 * Date: 4/7/16
 * Time: 12:01 PM
 */

include_once('YAODebugger.php');

$config = [
    'host' => 'localhost', // url or your nodejs server
    'port' => 8081, // port of your nodejs server
    'domain' => 'localhost']; // host where php code is running
$debugger = YAODebugger::getInstance($config);
$debugger->log(new TestClass());
//$debugger->error('error');
//$debugger->info('info');




class TestClass {
    public $a = 2, $b = 4;
    public function __construct(){

    }
}