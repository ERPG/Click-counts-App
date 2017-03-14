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
        DataFactory.getSearch($scope.SearchProduct)
            .then(function(response){
                console.log(response)
                $scope.SectionSearch = true
                $scope.corteIProducts = response.data.results[0]
                $scope.fnacProducts = response.data.results[1]
                $scope.carrefProducts = response.data.results[2]
                $scope.ebayProducts = response.data.results[3][0].findItemsByKeywordsResponse[0].searchResult[0].item
            })
    }
})

.controller('loginController', function($scope, $rootScope) {

    $scope.SectionLogin = true

})

.factory('DataFactory', function($http, $rootScope) {

    function getSearch(searchQuery) {
        console.log(searchQuery)
        return $http.post('/api/search', { searchQuery })

    }

    return {
        getSearch: getSearch
    }

})
