(function() {
  'use strict';

  angular
    .module('denteez-app')
    .factory('CategoriesHttpService', CategoriesHttpService);

  CategoriesHttpService.$inject = [
    'config',
    '$http'
  ];

  function CategoriesHttpService(config, http) {
    var service = {
      getAllCategories: getAllCategories,
    };

    var authToken = "79beb639c38c9d9b77e17200e1a74ab5df7885b3"

    return service;

    function getAllCategories(successCallback, errorCallback) {
      // http.get('http://504080.com/api/v1/services/categories', {
      http.get(config.getCategoriesUrl, {
        headers: {
          'Authorization': authToken
        }
      }).then(successCallback, errorCallback);
    }
        
  }

})();