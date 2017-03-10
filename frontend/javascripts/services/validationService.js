(function() {
  'use strict';

  angular
    .module('denteez-app')
    .factory('ValidationService', ValidationService);

  ValidationService.$inject = [

  ];

  function ValidationService(file) {
    var service = {
      validateImg: validateImg,
    };

    return service;

    function validateImg(file, callback) {
      var _URL = window.URL || window.webkitURL;
      var imgW, imgH
      var resolutionIsValid = false;
      
      var sizeIsValid = file.size <= 5000000;

      var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
      var typeIsValid = '|jpg|jpeg|png|ipg|'.indexOf(type) !== -1;

      var img = new Image();
      img.src = _URL.createObjectURL(file); 

      img.onload = function() {
        imgW = this.width;
        imgH = this.height;
        resolutionIsValid = (imgW >= 300) && (imgH >= 300);

        var isValid = sizeIsValid && typeIsValid && resolutionIsValid;

        callback(isValid);
      };

    }
        
  }

})();