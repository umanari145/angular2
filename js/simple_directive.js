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
}).directive("enter", function () {
    //なお省略すると自動的にrestrict:A,linkになりますので
    //省略してもOKです。
    //controllerのscopeを引き継ぎ、要素にイベントリスナを定義できます。
    //マウスが
    return function (scope, element) {
        element.bind("mouseenter", function () {
            console.log("mouse in");
        });
    };
}).directive("leave", function () {
    //マウスが離れたときの動きを定義
    return function (scope, element) {
        element.bind("mouseleave", function () {
            console.log("mouse leave");
        });
    };
}).directive("enter2", function () {
    //属性を引数として取得することができる
    return function (scope, element, attr) {
        element.bind("mouseenter", function () {
            //enter2が1つの要素になっているのでその値を取得することができる
            console.log(attr.enter2);
        });
    };
});
