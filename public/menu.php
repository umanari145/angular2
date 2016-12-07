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

	case 'GET' :

		$salaryData = getSalaryInfo ( 1 );
		echo json_encode ( $salaryData );
        exit();
		break;
	case 'POST':
      $request_body = file_get_contents('php://input');
      $post_data = json_decode($request_body);
      saveBlogSalary($post_data);
      exit();
      break;
}

function saveBlogSalary( $post_data ){


	foreach( $post_data->detail as $data ) {
		$blog = ORM::for_table('blog_reward')->find_one($data->id);
		$blog->set('entry_number' , $data->entry_number );
		$blog->save();
	}

}



function getSalaryInfo( $userId  ){

    list($expenses , $blogExpenses, $issues) = getSalary( $userId );

    //$madeIssues, $finishedIssues) = getGroupbyTargetMonthSalary( 3, $targetMonth, $expenses , $blogExpenses, $issues);

    $targetMonthArr = makeTargetMonthArr();

    $salaryData = [
    	'expenses'             => $expenses,
    	'blog_expenses'        => $blogExpenses,
        'issues'               => $issues,
    	'current_target_month' => $targetMonthArr['current_target_month'],
    	'target_month_arr'     => $targetMonthArr['target_month_arr']
    ];

    return $salaryData;

}


function getGroupbyTargetMonthSalary( $redmineUserId, $targetMonth, $expenses =[], $blogExpenses =[], $issues =[]){

    //月固定費
    $expensesByTargetMonth      = _::where( $expenses ,['target_month' => $targetMonth ]);

    //ブログ報酬費
    $blogExpensesByTargetMonth0  = _::where( $blogExpenses ,['target_month' => $targetMonth ]);

     $blogExpensesSalaryArr = _::pluck( $blogExpensesByTargetMonth0 ,'salary' );

      $blogExpensesByTargetMonth =[
        'salary' =>  _::sum($blogExpensesSalaryArr),
        'detail' => $blogExpensesByTargetMonth0
     ];

    return [$expensesByTargetMonth, $blogExpensesByTargetMonth, $madeIssues, $finishedIssues];
}


/**
 * 報酬の獲得
 *
 * @param unknown $userId
 * @return multitype:unknown
 */
function  getSalary( $userId ){

    //月ごとの経費
    $expenses;
    //if( !isset( $_SESSION['expense']) ) {
        $expenses = ORM::for_table ( 'expense' )->select_many ( 'amount', 'detail')->select_expr(" DATE_FORMAT( effective_dt , '%Y%m' ) " , "target_month"  )->where_equal ( 'expense.user_id', $userId )->find_array ();
      //  $_SESSION['expense'] = $expenses;
    //} else {
    //    $expenses = $_SESSION['expense'];
    //}

    //ブログ報酬費
    $blogExpenses;
    //if( !isset( $_SESSION['blog_reward'])) {
        $blogExpenses = ORM::for_table ( 'blog_reward' )
                    ->select_many ( 'blog_reward.id' , 'blog_master_id', 'blog_name' ,'entry_number' ,'target_month')
                    ->select_expr( 'entry_number * 300 as salary')
                    ->join('blog_master', 'blog_reward.blog_master_id = blog_master.id')
                    ->where_equal ( 'user_id' , $userId )
                    ->find_array ();
      //  $_SESSION['blog_reward'] = $blogExpenses;
    //}else {
     //   $blogExpenses = $_SESSION['blog_reward'];
    //}


    //if( !isset($_SESSION['ticket'] )) {
        $issues = getTicketSalary();
    //    $_SESSION['ticket'] = $issues;
    // } else {
    //    $issues = $_SESSION['ticket'];
    //}

    return [$expenses , $blogExpenses, $issues];
}

function getTicketSalary(){

    $issues = ORM::for_table('issues', 'remote')
                ->select_many("id","project_id","status_id","assigned_to_id","author_id","subject")
                ->select_expr(" DATE_FORMAT( created_on , '%Y%m' ) ", "created_target_month")
                ->select_expr(" DATE_FORMAT( closed_on , '%Y%m' ) ",  "closed_target_month")
                ->find_array();
    return $issues;
 }

function  makeTargetMonthArr(){

 	$year  = date('Y');
 	$month = date('m');


 	$targetMonthArr = [];
    for( $i=0; $i <12; $i++ ){
    	$label = "";
    	$value = "";
    	$dt  = Carbon::create($year, $month ,1);
    	$targetDate = $dt->addMonths(-$i);
    	$label = $targetDate->format('Y年m月');
    	$value = $targetDate->format('Ym');

    	$targetMonthArr[] = [
    		'label' => $label,
    		'value' => $value
    	];
    }

    $currentTargetMonth = Carbon::create($year, $month ,1)->format('Ym');

    return [ 'current_target_month' =>  $currentTargetMonth  ,'target_month_arr' => $targetMonthArr];
 }

