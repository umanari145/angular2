var appMain = angular.module("appMain", ['ui.bootstrap','ui.sortable'])
.controller("tableCtrl", ['$scope','$filter','$http' , function ( $scope, $filter, $http ) {

    var pulldownHash  =[
            {value:'10', label: '未処理'},
            {value:'20', label: '処理中'},
            {value:'30', label: '処理済'}
        ];

    $scope.productPulldownStatus = pulldownHash;

    $scope.lines = [
        { id:'12', product_id: '3457' , code:'abc' , name: 'サンプル商品A', product_status: '30' , selected:'a' , amount:10},
        { id:'13', product_id: '4578' , code:'def' , name: 'サンプル商品B', product_status: '20' , selected:'b' , amount:20}
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

    //フィルタリングを行う
    $scope.getZip = function(val) {
        //DBからrestを返してもらって読み込み
        if(val.length >= 5 ){
            return data2 = $http.get('http://192.168.1.28/angular/public/address/' + val).then(function(res){
                return res.data;
            });
        }
    }

    $scope.setCandidate = function( $item, line ){
        line.product_id = $item.product_id;
        line.code       = $item.code;
        line.name       = $item.name;
    }

    $scope.setAddress = function( $item, line ){
        line.zip     = $item.zip;
        line.address = $item.address1 + $item.address2 + $item.address3;
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
        return { id:'', product_id:'' , code:'' , name: '', product_status: '30', selected:'a', amount:'0'};
    }

    var ctrl = this;
    ctrl.sortableOptions = {
        'handle' : '[data-js=drag__handle]',
        'axis '  : 'y',
        'start'  : function(event, ui) {
          ui.item.startPos = ui.item.index();
        },
        'stop'   : function(event, ui) {
            var startPos = ui.item.startPos;
            var endPos   = ui.item.index();
            if(!angular.equals(startPos, endPos)) {
                var rowData = ctrl.items[startPos];
                ctrl.items.splice(startPos, 1);
                ctrl.items.splice(endPos, 0, rowData);
                $scope.$apply();

            }
        }
    };

}]);


