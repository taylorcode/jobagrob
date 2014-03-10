jobagrob.controller 'Jobs', ($scope, jgApi, $routeParams) ->
	log 'Jobs controller'

	$scope.$watch 'search', (val) ->
		$scope.jobs = jgApi.jobs.get search: val if val
	@


# var resource = $resource(…);
# resource.$abort // undefined
# var request1 = resource.query(…); // creates deferred1
# var request2 = resource.query(…); // creates deferred2
# request1.$abort(); // will resolve deferred1 only, but not deferred2, so request2 will continue
