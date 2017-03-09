angular.module('Click-counts-app', ['ngRoute'])
	.config( function ($routeProvider){

		$routeProvider
			.when('/home', {
				templateUrl: '/public/home.html',
				controller: 'homeController'
			})
			.when('/login', {
				templateUrl: '/public/login.html',
				controller: 'loginController'
			})
			otherwise('/home')
	})

.controller('homeController', function($scope){})




.factory('DataFactory', function($http){
	
})