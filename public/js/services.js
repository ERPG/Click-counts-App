angular.module('Click-counts-app')
  .factory('SearchFactory', function($http, $rootScope) {

    function getSearch(searchQuery) {
        return $http.post('/api/search', { searchQuery } )

    }

    function showQuery(id, query) {
      const urlQ = `/api/users/${id}`
      return $http.put(urlQ, { query } ) 
          .then( response => console.log(response) )
    }

    return {
        getSearch,
        showQuery
    }

})
  .factory('DataFactory', function ($http){

    function getQueries(id) {
      const url = `/api/users/${id}`
      console.log(id + ' from services')
      return $http.get(url)
    }

    function getPrivateData() {
      const url = '/private'
      return $http.get(url)
        .then( response => response.data )
    }

    function getUser(id){
      const urlUser = `/api/users/${id}`
      return $http.get(urlUser)
              .then( response => response.data )
    }

    function editUser(id, email, name, image){
      const url= `/api/users/edit/${id}`
      const data = { id, email, name, image }
      return $http.put(url, data)
              .then( response => response.data)
    }

    return { 
      getPrivateData,
      getUser,
      editUser,
      getQueries 
    }


  })
  .factory('AuthFactory', function($http, $q, $rootScope, $location, StorageFactory, jwtHelper) {
    function login(credentials) {
      const url = '/api/login'
      return $http.post(url, credentials)
        .then( response => response.data.token )
        .then( token => {
          StorageFactory.saveToken(token)
          return token
        })
    }

    function register(credentials) {
      const url = '/api/register'
      return $http.post(url, credentials)
        .then( $location.path("/login") )
    }

    function logout() {
      delete $rootScope.loggedUser
      StorageFactory.removeToken()
    }

    function isLoggedIn() {
      try {
        const token = StorageFactory.readToken()
        if (!token) return false
        const tokenPayload = jwtHelper.decodeToken( token )
        return !( jwtHelper.isTokenExpired( token ) )
      } catch( e ) {
        return $q.reject('Not Authenticated')
      }
    }

    function setCredentials( token ) {
      var tokenPayload = jwtHelper.decodeToken( token )
      $rootScope.loggedUser = tokenPayload;
      $rootScope.$broadcast("userLogged", tokenPayload.id)
    }


    return { login, register, logout, isLoggedIn, setCredentials }

  })
  
  .factory('StorageFactory', function ($window){

    const store = $window.localStorage;
    const key = 'auth-token';

    function readToken() {
      return store.getItem(key)
    }

    function saveToken(token) {
      return !!store.setItem(key, token)
    }

    function removeToken() {
      return store.removeItem(key)
    }

    return { readToken, saveToken, removeToken }

  })