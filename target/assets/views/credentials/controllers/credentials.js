(function() {
  jobagrob.controller('SignUp', function($scope, jgApi) {
    log('Sign Up');
    return $scope.signUp = function(account) {
      return jgApi.account.save(_.omit(account, ['confirmPassword']));
    };
  });

  jobagrob.controller('LogIn', function($scope, jgApi, $location) {
    return $scope.logIn = function(credentials) {
      return jgApi.login.save(credentials, function(response) {
        return $location.path('/main');
      }, function() {
        return alert('TODO incorrect credentials');
      });
    };
  });

}).call(this);
