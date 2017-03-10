angular.module('Click-counts-app', ['ngRoute'])
	.config( function ($routeProvider){

		$routeProvider
			.when('/', {
				templateUrl: '/login.html',
				controller: 'loginController'
			})
			.when('/home', {
				templateUrl: '/home.html',
				controller: 'homeController'
			})
			.otherwise('/')
	})

.controller('homeController', function($scope, $rootScope) {

	$rootScope.SectionHome = true
})



.controller('loginController', function($scope, $rootScope) {

	$scope.SectionLogin = true

})


.factory('DataFactory', function($http) {})

function getSearch() {
    return $http.get('/api/search')
        .then(({ data }) => data)
        .then(console.log())
}

