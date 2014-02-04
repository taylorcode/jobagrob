jobagrob.factory 'signUp', ($resource) ->
	$resource 'http://localhost:port/api/signup', port: ':8080'

.factory 'logIn', ($resource) ->
	$resource 'http://localhost:port/api/login', port: ':8080'

.factory 'checkLogIn', ($resource) ->
	$resource 'http://localhost:port/api/checklogin', port: ':8080'

.factory 'job', ($resource) ->
  $resource 'http://localhost:port/api/jobs/:id', port: ':8080', id: '@id'

.factory 'generator', ($resource) ->
	$resource 'http://localhost:port/api/jobs/:id/generator', port: ':8080', id: '@job'

.factory 'application', ($resource) ->
  $resource 'http://localhost:port/api/jobs/:id/application', port: ':8080', id: '@id'

.factory 'extract', () ->
  application: (a) ->
    a = angular.copy a
    a.fieldsets = _.map(a.fieldsets, (v) ->
      v.elems = _.map(v.elems, (e) -> 
        # these define what elements to keep based on the template
        keepers = {}
        keepers.textarea =  ['maxlength', 'placeholder']
        keepers.input = ['fieldType'].concat(keepers.textarea)
        keepers.radio = ['opts']
        keepers.checkbox = keepers.radio
        keepers.select = keepers.radio

        keep = ['title', 'required', 'template'].concat keepers[e.props.template]
        e.props = _.pick e.props, keep

        _.pick e, 'props'

      )
      v
    )
    a
  submittedApplication: (c) ->
    # TODO Clean this up!
    c = angular.copy c
    #c.fieldsets = _.map(c.fieldsets, (v) ->
    #	_.map(v.elems, (e) ->
    #		e.props = _.pick e.props, 'value', 'checkboxes'
    #		e
    #	)
    #)
    c
