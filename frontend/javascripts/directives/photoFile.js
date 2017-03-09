(function() {
  'use strict';

angular.module('denteez-app')
  .directive('photoFile', ['$parse', function($parse){
    return {
      restrict: 'A',
      link: function(scope, element, attrs){
        var model = $parse(attrs.photoFile);
        var modelSetter = model.assign;       


        element.bind('change', function(){
          if(element[0].files[0].size <= 5000000) {
            console.log('menshe');
            scope.files.push(element[0].files[0]);
            modelSetter(scope, element[0].files[0]);
            scope.$apply;
          }        
          else {
            console.log('bolshe');
            modelSetter(scope, '');
          }  
          console.log(scope.files);
        });
      }
    }
  }])

})();
