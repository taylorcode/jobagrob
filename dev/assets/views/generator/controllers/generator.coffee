_.mixin(
  containsEqualObj: (obj, contains) ->
    i = undefined
    l = @length
    i = 0
    while i < l
      return true  if _.isEqual obj[i], contains
      i++
    false
)

jobagrob.controller 'Generator', ($scope, generator, extract, $routeParams) ->

  $scope.application = fieldsets: []

  $scope.addFieldset = ->
    $scope.application.fieldsets.push elems: []

  $scope.addElem = (fieldset) ->
    fieldset.elems.push 
      props: template: 'input', opts: []

  $scope.removeElem = (elems, elem) ->
    elems.splice elems.indexOf(elem), 1

  $scope.addOpt = (elem, newOpt) ->
    # check if object with same structure exists in the list
    return if !newOpt or _.containsEqualObj _.map(elem.props.opts, (v) -> _.pick v, 'val'), val: newOpt
    elem.props.opts.push val: newOpt
    elem.newOpt = ''

  $scope.removeOpt = (elem, opt) ->
    elem.props.opts.splice elem.props.opts.indexOf(opt), 1

  $scope.serialize = (a) ->
    alert angular.toJson a

  $scope.createApplication = (a) ->

    a = extract.application a
    
    a.job = $routeParams.id
    #console.log angular.toJson a

    generator.save a, (a) ->
      console.log angular.toJson a


#convert the templates to either text or options
.filter 'getTemplate', () ->
  (template) ->
    match = 
      input: 'input',
      textarea: 'textarea',
      select: 'options',
      radio: 'options',
      checkbox: 'options'
    match[template] + '.html'




