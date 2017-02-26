(function() {
  'use strict';

  var module = angular.module('denteez-app');

  module.factory('MyService', MyService);

  MyService.$inject = [

  ];

  function MyService() {
    var service = {
      serviceVar: 'SERVICE VAR'
    };

    return service;
  }

})();