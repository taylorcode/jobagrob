jobagrob.controller 'Application', ($scope, application, $routeParams, extract) ->

  #$scope.application = fieldsets: []

#  $scope.addFieldset = ->
#    $scope.application.fieldsets.push elems: []

  # id 526f1ecfb015dd5d9c000002


  application.get id: $routeParams.id, (app) ->
    $scope.application = app
    console.log angular.toJson app
  , () ->
    console.log arguments



  $scope.saveApp = (c) ->
    # format so we can save it
    c = extract.submittedApplication c

    console.log angular.toJson c


