baseJobCtrl = (cb) ->
	($scope, job, $routeParams) ->
		$scope.info = 
	    types: ['programming', 'farming', 'eating']
	    industries: ['tech', 'agriculture']

	  $scope.createJob = (j) ->

	    job.save j, (j) ->
	      console.log angular.toJson j
	      
	  cb.apply this, arguments if cb


jobagrob.controller 'Job', baseJobCtrl()

jobagrob.controller 'EditJob', baseJobCtrl ($scope, job, $routeParams)->
	# get the current 
	job.get id: $routeParams.id, (j) ->
		$scope.job = j
	
