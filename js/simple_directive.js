var app = angular.module("myApp", []);
app.directive("test", function () {
    return {
        //"test"という名前の要素("E")を持つDOMは
        //テンプレートとして"<div>これはテストだよ！</div>"というテンプレートを使うという意味
        restrict: "E",
        template: "<div>これはテストだよ！</div>"
    }
}).directive("test2", function () {
    return {
        //Aは属性
        //テンプレートとして"<div>これはテストだよ！</div>"というテンプレートを使え！
        restrict: "A",
        link: function() {
            alert("テストですが何か?");
        }
    };
});