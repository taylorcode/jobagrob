(function() {
  _.mixin({
    containsEqualObj: function(obj, contains) {
      var i, l;
      i = void 0;
      l = this.length;
      i = 0;
      while (i < l) {
        if (_.isEqual(obj[i], contains)) {
          return true;
        }
        i++;
      }
      return false;
    }
  });

  jobagrob.controller('Generator', function($scope, generator, extract, $routeParams) {
    $scope.application = {
      fieldsets: []
    };
    $scope.addFieldset = function() {
      return $scope.application.fieldsets.push({
        elems: []
      });
    };
    $scope.addElem = function(fieldset) {
      return fieldset.elems.push({
        props: {
          template: 'input',
          opts: []
        }
      });
    };
    $scope.removeElem = function(elems, elem) {
      return elems.splice(elems.indexOf(elem), 1);
    };
    $scope.addOpt = function(elem, newOpt) {
      if (!newOpt || _.containsEqualObj(_.map(elem.props.opts, function(v) {
        return _.pick(v, 'val');
      }), {
        val: newOpt
      })) {
        return;
      }
      elem.props.opts.push({
        val: newOpt
      });
      return elem.newOpt = '';
    };
    $scope.removeOpt = function(elem, opt) {
      return elem.props.opts.splice(elem.props.opts.indexOf(opt), 1);
    };
    $scope.serialize = function(a) {
      return alert(angular.toJson(a));
    };
    return $scope.createApplication = function(a) {
      a = extract.application(a);
      a.job = $routeParams.id;
      return generator.save(a, function(a) {
        return console.log(angular.toJson(a));
      });
    };
  }).filter('getTemplate', function() {
    return function(template) {
      var match;
      match = {
        input: 'input',
        textarea: 'textarea',
        select: 'options',
        radio: 'options',
        checkbox: 'options'
      };
      return match[template] + '.html';
    };
  });

}).call(this);
