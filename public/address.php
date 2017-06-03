<?php

require_once dirname(__DIR__) .'/vendor/autoload.php';
require_once __DIR__ .'/angular_config.php';

use Underbar\ArrayImpl as _;
use Carbon\Carbon;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Monolog\Formatter\LineFormatter;



$logging_path = dirname(__DIR__) . '/logs/test_log.log';
$stream = new StreamHandler($logging_path, Logger::INFO);
$logger = new Logger('foo_test');
$logger->pushHandler($stream);
$logger->pushProcessor(function ($record) {
    $record['extra']['dummy'] = '';
    return $record;
});

/*
 *
 * DBの接続設定
 */
try {
    //メインのDB
    ORM::configure( sprintf('%s:host=%s;dbname=%s;port=%d', DB_DSN, DB_HOST, DB_NAME, DB_PORT));
    ORM::configure('username', DB_USER );
    ORM::configure('password', DB_PASS );
    ORM::configure('driver_options', array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
    ORM::configure('logging', true);

    ORM::configure('logger', function($log_string) use ($logger) {
        $logger->addInfo('sql ' . $log_string );
    });

} catch (Exception $e) {
    $app->halt(500, $e->getMessage());
}

switch ($_SERVER ['REQUEST_METHOD']) {
     case 'GET' :
        //暫定的にzipをoffsetとして扱う
        $zip = ( isset($_GET['zip']) && preg_match( '/^\d{1,7}$/',$_GET['zip']) === 1 ) ? $_GET['zip']:'';
        $offset = ( isset($_GET['offset']) && preg_match( '/^\d+$/',$_GET['offset']) === 1 ) ? $_GET['offset']:0;
        $addressinfo = getAddress ($zip, $offset);
        echo json_encode ( $addressinfo);
        exit();
     break;
}

function getAddress ($zip, $offset) {
    $datas =[];

    $query = ORM::for_table ( 'zip' )
             ->select_many ( 'id', 'zip', 'address1', 'address2', 'address3');

    if( !empty($zip)) {
        $query->where_like('zip',  $zip.'%');
    }

    $datas = $query->limit(10)
           ->offset($offset)
           ->find_array ();

    return $datas;
}

