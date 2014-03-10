jobagrob.controller 'Jobagrob', ($route, $routeParams, $location, $scope) ->
    log 'Jobagrob Controller Initialized'
    @$route = $route
    @$location = $location
    @$routeParams = $routeParams