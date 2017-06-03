//
var app = angular.module("myApp", ['infinite-scroll']).value('THROTTLE_MILLISECONDS', 500);
app.factory('loadZip',function($http){

    return {
        getAddress:function(offset){
            return $http.get('http://mycentos/angular/public/address/' + offset ).then(function(data){
                return data;
            });
        }
    }
});

app.controller('infiniteScroolCtrl', function( $scope, loadZip ){

    $scope.offset = 0;
    $scope.isLoading = false;
    $scope.items =[];
    $scope.getZip = function(){
    	$scope.isLoading = true;
        loadZip.getAddress( $scope.offset ).then(function(res){
            for(var i = 0; i < res.data.length; i++) {
                $scope.items.push(res.data[i]);
            }
            var length = $scope.items.length;
            $scope.offset = $scope.items[length-1]['id'];
            $scope.isLoading =false;
        });
    };

});
