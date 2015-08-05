(function() {
	var as = angular.module('myApp', ['myApp.controllers', 'ngRoute']);

	as.value('version', '1.3.9');
	console.log("as:");
	console.log(as);
	
	var constants = {
		"serverRootUrl" : "rest/", // window.location.pathname;
		"clientRootUrl" : "resource/partials/"
	};
	
	
	as.controller('AppCtrl', function($scope, $http, $rootScope, cache) {
        $scope.header = 'POC';
        $scope.notifications;
        
        $scope.controllerRoot = "resource/js/controllers";
        
        console.log("$rootScope:");
        console.log($rootScope);
        
        console.log("cache:");
        console.log(cache);
        
        
        
        $(".nav-usage").off("click");
        $(".nav-usage").on("click", function(){
        	$scope.animateMenu();
        });
        
        $scope.animateMenu = function(){
            $("body").toggleClass("nav-menu-open");
            $(".header-menu").toggle();
            $(".header-return").toggle();
        }
        
        function loadNotification() {
            console.log('call AppCtrl loadNotification()...');
            $http.get(constants.serverRootUrl + 'customers/')
                .success(function(data, status, headers, config) {
                	$scope.notifications = data;
                });
        }
        
        
    });
	
	as.factory('cache', function($cacheFactory) {
		return $cacheFactory('cache');
	});
	
    as.config(function($routeProvider, $locationProvider) {
    	console.log("$routeProvider");
    	console.log($routeProvider);
        $routeProvider
			.when('/', {templateUrl: constants.clientRootUrl+'home.html', controller: 'HomeCtrl'})
	        .when('/usage', {templateUrl: constants.clientRootUrl+'usage.html', controller: 'UsageCtrl'})
	        //.when('/notification', {templateUrl: constants.clientRootUrl+'notification.html', controller: 'NotiCtrl'})
	        
	        .when('/albums', {templateUrl: constants.clientRootUrl+'albums.html', controller: 'AlbumListCtrl'})
            .when('/new', {templateUrl: constants.clientRootUrl+'new.html', controller: 'NewAlbumCtrl'})
            .when('/edit/:id', {templateUrl: constants.clientRootUrl+'edit.html', controller: 'EditAlbumCtrl'})
            .when('/album/:id', {templateUrl: constants.clientRootUrl+'album.html', controller: 'AlbumCtrl'})
            .when('/login', {templateUrl: constants.clientRootUrl+'login.html', controller: 'LoginCtrl'})
            .when('/profile', {templateUrl: constants.clientRootUrl+'profile.html', controller: 'ProfileCtrl'})
            .when('/register', {templateUrl: constants.clientRootUrl+'register.html', controller: 'RegisterCtrl'})
            
	        .otherwise({redirectTo: '/'});
        
        $locationProvider.html5Mode({
        	  enabled: true,
        	  requireBase: false
        });
    });

    as.config(['$logProvider', function($logProvider){
        //$logProvider.debugEnabled(false); //Known issue
    	console.log("$logProvider");
    	console.log($logProvider);
    }]);
    
    
    as.config(function($httpProvider) {
    	

//		  configure $http to catch message responses and show them
//        $httpProvider.responseInterceptors.push(
//                function($q) {
//                    console.log('call response interceptor and set message...');
//                    var setMessage = function(response) {
//                        //if the response has a text and a type property, it is a message to be shown
//                        //console.log('@data'+response.data);
//                        if (response.data.message) {
//                            message = {
//                                text: response.data.message.text,
//                                type: response.data.message.type,
//                                show: true
//                            };
//                        }
//                    };
//                    return function(promise) {
//                        return promise.then(
//                                //this is called after each successful server request
//                                        function(response) {
//                                            setMessage(response);
//                                            return response;
//                                        },
//                                        //this is called after each unsuccessful server request
//                                                function(response) {
//                                                    setMessage(response);
//                                                    return $q.reject(response);
//                                                }
//                                        );
//                                    };
//                        });

                //configure $http to show a login dialog whenever a 401 unauthorized response arrives
//                $httpProvider.responseInterceptors.push(
//                        function($rootScope, $q) {
//                            console.log('call response interceptor...');
//                            return function(promise) {
//                                return promise.then(
//                                        //success -> don't intercept			
//                                                function(response) {
//                                                    console.log('dont intercept...');
//                                                    return response;
//                                                },
//                                                //error -> if 401 save the request and broadcast an event
//                                                        function(response) {
//                                                            console.log('execute interceptor, response@' + response.status);
//                                                            if (response.status === 401) {
//                                                                console.log('catching http status:401');
//                                                                var deferred = $q.defer(),
//                                                                        req = {
//                                                                            config: response.config,
//                                                                            deferred: deferred
//                                                                        };
//                                                                $rootScope.requests401.push(req);
//                                                                $rootScope.$broadcast('event:loginRequired');
//                                                                return deferred.promise;
//                                                            }
//                                                            return $q.reject(response);
//                                                        }
//                                                );
//                                            };
//                                });
//                        httpHeaders = $httpProvider.defaults.headers;
//                        //console.log('http headers:'+ httpHeaders);
//                    });
//
//                    as.run(function($rootScope, $http, $location, base64) {
//                        //make current message accessible to root scope and therefore all scopes
//                        $rootScope.message = function() {
//                            return message;
//                        };
//
//                        /**
//                         * Holds all the requests which failed due to 401 response.
//                         */
//                        $rootScope.requests401 = [];
//
//                        $rootScope.$on('event:loginRequired', function() {
//                            console.log('fire event:loginRequired');
//                            //  $('#login').modal('show');
//                            $location.path('/login');
//                        });
//
//                        /**
//                         * On 'event:loginConfirmed', resend all the 401 requests.
//                         */
//                        $rootScope.$on('event:loginConfirmed', function() {
//                            var i,
//                                    requests = $rootScope.requests401,
//                                    retry = function(req) {
//                                        $http(req.config).then(function(response) {
//                                            req.deferred.resolve(response);
//                                        });
//                                    };
//
//                            for (i = 0; i < requests.length; i += 1) {
//                                retry(requests[i]);
//                            }
//                            $rootScope.requests401 = [];
//
//                            $location.path('/');
//                        });
//
//                        /**
//                         * On 'event:loginRequest' send credentials to the server.
//                         */
//                        $rootScope.$on('event:loginRequest', function(event, username, password) {
//                            //            httpHeaders.common['Authorization'] = 'Basic ' + base64.encode(username + ':' + password);
//                            //            $http.get('action/user').success(function (data) {
//                            //                $rootScope.user = data;
//                            //                $rootScope.$broadcast('event:loginConfirmed');
//                            //            });
//                            console.log('fire event: loginRequest. @event,' + event + ', username @' + username + ', password@' + password);
//                            httpHeaders.common['Authorization'] = 'Basic ' + base64.encode(username + ':' + password);
//                            $http.get($rootScope.appUrl + '/users/login.json')
//                                    .success(function(data) {
//                                        console.log('login data @' + data);
//                                        $rootScope.user = data.user;
//                                        $rootScope.$broadcast('event:loginConfirmed');
//                                    });
//
//                        });
//
//                        /**
//                         * On 'logoutRequest' invoke logout on the server and broadcast 'event:loginRequired'.
//                         */
//                        $rootScope.$on('event:logoutRequest', function() {
//                            $http.get($rootScope.appUrl + '/users/logout.json')
//                                    .success(function(data) {
//                                        httpHeaders.common['Authorization'] = null;
//                                    });
//
//                        });
//                        
            });

}());
