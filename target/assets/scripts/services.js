(function() {
  jobagrob.factory('signUp', function($resource) {
    return $resource('http://localhost:port/api/signup', {
      port: ':8080'
    });
  }).factory('logIn', function($resource) {
    return $resource('http://localhost:port/api/login', {
      port: ':8080'
    });
  }).factory('checkLogIn', function($resource) {
    return $resource('http://localhost:port/api/checklogin', {
      port: ':8080'
    });
  }).factory('job', function($resource) {
    return $resource('http://localhost:port/api/jobs/:id', {
      port: ':8080',
      id: '@id'
    });
  }).factory('generator', function($resource) {
    return $resource('http://localhost:port/api/jobs/:id/generator', {
      port: ':8080',
      id: '@job'
    });
  }).factory('application', function($resource) {
    return $resource('http://localhost:port/api/jobs/:id/application', {
      port: ':8080',
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
