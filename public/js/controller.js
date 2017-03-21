angular.module('Click-counts-app')

.controller('homeController', function($scope, $rootScope, DataFactory) {

})

.controller('editController', function($scope, $rootScope, DataFactory, $location) {
    // $rootScope.EditSection = true
    // $rootScope.UserSection = true

    const id = $scope.loggedUser.id

    DataFactory.getUser(id)
        .then(function(user) {
            $scope.name = user.name
            $scope.email = user.email
            $scope.username = user.username
            $scope.image = user.image
        })

    $scope.editUser = function(e) {
        e.preventDefault()
        const { name, email, image } = $scope
        DataFactory.editUser(id, email, name, image)
            .then(user => {
                $location.path('/private')
            })


    }
})

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
            const email = $scope.email
            console.log(email)
            const name = $scope.name
            console.log(name)
            AuthFactory.register({ username, password, name, email })

        }
    })
    .controller('NavbarCtrl', function($scope, $location, AuthFactory) {

        $scope.logout = function() {
            AuthFactory.logout()
            $location.path('/private');
        }
    })
    .controller('privateController', function($scope, DataFactory, $rootScope) {

        const id = $rootScope.loggedUser.id


        DataFactory.getPrivateData()
            .then(({ message }) => {
                $scope.message = message
            })

        DataFactory.getUser(id)
            .then(function(user) {
                $scope.name = user.name
                $scope.email = user.email
                $scope.username = user.username
                $scope.image = user.image
            })

    })
    .controller('searchController', function($scope, $rootScope, SearchFactory, $location) {

        console.log($rootScope)
        const id = $rootScope.loggedUser.id

        $scope.searchBar = true
        $scope.getSearch = (e) => {
            e.preventDefault()
            const SearchProduct = $scope.SearchProduct
            SearchFactory.getSearch($scope.SearchProduct)
                .then(function(response) {
                    SearchFactory.showQuery(id, SearchProduct)
                        .then(function(response) {
                            console.log(response)
                        })
                    console.log(response + ' From SearchController')
                    $location.path('/search/' + SearchProduct)
                    $rootScope.SectionSearch = true
                    $rootScope.corteIProducts = response.data[0]
                    $rootScope.fnacProducts = response.data[1]
                    $rootScope.carrefProducts = response.data[2]
                    $rootScope.ebayProducts = response.data[3]
                    $rootScope.soloProducts = response.data[4]
                })
        }

        $scope.quantity = () => {
            $scope.changeQuantity = 3
        }
    })

.controller('graphicsController', function($scope, $rootScope, SearchFactory) {

    $scope.searchBar = true

    const corteIPrices = $rootScope.corteIProducts.splice(0, 1).map((elem) => {
        return parseInt(elem.price.replace(/€[\s\S]*$/g, '')) || 0
    })
    const carrefPrices = $rootScope.carrefProducts.map((elem) => {
        return parseInt(elem.price.replace(/[^0-9-,]|€|-/g, '')) || 0
    })
    const fnacPrices = $rootScope.fnacProducts.map((elem) => {
        return parseInt(elem.price.replace(/€[\s\S]*$/g, '')) || 0
    })
    const ebayPrices = $rootScope.ebayProducts.map((elem) => {
        return parseInt(elem.sellingStatus[0].currentPrice[0].__value__)
    })

    $scope.averages = () => {

        $scope.chart = c3.generate({
            bindto: '#main-chart',
            data: {
                columns: [
                    ['Corte Ingles'],
                    ['Carrefour'],
                    ['Fnac'],
                    ['Ebay']
                ],
                type: 'bar',
                groups: [
                    ['ebay'],
                    ['Corte Ingles'],
                    ['Carrefour'],
                    ['Fnac']
                ]
            },
        });
        $scope.chart.load({
            columns: [
                ['Corte Ingles'].concat(corteIPrices), ['Carrefour'].concat(carrefPrices), ['Fnac'].concat(fnacPrices), ['Ebay'].concat(ebayPrices)
            ]
        });

    }


})
