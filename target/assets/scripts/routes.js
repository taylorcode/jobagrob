(function() {
  window.jobagrob = angular.module('jobagrob', ['ngResource']).config(function($routeProvider) {
    return $routeProvider.when('/signup', {
      templateUrl: 'views/credentials/partials/credentials.html',
      controller: 'SignUp'
    }).when('/login', {
      templateUrl: 'views/credentials/partials/credentials.html',
      controller: 'LogIn'
    }).when('/jobs/:id/generator', {
      templateUrl: 'views/generator/partials/generator.html',
      controller: 'Generator'
    }).when('/jobs/:id/application', {
      templateUrl: 'views/application/partials/application.html',
      controller: 'Application'
    }).when('/jobs/new', {
      templateUrl: 'views/job/partials/job.html',
      controller: 'Job'
    }).when('/jobs/:id/edit', {
      templateUrl: 'views/job/partials/job.html',
      controller: 'EditJob'
    }).otherwise({
      templateUrl: 'views/main/partials/main.html',
      controller: 'Main'
    });
  });

}).call(this);
