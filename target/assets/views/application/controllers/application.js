(function() {
  jobagrob.controller('Application', function($scope, application, $routeParams, extract) {
    application.get({
      id: $routeParams.id
    }, function(app) {
      $scope.application = app;
      return console.log(angular.toJson(app));
    }, function() {
      return console.log(arguments);
    });
    return $scope.saveApp = function(c) {
      c = extract.submittedApplication(c);
      return console.log(angular.toJson(c));
    };
  });

}).call(this);
