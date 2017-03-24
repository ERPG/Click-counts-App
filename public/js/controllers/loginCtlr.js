angular.module('Click-counts-app')

	.controller('loginController', function($scope, $location, AuthFactory, $rootScope) {
	        $rootScope.cleanView = true
	        $scope.login = function() {
	            const username = $scope.username
	            const password = $scope.password
	            AuthFactory.login({ username, password })
	                .then(AuthFactory.setCredentials)
	                .then(() => $location.path('/private'))
	        }

	    })