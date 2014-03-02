(function() {
  jobagrob.controller('SignUp', function($scope, signUp) {
    var createAccount;
    log('Sign Up');
    $scope.template = 'signup';
    createAccount = function(account) {
      return signUp.save(_.omit(account, ['confirmPassword']));
    };
    return $scope.signUp = function(account) {
      return createAccount(account);
    };
  });

  jobagrob.controller('LogIn', function($scope, logIn, checkLogIn, $location) {
    $scope.template = 'login';
    $scope.logIn = function(credentials) {
      return logIn.save(credentials, function() {
        return $location.path('/');
      }, function() {
        return alert('TODO incorrect credentials');
      });
    };
    return $scope.checkLogIn = function() {
      return checkLogIn.save({
        id: 'sf3rsfsdfsfdkj'
      });
    };
  });

}).call(this);
