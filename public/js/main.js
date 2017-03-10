angular.module('Click-counts-app', ['ngRoute'])
	.config( function ($routeProvider){

		$routeProvider
			.when('/', {
				templateUrl: '/home.html',
				controller: 'homeController'
			})
			.when('/login', {
				templateUrl: '/login.html',
				controller: 'loginController'
			})
			.otherwise('/login')
	})

.controller('homeController', function($scope){})




.factory('DataFactory', function($http){})