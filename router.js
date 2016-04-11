app.config(['$routeProvider',function ($routeProvider) {
      $routeProvider
      .when('/', {
        templateUrl: 'view/index.html',
        controller: 'IndexController'
      })
       .when('/snow', {
        templateUrl: 'view/snow.html',
        controller: 'snowController'
      });
}]);