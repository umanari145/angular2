var app = angular.module("myApp", []);
app.controller('infiniteScroolCtrl',function( $scope ){

    $scope.addData = function(){
        console.log("scroll中");
    };

}).directive("detectScroll", function ( $window ) {
    //scroll量を検知し、一定数のscroll量に達したらメソッドを発動する
    return function (scope, element, attr) {
        //ただのelement.bindだとscrollのイベントリスナーにならない
        angular.element( $window ).bind("scroll", function () {
            scope.$apply( attr.detectScroll );
        });
    };
});
