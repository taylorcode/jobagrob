(function() {
  jobagrob.controller('Account', function($scope, jgApi, $http, $q, modelResourceComparator) {
    log('Account View');
    $scope.activeTab = 'resumes';
    this.changeTab = function(tabName) {
      return $scope.activeTab = tabName;
    };
    return this;
  });

}).call(this);
