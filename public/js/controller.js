angular.module('Click-counts-app')

.controller('homeController', function($scope, SearchFactory, $location, $rootScope, DataFactory) {


    let id ;

    $rootScope.cleanView = false
    $scope.searchBar = true

    $scope.getSearch = (e) => {
        e.preventDefault()
        $location.path('/search/' + $scope.SearchProduct)
    }

     if ($scope.loggedUser) {
        id = $scope.loggedUser.id

        DataFactory.getQueries(id)
            .then( function (response){
                $scope.latestSearch = true
                $scope.queries = response.data.querySearch
            })
     }


})

.controller('editController', function($scope, $rootScope, DataFactory, $location) {


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
            const name = $scope.name
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
            .then( function(response){
                console.log(response)
            })

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


.controller('graphicsController', function($scope, $rootScope, SearchFactory) {

    $scope.searchBar = true

    function filterPriceAverage(elem) {
        return parseInt(elem.price.replace(/€[\s\S]*$/g, ''))
    }

    function filterFirstTree(elem, index) {
        return index <= 3
    }

    function ebayFilter(elem) {
        return parseInt(elem.sellingStatus[0].currentPrice[0].__value__)
    }

    const corteIPrices = $rootScope.corteIProducts.splice(0, 1)
        .map(filterPriceAverage)
        .filter(filterFirstTree)
    console.log(corteIPrices)
    const carrefPrices = $rootScope.carrefProducts
        .map(filterPriceAverage)
        .filter(filterFirstTree)
    console.log(carrefPrices)
    const fnacPrices = $rootScope.fnacProducts
        .map(filterPriceAverage)
        .filter(filterFirstTree)
    console.log(fnacPrices)
    const ebayPrices = $rootScope.ebayProducts.map(ebayFilter)
        .filter(filterFirstTree)
    console.log(ebayPrices)

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

})
