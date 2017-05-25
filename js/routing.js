var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider, $locationProvider) {
    //この指定がないとAngularの1.6以降はroutingがうごかない
    $locationProvider.hashPrefix('');

    $routeProvider
    .when("/", {
        templateUrl : "main.html",
        controller : "mainCtrl"
    })
    .when("/red", {
        templateUrl : "red.html",
        controller : "redCtrl"
    }).when("/blue", {
        templateUrl : "blue.html",
        controller : "blueCtrl"
    });
}).controller("mainCtrl", function ($scope) {
    $scope.msg = "color ";
}).controller("redCtrl", function ($scope) {
    $scope.msg = "color is red";
}).controller("blueCtrl",function($scope){
    $scope.msg = "color is blue";

});