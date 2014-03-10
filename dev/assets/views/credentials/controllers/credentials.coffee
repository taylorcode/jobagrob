jobagrob.controller 'SignUp', ($scope, jgApi) ->
	log 'Sign Up'

	$scope.signUp = (account) ->
		jgApi.account.save _.omit account, ['confirmPassword']


jobagrob.controller 'LogIn', ($scope, jgApi, $location) ->

	$scope.logIn = (credentials) ->
		# prototype updates for callback handling via $promise: http://stackoverflow.com/questions/15531117/angularjs-1-1-3-resource-callback-error-and-success
		jgApi.login.save credentials, (response) ->
			# auth token - if implement oAuth
			$location.path '/main'
		, () ->
			alert 'TODO incorrect credentials'
