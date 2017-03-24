angular.module('Click-counts-app')
  
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
