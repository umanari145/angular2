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

    var rest = $resource("http://192.168.1.28/angular/routing/data.json");

    rest.query(function(data, headers){

        $scope.users = data;
        console.log("success");

      },function(err) {
        $scope.msg = "サーバーレスポンスエラー：" + err.statusText;
      }
    );

}).controller("blueCtrl",function($scope){
    $scope.msg = "color is blue";

});