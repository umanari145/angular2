var appMain = angular.module("appMain", ['ui.bootstrap'])
.controller("tableCtrl", ['$scope','$filter', function ( $scope, $filter ) {


    var pulldownHash  =[
            {value:'10', label: '未処理'},
            {value:'20', label: '処理中'},
            {value:'30', label: '処理済'}
        ];

    $scope.productPulldownStatus = pulldownHash;

    $scope.lines = [
        { product_id: '3457' , code:'abc' , name: 'サンプル商品A', product_status: '30' , selected:'a' , amount:10},
        { product_id: '4578' , code:'def' , name: 'サンプル商品B', product_status: '20' , selected:'b' , amount:20}
    ];

    $scope.addLine = function () {$scope.lines.push(createExpensesLine());};

    //フィルタリングを行う
    $scope.getSearch = function(val) {

    	//実務で使うときはDBを呼ぶ
        var productCandidate =[
                               { product_id:'3457' , code:'abc' , name:'サンプル商品A'},
                               { product_id:'4578' , code:'def' , name:'サンプル商品B'},
                               { product_id:'5789' , code:'ghi' , name:'サンプル商品C'},
                               { product_id:'7890' , code:'jk' , name:'サンプル商品D'}
        ];

        return $filter('filter')( productCandidate ,{
            'code': val
        });
    };

    $scope.setCandidate = function( $item, line ){
        line.product_id = $item.product_id;
        line.code       = $item.code;
        line.name       = $item.name;
    }

    $scope.removeLine = function( singleLine ){
        var lines = $scope.lines;
        var index = lines.indexOf( singleLine );

        if( index >= 0 ) {
            lines.splice(index,1);
        }
    }

    if( $scope.lines.length === 0 ){
        $scope.lines.push(createExpensesLine());
    }

    function createExpensesLine() {
        return { product_id:'' , code:'' , name: '', product_status: '30', selected:'a', amount:'0'};
    }

}]);


