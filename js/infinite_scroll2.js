var app = angular.module("myApp", ['infinite-scroll']);
app.factory('loadZip',function($http){

    return {
        getAddressLimit:function(limit){
            return $http.get('http://192.168.1.28/angular/public/address/' + limit ).then(function(data){
                return data;
            });
        }
    }
});

app.controller('infiniteScroolCtrl', function( $scope, loadZip ){

    $scope.next = 0;

    $scope.getZip = function(){
        loadZip.getAddressLimit( $scope.next).then(function(res){
            for(var i = 0; i < res.data.length; i++) {
                $scope.items.push(res.data[i]);
                $scope.next++;
                console.log($scope.next);
            }
        });
    };

    loadZip.getAddressLimit(0).then(function(res){
        $scope.items = res.data;
        $scope.next = $scope.items.length;
    })

});
