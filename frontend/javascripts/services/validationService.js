// (function() {
//   'use strict';

//   angular
//     .module('denteez-app')
//     .factory('ValidationService', ValidationService);

//   CategoriesHttpService.$inject = [

//   ];

//   function ValidationService(file) {
//     var service = {
//       validateImg: validateImg,
//     };

//     return service;

//     function validateImg(successCallback, errorCallback) {
//       var _URL = window.URL || window.webkitURL;
//       var imgW, imgH
//       var resolutionIsValid = false;
//       var sizeIsValid = file.size <= 5000000;

//       var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
//       var typeIsValid = '|jpg|jpeg|png|ipg|'.indexOf(type) !== -1;

//       // var img = new Image();
//       // img.src = _URL.createObjectURL(file); 

//       // img.onload = function() {
//       //   imgW = this.width;
//       //   imgH = this.height;
//       //   console.log(imgW + ' ' + imgH);
//       //   resolutionIsValid = (imgW >= 300) && (imgH >= 300);
        
//       // };           

//       console.log(sizeIsValid);
//       console.log(typeIsValid);   
//       return sizeIsValid && typeIsValid;   

//     }
        
//   }

// })();