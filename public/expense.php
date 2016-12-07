<?php

session_start();

require_once dirname(__DIR__) .'/vendor/autoload.php';
require_once __DIR__ .'/config.php';
use Underbar\ArrayImpl as _;
use Carbon\Carbon;

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

    //redmine
    ORM::configure(sprintf('%s:host=%s;dbname=%s;port=%d', RDMINE_DB_DSN, RDMINE_DB_HOST, RDMINE_DB_NAME, RDMINE_DB_PORT), null, 'remote');
    ORM::configure('username', RDMINE_DB_USER, 'remote');
    ORM::configure('password', RDMINE_DB_PASS, 'remote');
    ORM::configure('driver_options', array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8') ,'remote');

} catch (Exception $e) {
    $app->halt(500, $e->getMessage());
}

switch ($_SERVER ['REQUEST_METHOD']) {

	case 'POST':
      $request_body = file_get_contents('php://input');
      $post_data = json_decode($request_body);
      saveExpenseSalary($post_data);
      break;
}

function saveExpenseSalary( $post_data ){
	foreach( $post_data as $data ) {
		$expense = ORM::for_table('expense')->create();

        foreach ( $data as $column => $val){
            $expense->set( $column , $val);
        }

        $expense->set_expr('create_dt', 'NOW()');
        $expense->set_expr('update_time', 'NOW()');
        $expense->save();
    }
}



