jobagrob.directive 'jgFiles', () ->

  restrict: 'A'
  scope:
    jgFiles: '='

  link: (scope, element, attrs, ctrl) ->

    element.on 'change', (e) ->

      scope.$apply ->
        scope.jgFiles = e.target.files
