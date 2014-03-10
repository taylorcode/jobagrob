(function() {
  jobagrob.controller('Jobs', function($scope, jgApi, $routeParams) {
    log('Jobs controller');
    $scope.$watch('search', function(val) {
      if (val) {
        return $scope.jobs = jgApi.jobs.get({
          search: val
        });
      }
    });
    return this;
  });

}).call(this);
