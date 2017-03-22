var app = angular.module("app", []);
app.controller("tableCtrl", ['$scope', function ( $scope ) {

    $scope.lines = [];

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


