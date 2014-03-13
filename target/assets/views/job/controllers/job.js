(function() {
  var baseJobCtrl, getJobCtrl;

  baseJobCtrl = function($scope, jgApi) {
    $scope.info = {
      types: ['programming', 'farming', 'eating'],
      industries: ['tech', 'agriculture']
    };
    this.createJob = function(j) {
      return jgApi.job.save(j, function(j) {
        return log(angular.toJson(j));
      });
    };
    return this;
  };

  getJobCtrl = function($scope, job) {
    log(job);
    $scope.job = job;
    return this;
  };

  jobagrob.controller('Job', baseJobCtrl);

  jobagrob.controller('EditJob', function($scope, jgApi, job) {
    getJobCtrl.call(this, $scope, job);
    baseJobCtrl.call(this, $scope, jgApi);
    return this;
  });

  jobagrob.controller('ViewJob', function($scope, job, jgApi, $stateParams) {
    getJobCtrl.call(this, $scope, job);
    $scope.bookmarkStatus = jgApi.jobBookmarks.get({
      _id: $stateParams.id
    });
    jgApi.jobApplied.save({
      _id: $stateParams.id
    });
    $scope.appliedJobs = jgApi.jobApplied.query();
    this.bookmark = function(job) {
      return $scope.bookmarkStatus.$save();
    };
    return this;
  });

}).call(this);
