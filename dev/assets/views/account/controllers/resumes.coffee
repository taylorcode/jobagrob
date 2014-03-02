jobagrob.controller 'Resumes', ($scope, jgApi, $http, $q, modelResourceComparator) ->
	log 'Resumes View'

	origResumes = undefined
	changeDebounce = 500

	startChangeWatch = ->
		$scope.$watch 'resumes', _.debounce((rs) ->
			$scope.$apply ->
				$scope.changed = not angular.equals rs, origResumes
		, changeDebounce)
		,true

	setOrigResumes = ->
		origResumes = angular.copy $scope.resumes # save original

	$scope.resumes = jgApi.resumes.get (resumes) ->
		setOrigResumes() # save original
		startChangeWatch() # watch the model for changes

	@revert = ->
		$scope.resumes = angular.copy origResumes # restore original

	@addResume = (resumes) ->
		resumes.push {}

	@removeResume = (resume, resumes) ->
		resumes.splice resumes.indexOf(resume), 1

	@saveResumes = (rs) ->

		deferredAddResumes = []
		stripProps = ['fakePath', 'file']

		addResumeFile = (resume, formData) ->
			$http.post('api/account/resume/file', formData,
					headers:
						'Content-Type': `undefined`
					transformRequest: angular.identity
				).success (resumeFile) ->
					resume.filename = resumeFile.filename # update url on this resume
					_.strip resume, stripProps
		_.each rs.resumes, (resume) ->
			return if not resume.file or not resume.file[0] # TODO do a type check?
			formData = new FormData
			formData.append 'resume', resume.file[0], resume.file[0].name
			deferredAddResumes.push addResumeFile resume, formData # curry these callbacks

		$q.all deferredAddResumes
		.then ->
			rs.$save()
			setOrigResumes()
			$scope.changed = false # TODO - this should just call the comparator again
	@