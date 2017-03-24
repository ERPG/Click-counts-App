angular.module('Click-counts-app')

	    .controller('registerController', function($scope, AuthFactory, $rootScope) {
        $rootScope.cleanView = false
        $scope.register = function() {
            const username = $scope.username
            const password = $scope.password
            const email = $scope.email
            const name = $scope.name
            AuthFactory.register({ username, password, name, email })

        }
    })