angular.module('waApp')
    .directive("music", [function () {
	    return { 
	        restrict: 'E', 
	        template:'<audio></audio>',
	        replace:true,
	        link: function (scope, element, attributes) {

	        }

        }
   }])