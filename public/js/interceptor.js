angular.module('Click-counts-app')
  .factory('AuthInterceptor', function ( StorageFactory ) {

    function request(config) {

      const token = StorageFactory.readToken()
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = token
      }
      return config;
    }

    return { request };


  })