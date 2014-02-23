(function() {
  jobagrob.directive('jgFormData', function() {
    return {
      restrict: 'A',
      scope: {
        jgFormData: '='
      },
      link: function(scope, element, attrs, ctrl) {
        return element.on('change', function(e) {
          var formData;
          formData = new FormData;
          _.each(e.target.files, function(file) {
            return formData.append('files', file, file.name);
          });
          return scope.$apply(function() {
            return scope.jgFormData = formData;
          });
        });
      }
    };
  });

}).call(this);
