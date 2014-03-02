(function() {
  jobagrob.directive('jgFiles', function() {
    return {
      restrict: 'A',
      scope: {
        jgFiles: '='
      },
      link: function(scope, element, attrs, ctrl) {
        return element.on('change', function(e) {
          return scope.$apply(function() {
            return scope.jgFiles = e.target.files;
          });
        });
      }
    };
  });

}).call(this);
