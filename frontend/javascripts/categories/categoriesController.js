(function() {
  'use strict';

  angular.module('denteez-app')
    .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = [
    'CategoriesHttpService',
    'ModalService'
  ];

  function CategoriesController(categoriesHttpService, modalService) {
    var vm = this;

    vm.header = 'Service Directory'
    vm.categories = [];
    vm.categoriesIsLoaded = false
    vm.isloading = true;

    var title, errDescription;
    
    (function(){
      return categoriesHttpService.getAllCategories(
        function(response) {          
          vm.categories = response.data.data;
          vm.isloading = false;
          vm.categoriesIsLoaded = true
        }, 
        function(response) {
          title = response.status + ': ' + response.statusText;
          errDescription = response.data.error.description;
          vm.isloading = false;
          modalService.showAlert(title, errDescription);

        });
    })();

  }
})();