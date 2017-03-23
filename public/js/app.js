angular.module('Click-counts-app', ['ngRoute','myDirectives', 'angular-jwt'])
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor')
    })
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/partials/home.html',
                controller: 'homeController'
            })
            .when('/login', {
                templateUrl: '/partials/login.html',
                controller: 'loginController'
            })
            .when('/register', {
                templateUrl: '/partials/register.html',
                controller: 'registerController'
            })
            .when('/search/:query', {
                templateUrl: '/partials/search.html',
                controller: 'searchController'
            })
            .when('/charts', {
                templateUrl: '/partials/graphics.html',
                controller: 'graphicsController'
            })
            .when('/private', {
                templateUrl: '/partials/private.html',
                controller: 'privateController',
            })
            .when('/editProfile', {
                templateUrl: '/partials/editUser.html',
                controller: 'editController',
            })

            .otherwise('/')
    })


.run(function($rootScope, $location, DataFactory, StorageFactory, AuthFactory) {

    if (AuthFactory.isLoggedIn()) {
        const token = StorageFactory.readToken()
        AuthFactory.setCredentials(token)
    }

    $rootScope.$on('$routeChangeError', function(next, current, previous, rejection) {
        if (rejection === 'Not Authenticated') {
            $location.path('/login');
        }
    })

    $rootScope.$on("userLogged", function (event, id){
        DataFactory.getUser(id)
            .then(response => {
                response.data
            })
    })
})
