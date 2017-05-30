var app = angular.module("myApp", ["ngRoute","ngResource"]);
app.config(function($routeProvider, $locationProvider) {
    //この指定がないとAngularの1.6以降はroutingがうごかない
    $locationProvider.hashPrefix('');
    $routeProvider
    .when("/", {
        templateUrl : "main.html",
        controller : "mainCtrl"
    })
    .when("/items", {
        templateUrl : "items.html",
        controller : "itemCtrl"
    }).when("/blue", {
        templateUrl : "blue.html",
        controller : "blueCtrl"
    });
}).controller("mainCtrl", function ($scope) {
    $scope.msg = "color ";
}).controller("itemCtrl", function ($scope, $resource) {

    //DBからrestを返してもらって読み込み
    var rest = $resource("http://192.168.1.28/angular/public/angular_rest.php");

    rest.query(function(data, headers){
        $scope.items = data;
        console.log("success");
      },function(err) {
        $scope.msg = "サーバーレスポンスエラー：" + err.statusText;
      }
    );

    $scope.saveAction = function(){
        rest.save( {'name':'jirou'} , function(){});
    }

}).controller("blueCtrl",function($scope){
    $scope.msg = "color is blue";

});