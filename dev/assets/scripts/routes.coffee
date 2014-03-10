window.jobagrob = angular.module('jobagrob', ['ngResource', 'ngRoute', 'ngTouch', 'ui.router', 'angularFileUpload'])

.config ($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) ->

  $urlRouterProvider.otherwise '/'

  $stateProvider

  .state 'credentials',
    templateUrl: 'assets/views/credentials/partials/credentials.html'

  .state 'credentials.signup',
    url: '/signup'
    templateUrl: 'assets/views/credentials/partials/signup.html'
    controller: 'SignUp'

  .state 'credentials.login',
    url: '/login'
    templateUrl: 'assets/views/credentials/partials/login.html'
    controller: 'LogIn'

  .state 'base',
    templateUrl: 'assets/views/base/partials/base.html'
    resolve:
      account: ($q, jgApi, $rootScope) ->
        # TODO possible use promise service instead of $rootScope
        # sets the account type, attaches the account resource object's promise to $rootScope
        $rootScope.accountPromise = jgApi.account.get (account) ->
          if account.user
            $rootScope.accountType = 'user'
          else if account.company
            $rootScope.accountType = 'company'
        .$promise
        # returns the promise
        # else will return a 401/403? and will auto redirect to login

  .state 'redirect',
    url: '/' #TODO - this should redirect to dashboard or jobs when loaded
    resolve:
      redirect: ($rootScope, $location) ->
        $rootScope.accountPromise.then (account) ->
          newPath = if account.email then '/main' else '/jobs'
          $location.path newPath
    parent: 'base'

  .state 'base.jobs',
    url: '/jobs' #TODO - this should redirect to dashboard or jobs when loaded
    templateUrl: 'assets/views/jobs/partials/jobs.html'
    controller: 'Jobs as jobs'

  .state 'job',
    url: '/jobs/:id'
    templateUrl: 'assets/views/job/partials/view-job.html'
    controller: 'ViewJob as viewJob'
    parent: 'base'
    resolve:
      job: (jgApi, $stateParams) ->
        jgApi.job.get(_id: $stateParams.id).$promise

  .state 'base.account',
    templateUrl: 'assets/views/base/partials/account.html'
    resolve:
      account: ($rootScope, $q, $location) ->
        # checks if the user is a user, else is company and redirects to login
        $rootScope.accountPromise.then (account) ->
          if not account.email
            # $q.reject - want to cut off the promise chain, so we don't reject or it may call the error handlers (not in the view that is presented, but others.)
            $location.path '/login' # or 403 page
        # returns the promise

  .state 'user',
    templateUrl: 'assets/views/base/partials/user.html'
    parent: 'base.account'
    resolve:
      user: ($rootScope, $q, $location) ->
        # checks if the user is a user, else is company and redirects to login
        $rootScope.accountPromise.then (account) ->
          if not account.user
            # $q.reject - want to cut off the promise chain, so we don't reject or it may call the error handlers (not in the view that is presented, but others.)
            $location.path '/login' # or 403 page
        # returns the promise

  .state 'company',
    templateUrl: 'assets/views/base/partials/company.html'
    parent: 'base.account'
    resolve:
      company: ($rootScope, $q, $location) ->
        # checks if the user is a user, else is company and redirects to login
        $rootScope.accountPromise.then (account) ->
          if not account.company
            # $q.reject - want to cut off the promise chain, so we don't reject or it may call the error handlers (not in the view that is presented, but others.)
            $location.path '/login' # or 403 page

  .state 'user.main',
    url: '/main'
    templateUrl: 'assets/views/main/partials/main.html'
    controller: 'Main'

  .state 'user.account',
    url: '/account'
    templateUrl: 'assets/views/account/partials/account.html'
    controller: 'Account as account'
    resolve:
      resumes: (jgApi) ->
        # TODO - resumes is already on the account, which can be obtained with the promise
        jgApi.resumes.get().$promise
    #parent: 'user' this works too



  # .when '/account',
  #   templateUrl: 'assets/views/account/partials/account.html'
  #   controller: 'Account'
  #   controllerAs: 'account'
  #   parent: 'user'


  # $routeProvider
  # .when '/signup',
  #   templateUrl: 'assets/views/credentials/partials/credentials.html'
  #   controller: 'SignUp'
  # .when '/login',
  #   templateUrl: 'assets/views/credentials/partials/credentials.html'
  #   controller: 'LogIn'
  # .when '/jobs/:id/generator',
  # 	templateUrl: 'assets/views/generator/partials/generator.html'
  # 	controller: 'Generator'
  # .when '/jobs/:id/application',
  #   templateUrl: 'assets/views/application/partials/application.html'
  #   controller: 'Application'
  # .when '/jobs/new',
  #   templateUrl: 'assets/views/job/partials/job.html'
  #   controller: 'Job'
  #   controllerAs: 'job'
  # .when '/jobs',
  #   templateUrl: 'assets/views/jobs/partials/jobs.html'
  #   controller: 'Jobs'
  #   controllerAs: 'jobs'
  # .when '/jobs/:id',
  #   templateUrl: 'assets/views/job/partials/view-job.html'
  #   controller: 'ViewJob'
  # .when '/jobs/:id/edit',
  #   templateUrl: 'assets/views/job/partials/job.html'
  #   controller: 'EditJob'
  # .when '/account',
  #   templateUrl: 'assets/views/account/partials/account.html'
  #   controller: 'Account'
  #   controllerAs: 'account'
  #   #resolve: credentialResolve
  # .otherwise
  #   templateUrl: 'assets/views/main/partials/main.html'
  #   controller: 'Main'

  $locationProvider.html5Mode true

  checkAuth =  ($q, $location, $rootScope) ->
    success = (response) ->
      response
    error = (response) ->
      $rootScope.account = false
      errorCode = response.status
      $location.path '/login' if errorCode is 403 or errorCode is 401
      # $q.reject response - no need because we are redirecting before any other promises in the chain will resolve (were breaking our future promises)

    (promise) ->
      promise.then success, error

  $httpProvider.responseInterceptors.push checkAuth




