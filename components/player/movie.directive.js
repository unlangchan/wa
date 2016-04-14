angular.module('waApp')
    .directive("movie", [function () {
	    return { 
	        restrict: 'E',
	        scope:{},
	        template:'<video type="video/ogg" autoplay contenteditable=true></video>',
	        replace:true,
	        link: function (scope, element, attributes) {
	        }
        }
   }])