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
    .controller('registerController', function($scope, AuthFactory, $rootScope) {
        $rootScope.cleanView = true
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
        
      $rootScope.SectionPrivate = true

        DataFactory.getPrivateData()
            .then(({ message }) => $scope.message = message )
    })
    .controller('homeController', function($scope, $rootScope, SearchFactory) {


        $scope.getSearch = (e) => {
            e.preventDefault()
            const SearchProduct = $scope.SearchProduct
            SearchFactory.getSearch($scope.SearchProduct)
                .then(function(response) {
                    // console.log(response)
                    $rootScope.SectionSearch = true
                    $rootScope.corteIProducts = response.data.results[0]
                    $rootScope.fnacProducts = response.data.results[1]
                    $rootScope.carrefProducts = response.data.results[2]
                    $rootScope.ebayProducts = response.data.results[3].findItemsByKeywordsResponse[0].searchResult[0].item
                })
        }

                    $scope.quantity = () => {
                $scope.changeQuantity = 3
            }
    })

    .controller('graphicsController', function($scope, $rootScope, SearchFactory) {

      $rootScope.SectionGraphics = true

                  $scope.averages = () => {

                    const CIPrice = $rootScope.corteIProducts 
                    
                    console.log(CIPrice)

                    
                      

                            // var mainChart = c3.generate({
                            //     bindto: '#main-chart',
                            //     data: {
                            //         columns: [
                            //             ['Data Set 1'].concat(CIPrice)
                            //             ['Data Set 2'].concat(carrefPrice)
                            //         ]
                            //     }
                            // });

                        }

    })
