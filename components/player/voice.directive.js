angular.module('waApp')
    .directive("voice", [function () {
	    return { 
	        restrict: 'E',
	        scope:{
	        	 callback:'='
	        },
	        template:'<audio ng-ended="next(callback)"></audio>',
	        replace:true,
	         link: function (scope, element, attributes) {
	         	scope.next=function(callback){
	         		angular.element(element[0]).remove();
	         		(callback || angular.noop)();
	         	}
	        }

        }
   }])