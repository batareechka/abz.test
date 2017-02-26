(function() {
  'use strict';

  angular.module('denteez-app', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
      
      function(stateProvider, urlRouterProvider, locationProvider) {
        
        urlRouterProvider.otherwise("login");

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
          .state('login', {
            url: 'login',
            templateUrl: '/login/login.html'
          });
      
        // locationProvider.html5Mode(true);
    }]);

})();