jobagrob.controller 'Jobagrob', ($route, $routeParams, $location, $scope) ->
    log 'Jobagrob Controller Initialized'
    jobagrob = @ # friggen bs FIXME?
    @$route = $route
    @$location = $location
    @$routeParams = $routeParams

    # monitor the route to see if we should show the header
    @headerlessRoutes = ['/login', '/signup'] # just our routes that we do not want to render a header for

    $scope.$on '$locationChangeSuccess', () ->
        return $scope.showHeader = true if jobagrob.headerlessRoutes.indexOf($location.path()) is -1
        $scope.showHeader = false

    @