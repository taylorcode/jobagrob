jobagrob.controller 'Account', ($scope, resumes) ->
	log 'Account View'

	$scope.resumes = [
		title: 'The title of my resume'
		tagline: 'I dont know what a tagline is and why we need it but ok'
		#file: 'This is the actual resume file.'
	,
		title: 'The title of my resume'
		tagline: 'I dont know what a tagline is and why we need it but ok'
		#file: 'This is the actual resume file.'
	]

	@addResume = (resumes) ->
		resumes.push {}

	@removeResume = (resume, resumes) ->
		resumes.splice resumes.indexOf resume, 1

	@saveResumes = (rs) ->
		resumes.save rs[0].formData

	@
