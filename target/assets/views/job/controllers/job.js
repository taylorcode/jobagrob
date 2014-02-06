(function() {
  var baseJobCtrl;

  baseJobCtrl = function(cb) {
    return function($scope, job, $routeParams) {
      $scope.info = {
        types: ['programming', 'farming', 'eating'],
        industries: ['tech', 'agriculture']
      };
      $scope.createJob = function(j) {
        return job.save(j, function(j) {
          return console.log(angular.toJson(j));
        });
      };
      if (cb) {
        return cb.apply(this, arguments);
      }
    };
  };

  jobagrob.controller('Job', baseJobCtrl());

  jobagrob.controller('EditJob', baseJobCtrl(function($scope, job, $routeParams) {
    return job.get({
      id: $routeParams.id
    }, function(j) {
      return $scope.job = j;
    });
  }));

}).call(this);
