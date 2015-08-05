(function() {
    var as = angular.module('myApp.controllers', []);
  

  as.controller('HomeCtrl', function($scope, $http, cache){
    //function HomeCtrl($scope, cache){
    	$scope.name;
    	
    	var name = cache.get('name');
    	 
    	  if (name) { // If there’s something in the cache, use it!
    		  $scope.name = name;
//    		  console.log("Name found in cache");
//    		  	console.log(cache.info());
    	  }
    	  else { // Otherwise, let’s generate a new instance
    		cache.put('name', 'ADDY');
    		  console.log("Name NOTTTTT found in cache");
    	  }
    	
        var loadUsage = function() {
            console.log('call HomeCtrl loadUsage()...');
            $http.get($scope.rootUrl + 'html-resp.php')
                .success(function(data, status, headers, config) {
                	$("#usageWrapper").html(data);
                });
        }
        //loadUsage();
    	
    //}
    });


    as.controller('UsageCtrl', ['$scope', '$http', '$log', function($scope, $http, $log){
		$log.info("Log message logged");
		
/*        var loadUsage = function() {
            console.log('call UsageCtrl loadUsage()...');
            console.log($scope.rootUrl);
            $http.get($scope.rootUrl + 'html-resp.php')
                .success(function(data, status, headers, config) {
                    //$scope.usageData = $sce.trustAsHtml(data);
                	console.log(data);
                	$("#usageData").html(data);
                });
        }*/
        
        //loadUsage();
		
	}]);


    
    as.controller('AlbumListCtrl', function($scope, $rootScope, $http, cache, $location) {
        var loadAlbumList = function() {
            console.log('call AlbumListCtrl load()...');
            $http.get($rootScope.appUrl + '/albums')
                    .success(function(data, status, headers, config) {
                        $scope.albums = data.albums;
                        angular.copy($scope.albums, $scope.copy);
                    });
        }
        //loadAlbumList();
        
        $scope.name = cache.get("name");
        
        $scope.addAlbum = function() {
            console.log('call addAlbum');
            $location.path("/new");
        }

        $scope.editAlbum = function(index) {
            console.log('call editAlbum');
            $location.path('/edit/' + $scope.albums[index].id);
        }

        $scope.delAlbum = function(index) {
            console.log('call delAlbum');
            var todel = $scope.albums[index];
//            $http.delete($rootScope.appUrl + '/albums/' + todel.id)
//                .success(function(data, status, headers, config) {
//                    load();
//                })
//                .error(function(data, status, headers, config) {
//                });
        }

    });

    as.controller('NewAlbumCtrl', function($scope, $rootScope, $http, $location) {

        $scope.album = {};
        $scope.saveAlbum = function() {
            console.log('call saveAlbum');
            console.log($scope.album);
            $http.post($rootScope.appUrl + '/albums', $scope.album)
                .success(function(data, status, headers, config) {
                    console.log('success...');
                    $location.path('/albums');
                })
                .error(function(data, status, headers, config) {
                     console.log('error...');
                });
        }
    });

    as.controller('LoginCtrl', function($scope, $rootScope, $http, $location) {
        $scope.loginDtls = {"identity": "root@root.com", "credential": "rootroot"};
        $scope.doLogin = function() {
            console.log('call doLogin');
            console.log($scope.user);
            
            $http.post($rootScope.appUrl + '/user/login', $scope.loginDtls)
                    .success(function(data, status, headers, config) {
                        console.log('success...');
                    })
                    .error(function(data, status, headers, config) {
                         console.log('error...');
                         console.log(data);
                    });
        }
    });
    
    as.controller('ProfileCtrl', function($scope, $rootScope, $http, $location) {
        $scope.users = {};
        var load = function() {
            console.log('call ProfileCtrl load()...');
            $http.get($rootScope.appUrl + '/profile')
                    .success(function(data, status, headers, config) {
                    	$scope.users = data.users;
                        angular.copy($scope.users, $scope.copy);
                    });
        };

        //load();  
    });
    
    as.controller('RegisterCtrl', function($scope, $rootScope, $http, $location) {
//    	var registerCallback = function(response){
//    		console.log("Inside registerCallback");
//    		console.log(response);
//    		
//    	};
    	
        $scope.registerDtls = {"identity": "root@root.com", "credential": "rootroot", "credentialVerify": "rootroot"};
        $scope.doRegister = function() {
            console.log('call doRegister');
            
            if($scope.register.$invalid){
            	return;
            }
            $http.post($rootScope.appUrl + '/user/register', $scope.registerDtls)
            .success(function(response, status, headers, config) {
            	$scope.validateResponse({"sr":response}); //, "cb": registerCallback
            	
            })
            .error(function(data, status, headers, config) {
                 console.log('error...');
                 console.log(data);
            });

        };
    });
    
    
    as.controller('EditAlbumCtrl', function($scope, $rootScope, $http, $routeParams, $location) {
        $scope.album = {};
        
        var load = function() {
            console.log('call EditAlbumCtrl load()...');
            $http.get($rootScope.appUrl + '/albums/' + $routeParams['id'])
                    .success(function(data, status, headers, config) {
                        $scope.album = data;
                        angular.copy($scope.album, $scope.copy);
                    });
        };

        load();  

        $scope.updateAlbum = function() {
            console.log('call updateAlbum');

            $http.put($rootScope.appUrl + '/albums/' + $scope.album.id, $scope.album)
                    .success(function(data, status, headers, config) {
                        $location.path('/albums');
                    })
                    .error(function(data, status, headers, config) {
                    });
		}
    });
    
    as.controller('AlbumCtrl', function($scope, $rootScope, $http, $routeParams, $location) {
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
    });



}());



