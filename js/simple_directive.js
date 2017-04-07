var app = angular.module("myApp", []);

app.directive("test", function () {
    return {
        restrict: "E",
        template: "<div>これはテストだよ！</div>"
    }
})