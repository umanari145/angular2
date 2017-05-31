<?php
require_once dirname(__DIR__) .'/vendor/autoload.php';

$app = new \Slim\Slim();

// ルーティングの設定
$app->get('/routing/:rm/:action', function($rm, $action){
    echo 'run mode, ', $rm .' action ' . $action;
});

$app->run();