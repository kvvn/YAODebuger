<?php
/**
 * Created by PhpStorm.
 * User: kvvn
 * Date: 4/7/16
 * Time: 12:01 PM
 */

include_once('YAODebugger.php');

$debugger = YAODebugger::getInstance(['host' => 'localhost', 'port' => 8081, 'domain' => 'localhost']);
$debugger->log(new TestClass());
//$debugger->error('error');
//$debugger->info('info');




class TestClass {
    public $a = 2, $b = 4;
    public function __construct(){

    }
}