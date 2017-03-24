angular.module('Click-counts-app')

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