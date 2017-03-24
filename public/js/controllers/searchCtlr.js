angular.module('Click-counts-app')
	
	.controller('searchController', function($scope, $rootScope, $routeParams, SearchFactory, $location) {
    
    $scope.searchBar = true

    let {query} = $routeParams
    let id;

    $scope.getSearch = (e) => {
        e.preventDefault()
        $location.path('/search/' + $scope.SearchProduct)
    }

    if ($scope.loggedUser) {
        id = $scope.loggedUser.id

        SearchFactory.addQueryToUserData(id, query)
    }


    SearchFactory.getSearch(query)
        .then(function(response) {
                console.log(response)
                $rootScope.SectionSearch = true
                $rootScope.corteIProducts = response.data[0]
                $rootScope.fnacProducts = response.data[1]
                $rootScope.carrefProducts = response.data[2]
                $rootScope.ebayProducts = response.data[3]
                $rootScope.soloProducts = response.data[4]      
                    
            })

    })
