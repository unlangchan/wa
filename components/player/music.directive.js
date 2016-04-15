angular.module('waApp')
    .directive("bgm", [function () {
	    return { 
	        restrict: 'E', 
	        template:'<audio></audio>',
	        replace:true,
	        link: function (scope, element, attributes) {

	        }

        }
   }])