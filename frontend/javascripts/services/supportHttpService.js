(function() {
  'use strict';

  var module = angular.module('denteez-app');

  module.factory('SupportHttpService', SupportHttpService);

  SupportHttpService.$inject = [
    'config',
    '$http'
  ];

  function SupportHttpService(config, http) {
    var service = {
      getEnquiryType: getEnquiryType,
      sendEnquiry: sendEnquiry
    };

    return service;

    function getEnquiryType(successCallback, errorCallback) {
      http.get(config.getEnquiryTypeUrl)
        .then(successCallback, errorCallback);
    }

    function sendEnquiry(data, successCallback, errorCallback) {
      var fd = new FormData();

      fd.append('description', data.description);
      fd.append('email', data.email);
      fd.append('enquiry_type', data.enquiryType);
      fd.append('subject', data.subject);
      fd.append('user_name', data.name);

      angular.forEach(data.files, function(value, key) {
        fd.append('file[' + key +']', value);
      });


      http.post(
        config.sendEnquiryUrl,
        fd,
        {
          transformRequest: angular.indentity, 
          headers: { 'Content-Type': undefined }
        }).then(successCallback, errorCallback);
    }

  }

})();