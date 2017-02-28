(function() {
  'use strict';

  angular
    .module('denteez-app')
    .factory('CategoriesHttpService', CategoriesHttpService);

  CategoriesHttpService.$inject = [
    '$http'
  ];

  function CategoriesHttpService(http) {
    var service = {
      getAllCategories: getAllCategories,
    };

    var authToken = "79beb639c38c9d9b77e17200e1a74ab5df7885b3"

    return service;

    function getAllCategories(successCallback, errorCallback) {
      http.get('http://504080.com/api/v1/services/categories', {
        headers: {
          'Authorization': authToken
        }
      }).then(successCallback, errorCallback);
    }
        
  }

})();