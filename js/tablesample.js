var app = angular.module("app", []);
app.controller("tableCtrl", ['$scope', function ( $scope ) {


    var pulldownHash  =[
            {value:'10', label: '未処理'},
            {value:'20', label: '処理中'},
            {value:'30', label: '処理済'}
        ];

    $scope.productPulldownStatus = pulldownHash;

    $scope.lines = [
        {product_status: '30', name: 'サンプル商品'},
        {product_status: '20', name: 'サンプル商品2'}
    ];

    $scope.addLine = function () {$scope.lines.push(createExpensesLine());};

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
        return {
            'name':''
        };
    }

}]);


