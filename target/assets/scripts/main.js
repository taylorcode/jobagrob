(function() {
  jobagrob.controller('Jobagrob', function($route, $routeParams, $location, $scope) {
    var jobagrob;
    log('Jobagrob Controller Initialized');
    jobagrob = this;
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;
    this.headerlessRoutes = ['/login', '/signup'];
    $scope.$on('$locationChangeSuccess', function() {
      if (jobagrob.headerlessRoutes.indexOf($location.path()) === -1) {
        return $scope.showHeader = true;
      }
      return $scope.showHeader = false;
    });
    return this;
  });

}).call(this);
