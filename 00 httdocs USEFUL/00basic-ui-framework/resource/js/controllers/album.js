//as.controller('HomeCtrl', function($scope, $http){

function AlbumCtrl($scope, cache){
    $scope.album = {};
    
    var load = function() {
        console.log('call AlbumCtrl load()...');
        $http.get($rootScope.appUrl + '/albums/' + $routeParams['id'])
                .success(function(data, status, headers, config) {
                    $scope.album = data;
                    angular.copy($scope.album, $scope.copy);
                });
    };

    load();  
	
}
	
//});
