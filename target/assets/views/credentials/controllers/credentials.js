(function() {
  jobagrob.controller('SignUp', function($scope, signUp) {
    var createAccount;
    console.log('Sign Up');
    $scope.template = 'signup';
    createAccount = function(account) {
      return signUp.save(_.omit(account, ['confirmPassword']));
    };
    $scope.signUpUser = function(user) {
      user.type = 'user';
      return createAccount(user);
    };
    return $scope.signUpCompany = function(company) {
      company.type = 'company';
      return createAccount(company);
    };
  });

  jobagrob.controller('LogIn', function($scope, logIn, checkLogIn, $location) {
    console.log('Log In');
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