/*
 * 
    as.controller('AppCtrl', function($scope, $rootScope, $http, i18n, $location) {
        $scope.language = function() {
            return i18n.language;
        };
        $scope.setLanguage = function(lang) {
            i18n.setLanguage(lang);
        };
        $scope.activeWhen = function(value) {
            return value ? 'active' : '';
        };

        $scope.path = function() {
            return $location.url();
        };
        
        //
        //  $scope.validateResponse({sr: serverResponse, cb: callback});
        //
        $scope.validateResponse = function(data){
            console.log('Inside $scope.validateResponse...');
            console.log(data);
            
            //Check for errInfo
            if(!!data && !!data.sr){
            	console.log(data.sr);
            	
            	if(!!data.sr && !!data.sr.errInfo){
            		if(data.sr.errInfo.errCode === "0"){
            			//Success. Show message if required.
            			if(!!data.sr.errInfo.showMsg){
                    		$scope.message = {
                            	"show": true,
                            	"text": data.sr.errInfo.sucMsg,
                            	"type": data.sr.errInfo.sucType
                    		}
            			}
            		} else{
            			//Error. Show error message or warning
                		$scope.message = {
                        	"show": true,
                        	"text": data.sr.errInfo.errMsg,
                        	"type": data.sr.errInfo.errType
                		}
            		}
            		
            		//If redirect, reload here
            		if(!!data.sr.errInfo.reload && !!data.sr.errInfo.reload.redirect){
            			var reload = data.sr.errInfo.reload;
            			if((!!reload.redirectTo && reload.redirectTo == "home") || !reload.redirectTo)
            				reload.redirectTo = "/albums";
            			
            			if(!reload.timeout)
            				reload.timeout = 0;
            			
            			console.log(reload);
            			setTimeout(function(){
            				$location.path(reload.redirectTo).replace();
            				console.log($location.absUrl());
//            				if(!$scope.$$phase) $scope.$apply();
            				
            				window.location.href = $location.absUrl();
            				$scope.$apply();
            				
            				console.log($route);
            				$route.reload();
            				
        				}, reload.timeout);
            				
            		} else {
            			console.log("No redirect. Continue.");
            		}
            		
            	} else {
            		console.log("***** Something tragically wrong");
            	}
            }
            
            //Call callback
            if(!!data && !!data.cb && typeof data.cb == "function"){
            	data.cb(data.sr);
            }
            
            //Check for redirect
            
            
            return;
        };

//        $scope.login = function() {
//            $scope.$emit('event:loginRequest', $scope.username, $scope.password);
//            //$location.path('/login');
//        };

//        $scope.logout = function() {
//            $rootScope.user = null;
//            $scope.username = $scope.password = null;
//            $scope.$emit('event:logoutRequest');
//            $location.url('/');
//        };

        $rootScope.appUrl = "http://localhost/angularjs-zf2/public";
        console.log($scope);
    });


 * 
 * 
 */