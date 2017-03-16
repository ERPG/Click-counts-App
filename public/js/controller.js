angular.module('Click-counts-app')
  .controller('loginController', function($scope, $location, AuthFactory) {
    // $scope.SectionLogin = true
    $scope.login = function() {
      const username = $scope.username
      const password = $scope.password
      AuthFactory.login({ username, password })
        .then( AuthFactory.setCredentials )
        .then( () => $location.path('/private') )
    }

  })
  .controller('registerController', function($scope, AuthFactory) {
    // $scope.SectionRegister = true
    console.log('step222');
    $scope.register = function() {
      const username = $scope.username
      const password = $scope.password
      AuthFactory.register({ username, password })
    }
  })
  .controller('NavbarCtrl', function($scope, $location, AuthFactory) {

    $scope.logout = function() {
      AuthFactory.logout()
      $location.path('/private');
    }
  })
  .controller('privateController', function($scope, auth, DataFactory) {
    console.log(auth)
    DataFactory.getPrivateData()
      .then( ({ message }) => $scope.message = message )
  })
  .controller('homeController', function($scope, $rootScope, SearchFactory) {

    $rootScope.SectionHome = true

    $scope.getSearch = function(e) {
        e.preventDefault()
        SearchFactory.getSearch($scope.SearchProduct)
            .then(function(response) {
                console.log(response)
                $rootScope.SectionSearch = true
                $scope.corteIProducts = response.data.results[0]
                $scope.fnacProducts = response.data.results[1]
                $scope.carrefProducts = response.data.results[2]
                $scope.ebayProducts = response.data.results[3].findItemsByKeywordsResponse[0].searchResult[0].item
            })

        $scope.quantity = () => {
            $scope.changeQuantity = 3
        }
    }
})