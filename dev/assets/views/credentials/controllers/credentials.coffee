jobagrob.controller 'SignUp', ($scope, signUp) ->
	log 'Sign Up'

	$scope.template = 'signup'

	createAccount = (account) ->
		signUp.save _.omit account, ['confirmPassword']

	$scope.signUpUser = (user) ->
		user.type = 'user'
		createAccount user

	$scope.signUpCompany = (company) ->
		company.type = 'company'
		createAccount company


jobagrob.controller 'LogIn', ($scope, logIn, checkLogIn, $location) ->

	$scope.template = 'login'

	$scope.logIn = (credentials) ->
		# prototype updates for callback handling via $promise: http://stackoverflow.com/questions/15531117/angularjs-1-1-3-resource-callback-error-and-success
		logIn.save(credentials, () ->
			$location.path '/'
		, () ->
			alert 'TODO incorrect credentials'
		)

	$scope.checkLogIn = () ->
		checkLogIn.save(id: 'sf3rsfsdfsfdkj')
