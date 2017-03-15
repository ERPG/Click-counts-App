angular.module('Click-counts-app', ['ngRoute', 'angular-jwt'])
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor')
    })
    .config(function($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: '/partials/login.html',
                controller: 'loginController'
            })
            .when('/', {
                templateUrl: '/partials/home.html',
                controller: 'homeController'
            })
            .when('/register', {
                templateUrl: '/partials/register.html',
                controller: 'registerController'
            })
            .when('/private', {
                templateUrl: '/partials/private.html',
                controller: 'privateController',
                resolve: {
                    'auth': AuthFactory => AuthFactory.isLoggedIn()
                }
            })
            .otherwise('/')
    })


.run(function($rootScope, $location, StorageFactory, AuthFactory) {

    if (AuthFactory.isLoggedIn()) {
        const token = StorageFactory.readToken()
        AuthFactory.setCredentials(token)
    }

    $rootScope.$on('$routeChangeError', function(next, current, previous, rejection) {
        if (rejection === 'Not Authenticated') {
            $location.path('/login');
        }
    })
})
