(function() {
  'use strict';

angular.module('denteez-app')
  .directive('photoFile', ['$parse', 'ValidationService', function($parse, validationService){
    return {
      restrict: 'A',
      link: function(scope, element, attrs){
        var model = $parse(attrs.photoFile);
        var modelSetter = model.assign;       


        element.bind('change', function(){
          var file = element[0].files[0];
          validationService.validateImg(file, function(isValid) {

            if(isValid) {

              var reader = new FileReader();
              reader.onload = function(e) {
                scope.$apply(function(){
                  scope.attachments.push(
                    {
                      file: file,
                      preview: e.target.result
                    });
                  scope.photo = e.target.result;
                })
              }

              reader.readAsDataURL(file);

              modelSetter(scope, file);            
            }       
            else {
              modelSetter(scope, '');
            } 
            scope.photoIsValid = isValid;
            scope.$apply();
          });

        });
      }
    }
  }])

})();
