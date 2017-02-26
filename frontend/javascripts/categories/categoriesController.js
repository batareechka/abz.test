(function() {
  'use strict';

  angular.module('denteez-app')
    .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = [
    'CategoriesHttpService'
  ];

  function CategoriesController(categoriesHttpService) {
    var vm = this;

    vm.header = 'Service Directory'
    vm.categories = [];
    vm.error = {};
    vm.isloaded = false;


    (function(){
      return categoriesHttpService.getAllCategories().then(
        function successCallback(response) {          
          vm.categories = response.data.data;
          vm.isloaded = true;
        },
      function errorCallback(response) {
        console.log(response.data);
        console.log(response.status);
      });
    })();

  }
})();