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
        //htmlの属性の1つとして付与され、関数をreturnします。
        //おそらく最も使うパターン
        restrict: "A",
        link: function() {
            alert("テストですが何か?");
        }
    };
}).directive("test3", function () {
    return {
        //Cはクラス
        //その名の通りclassに対して付与されます。
        restrict: "C",
        link: function() {
            alert("クラスについていればOKです。");
        }
    };
});