(function() {
  'use strict';

  angular.module('denteez-app')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
      
      function(stateProvider, urlRouterProvider, locationProvider) {
        
        // urlRouterProvider.otherwise("login");

        stateProvider
          .state('main', {
            url: '/',
            templateUrl: 'index.html'
          })
          .state('main.categories', {
            url: 'categories',
            templateUrl: '/categories/categories.html',
            controller: 'CategoriesController',
            controllerAs: 'categories'
          })
          .state('support', {
            url: 'support',
            templateUrl: '/support/support.html'
          })
          .state('uploader', {
            url: 'uploader',
            templateUrl: '/uploader/uploader.html'
          });
      
        // locationProvider.html5Mode(true);
    }]);

})();