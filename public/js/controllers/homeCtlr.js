angular.module('Click-counts-app')

.controller('homeController', function($scope, SearchFactory, $location, $rootScope, DataFactory) {


    let id;

    $rootScope.cleanView = false
    $scope.searchBar = true

    $scope.getSearch = (e) => {
        e.preventDefault()
        $location.path('/search/' + $scope.SearchProduct)
    }

    if ($scope.loggedUser) {
        id = $scope.loggedUser.id

        DataFactory.getQueries(id)
            .then(function(response) {
                $scope.latestSearch = true
                $scope.queries = response.data.querySearch
            })
    }


})
