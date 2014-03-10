(function() {
  jobagrob.controller('Jobagrob', function($route, $routeParams, $location, $scope) {
    log('Jobagrob Controller Initialized');
    this.$route = $route;
    this.$location = $location;
    return this.$routeParams = $routeParams;
  });

}).call(this);
