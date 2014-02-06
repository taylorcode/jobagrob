(function() {
  jobagrob.factory('signUp', function($resource) {
    return $resource('api/signup');
  }).factory('logIn', function($resource) {
    return $resource('api/login');
  }).factory('checkLogIn', function($resource) {
    return $resource('api/checklogin');
  }).factory('job', function($resource) {
    return $resource('api/jobs/:id', {
      id: '@id'
    });
  }).factory('generator', function($resource) {
    return $resource('api/jobs/:id/generator', {
      id: '@job'
    });
  }).factory('application', function($resource) {
    return $resource('api/jobs/:id/application', {
      id: '@id'
    });
  }).factory('extract', function() {
    return {
      application: function(a) {
        a = angular.copy(a);
        a.fieldsets = _.map(a.fieldsets, function(v) {
          v.elems = _.map(v.elems, function(e) {
            var keep, keepers;
            keepers = {};
            keepers.textarea = ['maxlength', 'placeholder'];
            keepers.input = ['fieldType'].concat(keepers.textarea);
            keepers.radio = ['opts'];
            keepers.checkbox = keepers.radio;
            keepers.select = keepers.radio;
            keep = ['title', 'required', 'template'].concat(keepers[e.props.template]);
            e.props = _.pick(e.props, keep);
            return _.pick(e, 'props');
          });
          return v;
        });
        return a;
      },
      submittedApplication: function(c) {
        c = angular.copy(c);
        return c;
      }
    };
  });

}).call(this);
