<?php

session_start();

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
		$salaryData = getSalaryInfo ( 1 );
		echo json_encode ( $salaryData );
        exit();
		break;
	case 'POST':
	    $request_body = file_get_contents('php://input');
	    $post_data = json_decode($request_body);
        savePost($post_data);
	    exit();
	    break;
}

function getSalaryInfo( $userId  ) {
    $datas = ORM::for_table ( 'members' )->select_many ( 'id', 'name')->find_array ();
    return $datas;
}

function savePost($data) {
    $blog = ORM::for_table('members')->create();
    $blog->set(['name'=>'jirou']);
    $blog->save();

    $member = ORM::for_table('members')->find_one(1);
    $member->set('name' ,'tarou' .time());
    $member->save();
}
