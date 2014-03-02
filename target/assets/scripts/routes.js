(function() {
  window.jobagrob = angular.module('jobagrob', ['ngResource', 'ngRoute', 'ngTouch', 'angularFileUpload']).config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/signup', {
      templateUrl: 'assets/views/credentials/partials/credentials.html',
      controller: 'SignUp'
    }).when('/login', {
      templateUrl: 'assets/views/credentials/partials/credentials.html',
      controller: 'LogIn'
    }).when('/jobs/:id/generator', {
      templateUrl: 'assets/views/generator/partials/generator.html',
      controller: 'Generator'
    }).when('/jobs/:id/application', {
      templateUrl: 'assets/views/application/partials/application.html',
      controller: 'Application'
    }).when('/jobs/new', {
      templateUrl: 'assets/views/job/partials/job.html',
      controller: 'Job'
    }).when('/jobs/:id', {
      templateUrl: 'assets/views/job/partials/view-job.html',
      controller: 'ViewJob'
    }).when('/jobs/:id/edit', {
      templateUrl: 'assets/views/job/partials/job.html',
      controller: 'EditJob'
    }).when('/account', {
      templateUrl: 'assets/views/account/partials/account.html',
      controller: 'Account',
      controllerAs: 'account'
    }).otherwise({
      templateUrl: 'assets/views/main/partials/main.html',
      controller: 'Main'
    });
    return $locationProvider.html5Mode(true);
  });

}).call(this);
