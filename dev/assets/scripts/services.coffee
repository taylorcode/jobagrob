jobagrob.factory 'signUp', ($resource) ->
	$resource 'api/signup'

.factory 'logIn', ($resource) ->
	$resource 'api/login'

.factory 'checkLogIn', ($resource) ->
	$resource 'api/checklogin'

.factory 'job', ($resource) ->
  $resource 'api/jobs/:id', id: '@id'

.factory 'generator', ($resource) ->
	$resource 'api/jobs/:id/generator', id: '@job'

.factory 'application', ($resource) ->
  $resource 'api/jobs/:id/application', id: '@id'

.factory 'resumes', ($resource) ->
  $resource 'api/account/resumes'

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
