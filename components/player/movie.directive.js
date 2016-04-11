angular.module('waApp')
    .directive("movie", [function () {
	    return { 
	        restrict: 'E',
	        template:'<video type="video/ogg" autoplay></video>',
	        replace:true,
	        link: function (scope, element, attributes) {
	        }
        }
   }])