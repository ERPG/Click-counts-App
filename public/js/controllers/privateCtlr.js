angular.module('Click-counts-app')

	.controller('privateController', function($scope, DataFactory, $rootScope) {

        let id;


        DataFactory.getPrivateData()
            .then(({ message }) => {
                $scope.message = message
            })

        if ($scope.loggedUser) {
            id = $scope.loggedUser.id

        DataFactory.getUser(id)
            .then(function(user) {
                $scope.name = user.name
                $scope.email = user.email
                $scope.username = user.username
                $scope.image = user.image
            })
        }
    })