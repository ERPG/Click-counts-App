angular.module('Click-counts-app')

	.controller('editController', function($scope, $rootScope, DataFactory, $location) {


	    let id;

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

	    $scope.editUser = function(e) {
	        e.preventDefault()
	        const { name, email, image } = $scope
	        DataFactory.editUser(id, email, name, image)
	            .then(user => {
	                $location.path('/private')
	            })
	    }
	})