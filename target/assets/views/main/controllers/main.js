(function() {
  jobagrob.controller('Main', function($scope) {
    console.log('Main View');
    $scope.jobs = [
      {
        title: 'New Back-End Development',
        company: 'Microsoft',
        location: 'Kentucky, CA'
      }, {
        title: 'New Back-End Development Position',
        company: 'Microsoft',
        location: 'Kentucky, CA'
      }, {
        title: 'New Back-End Development Position',
        company: 'Microsoft',
        location: 'Kentucky, CA'
      }
    ];
    return $scope.suggestions = [
      {
        title: 'New Back-End Development Position',
        company: 'Microsoft',
        location: 'Kentucky, CA'
      }, {
        title: 'New Back-End Development Position',
        company: 'Microsoft',
        location: 'Kentucky, CA'
      }, {
        title: 'New Back-End Development Position',
        company: 'Microsoft',
        location: 'Kentucky, CA'
      }
    ];
  });

}).call(this);
