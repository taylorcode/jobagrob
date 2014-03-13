(function() {
  jobagrob.factory('generator', function($resource) {
    return $resource('api/jobs/:id/generator', {
      id: '@job'
    });
  }).factory('application', function($resource) {
    return $resource('api/jobs/:id/application', {
      id: '@id'
    });
  }).factory('jgApi', function($resource) {
    return {
      resumes: $resource('api/account/resumes/', {
        id: '@_id'
      }),
      job: $resource('api/jobs/:_id', {
        _id: '@_id'
      }),
      jobBookmarks: $resource('/api/account/jobs/bookmarks/:_id', {
        _id: '@_id'
      }),
      jobApplied: $resource('/api/account/jobs/applied/:_id', {
        _id: '@_id'
      }),
      jobs: $resource('api/jobs/search/:search', {
        search: '@search'
      }),
      user: $resource('api/user/:id', {
        search: '@_id'
      }),
      company: $resource('api/company/:id', {
        search: '@_id'
      }),
      account: $resource('api/account'),
      login: $resource('api/login')
    };
  }).factory('modelResourceComparator', function() {
    return {
      compare: function(origs, currents, identifier) {
        var added, deleted, id, updated;
        updated = [];
        deleted = [];
        added = [];
        id = identifier || '_id';
        _.each(origs, function(orig) {
          var cur, isDeleted, _i, _len;
          isDeleted = true;
          for (_i = 0, _len = currents.length; _i < _len; _i++) {
            cur = currents[_i];
            if (orig[id] === cur[id]) {
              isDeleted = false;
              if (!angular.equals(orig, cur)) {
                updated.push(_.extend(orig, cur));
                break;
              }
            }
          }
          if (isDeleted) {
            return deleted.push(orig);
          }
        });
        _.each(currents, function(cur) {
          if (!cur[id]) {
            return added.push(cur);
          }
        });
        return {
          updated: updated,
          deleted: deleted,
          added: added
        };
      }
    };
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
