var app = angular.module("app", ["ngResource"]);

app.controller("expenseCtrl", ['$scope', '$http','$filter' , function ( $scope, $http ,$filter) {

    var uri ='http://192.168.33.10/angular/public/expense.php';

    $scope.expenses = [];

    $scope.saveExpenses = function( expenses ){
    	$http({
            method : 'POST',
            url : uri,
            data: expenses
         //   headers: { 'Content-Type': ' text/javascript; charset=UTF-8' }
    	}).success(function(data, status, headers, config) {
    		 console.log("aaaa");
        }).error(function(data, status, headers, config) {
            console.log(status);
        });
    }


    $scope.addLine = function () {
        $scope.expenses.push(createExpensesLine());
    };

    $scope.removeLine = function( singleLine ){
        var lines = $scope.expenses;
        var index = lines.indexOf( singleLine );

        if( index >= 0 ) {
            lines.splice(index,1);
        }
    }

    if( $scope.expenses.length === 0 ){
        $scope.expenses.push(createExpensesLine());
    }

    function createExpensesLine() {
        return {
            'effective_dt': Date.create().format('{yyyy}-{MM}-{dd}'),
            'detail': '',
            'amount':0
        };
    }

}]);


