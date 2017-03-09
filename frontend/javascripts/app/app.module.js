(function() {
  'use strict';

  angular.module('denteez-app', [
    'ui.router',
    'ngMaterial',
    'ngDropdowns'
    ])
  .constant('config', {  
    baseUrl: '/',

    getCategoriesUrl: 'http://504080.com/api/v1/services/categories',
    getEnquiryTypeUrl: 'http://504080.com/api/v1/directories/enquiry-types',
    sendEnquiryUrl: 'http://504080.com/api/v1/support'

  });

})();