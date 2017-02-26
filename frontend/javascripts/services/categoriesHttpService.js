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
      getAllCategories: getAllCategories
    };    

    return service;

    function getAllCategories() {
      return http.get('http://504080.com/api/v1/services/categories', {
              headers: {
                'Authorization': "1a5b64272d5d6a59cc00de65377213b8b099eaf3"
              }
            });
      
      // return http.get('http://504080.com/api/v1/services/categories', {
      //         headers: {
      //           'Authorization': 'f0590a25a881dd849a48b6882c4a5af21c07f3a0'
      //         }
      //       })
      //         .then(function successCallback(response) {
      //           return response.data.data;
      //         },
      //           function errorCallback(response) {
      //             return response;
                  
      //             console.log(response.status);
      //             console.log(response.headers );
      //             console.log(response.config);
      //           });
            }    
  }

})();