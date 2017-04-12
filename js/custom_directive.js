var app = angular.module('app',['appMain'])
.directive('moveFocus', function(){
    return function( scope, element, attrs ) {
        element.bind("keydown keypress", function (event) {
             var targetElementsCondition = "input[type='text']";
             var keyCode = event.which || event.keyCode;
             if ( keyCode === 13 ) {
                 //移動対象の要素をこれで取得します。
                 var $list = $(targetElementsCondition);
                  //自分の番地はindex(this)で判定します。
                  var num = $list.index(this);
                  var target = num + 1;

                  if( target < $list.length ){
                      //これが移動したい先のhtml
                      $list[target].select();
                      event.preventDefault();
                   } else {
                       //controllerのメソッド呼ぶ
                       scope.$apply( attrs.moveFocus );
                   }
              }
          });
      };
});