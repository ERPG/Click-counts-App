angular.module('Click-counts-app')

.controller('homeController', function($scope, $rootScope, SearchFactory) {})

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
            const username = $rootScope.username
            const password = $rootScope.password
            AuthFactory.register({ username, password })


        }
    })
    .controller('NavbarCtrl', function($scope, $location, AuthFactory) {

        $scope.logout = function() {
            AuthFactory.logout()
            $location.path('/private');
        }
    })
    .controller('privateController', function($scope, auth, DataFactory, $rootScope) {

        DataFactory.getPrivateData()
            .then(({ message }) => {
                $scope.message = message
            })

    })
    .controller('searchController', function($scope, $rootScope, SearchFactory, $location) {

        $scope.searchBar = true
        $scope.getSearch = (e) => {
            e.preventDefault()
            const SearchProduct = $scope.SearchProduct
            SearchFactory.getSearch($scope.SearchProduct)
                .then(function(response) {
                    // console.log(response)
                    $location.path('/search/' + SearchProduct)
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

    $scope.searchBar = true

    const corteIPrices = $rootScope.corteIProducts.map((elem) => {
        return parseInt(elem.price.replace(/[^0-9-,]|€|-/g, '')) || 0
    })
    const carrefPrices = $rootScope.carrefProducts.map((elem) => {
        return parseInt(elem.price.replace(/[^0-9-,]|€|-/g, '')) || 0
    })
    const fnacPrices = $rootScope.fnacProducts.map((elem) => {
        return parseInt(elem.price.replace(/[^0-9-,]|€|-/g, '')) || 0
    })
    const ebayPrices = $rootScope.ebayProducts.map( (elem)=> {
        return parseInt(elem.sellingStatus[0].currentPrice[0].__value__)
    })
    console.log();
    console.log(ebayPrices)

    $scope.averages = () => {

        $scope.chart = c3.generate({
            bindto: '#main-chart',
            data: {
                columns: [
                    ['Corte Ingles'],
                    ['Carrefour'],
                    ['Fnac'],
                    ['Ebay']
                ]
            },
        });

        $scope.chart.load({
            columns: [
                ['Corte Ingles'].concat(corteIPrices), 
                ['Carrefour'].concat(carrefPrices),
                ['Fnac'].concat(fnacPrices),
                ['Ebay'].concat(ebayPrices)
            ]
        });

    }


})
