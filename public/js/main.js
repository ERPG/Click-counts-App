angular.module('Click-counts-app', ['ngRoute'])
    .config(function($routeProvider) {

        $routeProvider
            .when('/login', {
                templateUrl: '/login.html',
                controller: 'loginController'
            })
            .when('/', {
                templateUrl: '/home.html',
                controller: 'homeController'
            })
            .otherwise('/')
    })

.controller('homeController', function($scope, $rootScope, DataFactory) {

    $rootScope.SectionHome = true

    $scope.getSearch = function(e) {
        e.preventDefault()
        $scope.SectionSearch = true
        DataFactory.getSearch($scope.SearchProduct)
    }
})

.controller('loginController', function($scope, $rootScope) {

    $scope.SectionLogin = true

})


.factory('DataFactory', function($http, $rootScope) {

    function getSearch() {
        return $http.post('/api/search')
            .then((  { data } ) => data )
            .then( products => $rootScope.products = products)
    }
    return {
    getSearch: getSearch

    } 

})
