baseJobCtrl = ($scope, job, $routeParams) ->

	$scope.info = 
	    types: ['programming', 'farming', 'eating']
	    industries: ['tech', 'agriculture']

  $scope.createJob = (j) ->

    job.save j, (j) ->
      console.log angular.toJson j

getJobCtrl = ($scope, job, $routeParams) ->

	job.get id: $routeParams.id, (j) ->
		$scope.job = j


jobagrob.controller 'Job', baseJobCtrl

jobagrob.controller 'EditJob', ($scope, job, $routeParams) ->

	baseJobCtrl.call @, $scope, job, $routeParams
	getJobCtrl.call @, $scope, job, $routeParams

jobagrob.controller 'ViewJob', getJobCtrl