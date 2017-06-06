var appMain = angular.module("appMain", ['ui.bootstrap','ui.sortable'])
.controller("sampleCtrl", ['$scope','$http' , function ( $scope, $http ) {

    $scope.lines = [
        { id:'1', name: 'tarou'},
        { id:'2', name: 'jirou'},
        { id:'3', name: 'saburou'},
        { id:'4', name: 'shirou'},
        { id:'5', name: 'gorou'},
        { id:'6', name: 'rokurou'},
        { id:'7', name: 'shichirou'}
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
        var length = $scope.lines.length+1;
        return { id:length, name:length + "rou" };
    }

    $scope.sortableOptions = {
        'axis': 'y'
    };

}]);


