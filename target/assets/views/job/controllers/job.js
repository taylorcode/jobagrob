(function() {
  var baseJobCtrl, getJobCtrl;

  baseJobCtrl = function($scope, job, $routeParams) {
    $scope.info = {
      types: ['programming', 'farming', 'eating'],
      industries: ['tech', 'agriculture']
    };
    return $scope.createJob = function(j) {
      return job.save(j, function(j) {
        return console.log(angular.toJson(j));
      });
    };
  };

  getJobCtrl = function($scope, job, $routeParams) {
    return job.get({
      id: $routeParams.id
    }, function(j) {
      return $scope.job = j;
    });
  };

  jobagrob.controller('Job', baseJobCtrl);

  jobagrob.controller('EditJob', function($scope, job, $routeParams) {
    baseJobCtrl.call(this, $scope, job, $routeParams);
    return getJobCtrl.call(this, $scope, job, $routeParams);
  });

  jobagrob.controller('ViewJob', getJobCtrl);

}).call(this);
