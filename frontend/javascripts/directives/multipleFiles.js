(function() {
  'use strict';

angular.module('denteez-app')
	.directive('multipleFiles', ['$parse', function($parse){
		return {
			restrict: 'A',
			link: function(scope, element, attrs){
				var model = $parse(attrs.multipleFiles);				
				var modelSetter = model.assign;

				element.bind('change', function(){				
					var files = [];
					angular.forEach(element[0].files, function(file) {
						files.push(file)
					});
					scope.$apply(function() {
						modelSetter(scope, files);						
					});					
				});				
			}
		}
	}])

})();