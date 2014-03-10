(function() {
  window.jobagrob = angular.module('jobagrob', ['ngResource', 'ngRoute', 'ngTouch', 'ui.router', 'angularFileUpload']).config(function($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
    var checkAuth;
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('credentials', {
      templateUrl: 'assets/views/credentials/partials/credentials.html'
    }).state('credentials.signup', {
      url: '/signup',
      templateUrl: 'assets/views/credentials/partials/signup.html',
      controller: 'SignUp'
    }).state('credentials.login', {
      url: '/login',
      templateUrl: 'assets/views/credentials/partials/login.html',
      controller: 'LogIn'
    }).state('base', {
      templateUrl: 'assets/views/base/partials/base.html',
      resolve: {
        account: function($q, jgApi, $rootScope) {
          return $rootScope.accountPromise = jgApi.account.get(function(account) {
            if (account.user) {
              return $rootScope.accountType = 'user';
            } else if (account.company) {
              return $rootScope.accountType = 'company';
            }
          }).$promise;
        }
      }
    }).state('redirect', {
      url: '/',
      resolve: {
        redirect: function($rootScope, $location) {
          return $rootScope.accountPromise.then(function(account) {
            var newPath;
            newPath = account.email ? '/main' : '/jobs';
            return $location.path(newPath);
          });
        }
      },
      parent: 'base'
    }).state('base.jobs', {
      url: '/jobs',
      templateUrl: 'assets/views/jobs/partials/jobs.html',
      controller: 'Jobs as jobs'
    }).state('job', {
      url: '/jobs/:id',
      templateUrl: 'assets/views/job/partials/view-job.html',
      controller: 'ViewJob as viewJob',
      parent: 'base',
      resolve: {
        job: function(jgApi, $stateParams) {
          return jgApi.job.get({
            _id: $stateParams.id
          }).$promise;
        }
      }
    }).state('base.account', {
      templateUrl: 'assets/views/base/partials/account.html',
      resolve: {
        account: function($rootScope, $q, $location) {
          return $rootScope.accountPromise.then(function(account) {
            if (!account.email) {
              return $location.path('/login');
            }
          });
        }
      }
    }).state('user', {
      templateUrl: 'assets/views/base/partials/user.html',
      parent: 'base.account',
      resolve: {
        user: function($rootScope, $q, $location) {
          return $rootScope.accountPromise.then(function(account) {
            if (!account.user) {
              return $location.path('/login');
            }
          });
        }
      }
    }).state('company', {
      templateUrl: 'assets/views/base/partials/company.html',
      parent: 'base.account',
      resolve: {
        company: function($rootScope, $q, $location) {
          return $rootScope.accountPromise.then(function(account) {
            if (!account.company) {
              return $location.path('/login');
            }
          });
        }
      }
    }).state('user.main', {
      url: '/main',
      templateUrl: 'assets/views/main/partials/main.html',
      controller: 'Main'
    }).state('user.account', {
      url: '/account',
      templateUrl: 'assets/views/account/partials/account.html',
      controller: 'Account as account',
      resolve: {
        resumes: function(jgApi) {
          return jgApi.resumes.get().$promise;
        }
      }
    });
    $locationProvider.html5Mode(true);
    checkAuth = function($q, $location, $rootScope) {
      var error, success;
      success = function(response) {
        return response;
      };
      error = function(response) {
        var errorCode;
        $rootScope.account = false;
        errorCode = response.status;
        if (errorCode === 403 || errorCode === 401) {
          return $location.path('/login');
        }
      };
      return function(promise) {
        return promise.then(success, error);
      };
    };
    return $httpProvider.responseInterceptors.push(checkAuth);
  });

}).call(this);
