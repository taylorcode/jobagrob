jobagrob.directive 'jgFormData', () ->

  restrict: 'A'
  scope:
    jgFormData: '='

  link: (scope, element, attrs, ctrl) ->

    element.on 'change', (e) ->

      formData = new FormData

      _.each e.target.files, (file) ->
        formData.append 'files', file, file.name

      scope.$apply ->
        scope.jgFormData = formData
