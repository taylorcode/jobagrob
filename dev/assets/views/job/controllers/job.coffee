baseJobCtrl = ($scope, jgApi) ->

	$scope.info = 
	    types: ['programming', 'farming', 'eating']
	    industries: ['tech', 'agriculture']

	@createJob = (j) ->
		jgApi.job.save j, (j) ->
			log angular.toJson j

	@

getJobCtrl = ($scope, job) ->
	log job
	$scope.job = job
	@


jobagrob.controller 'Job', baseJobCtrl

jobagrob.controller 'EditJob', ($scope, jgApi, job) ->

	getJobCtrl.call @, $scope, job
	baseJobCtrl.call @, $scope, jgApi

	@

jobagrob.controller 'ViewJob', ($scope, job, jgApi, $stateParams) ->
	getJobCtrl.call @, $scope, job

	# $scope.bookmarks = jgApi.jobBookmarks.query() GET BOOKMARKS

	$scope.bookmarkStatus = jgApi.jobBookmarks.get(_id: $stateParams.id)

	jgApi.jobApplied.save(_id: $stateParams.id)

	$scope.appliedJobs = jgApi.jobApplied.query()

	@bookmark = (job) ->
		$scope.bookmarkStatus.$save()
		#jgApi.jobBookmarks.save _id: job._id # TODO priority is not used but may be

	@