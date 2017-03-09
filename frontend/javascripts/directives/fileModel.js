(function() {
  'use strict';

angular.module('denteez-app')
	.directive('fileModel', ['$parse', function($parse){
		return {
			restrict: 'A',
			link: function(scope, element, attrs){
				console.log(scope);
				console.log(element);
				console.log(attrs.fileModel);
				var model = $parse(attrs.fileModel);				
				var modelSetter = model.assign;

				element.bind('change', function(){
					scope.$apply(function(){
						console.log(element[0].files);
						modelSetter(scope, element[0].files[0]);
					})
				})
			}
		}
	}])

})();

