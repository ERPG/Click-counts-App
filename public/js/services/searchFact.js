angular.module('Click-counts-app')

  .factory('SearchFactory', function($http, $rootScope) {

    function getSearch(searchQuery) {
        return $http.post('/api/search', { searchQuery } )

    }

    function addQueryToUserData(id, query) {
      const urlQ = `/api/users/${id}`
      return $http.put(urlQ, { query } )
          .then( response => response.data )
    }

    return {
        getSearch,
        addQueryToUserData
    }

})
