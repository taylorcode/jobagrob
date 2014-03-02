jobagrob.controller 'Account', ($scope, jgApi, $http, $q, modelResourceComparator) ->
	log 'Account View'
	$scope.activeTab = 'resumes' # default active tab
	@changeTab = (tabName) ->
		$scope.activeTab = tabName
	@