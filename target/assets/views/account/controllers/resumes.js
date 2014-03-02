(function() {
  jobagrob.controller('Resumes', function($scope, jgApi, $http, $q, modelResourceComparator) {
    var changeDebounce, origResumes, setOrigResumes, startChangeWatch;
    log('Resumes View');
    origResumes = void 0;
    changeDebounce = 500;
    startChangeWatch = function() {
      return $scope.$watch('resumes', _.debounce(function(rs) {
        return $scope.$apply(function() {
          return $scope.changed = !angular.equals(rs, origResumes);
        });
      }, changeDebounce), true);
    };
    setOrigResumes = function() {
      return origResumes = angular.copy($scope.resumes);
    };
    $scope.resumes = jgApi.resumes.get(function(resumes) {
      setOrigResumes();
      return startChangeWatch();
    });
    this.revert = function() {
      return $scope.resumes = angular.copy(origResumes);
    };
    this.addResume = function(resumes) {
      return resumes.push({});
    };
    this.removeResume = function(resume, resumes) {
      return resumes.splice(resumes.indexOf(resume), 1);
    };
    this.saveResumes = function(rs) {
      var addResumeFile, deferredAddResumes, stripProps;
      deferredAddResumes = [];
      stripProps = ['fakePath', 'file'];
      addResumeFile = function(resume, formData) {
        return $http.post('api/account/resume/file', formData, {
          headers: {
            'Content-Type': undefined
          },
          transformRequest: angular.identity
        }).success(function(resumeFile) {
          resume.filename = resumeFile.filename;
          return _.strip(resume, stripProps);
        });
      };
      _.each(rs.resumes, function(resume) {
        var formData;
        if (!resume.file || !resume.file[0]) {
          return;
        }
        formData = new FormData;
        formData.append('resume', resume.file[0], resume.file[0].name);
        return deferredAddResumes.push(addResumeFile(resume, formData));
      });
      return $q.all(deferredAddResumes).then(function() {
        rs.$save();
        setOrigResumes();
        return $scope.changed = false;
      });
    };
    return this;
  });

}).call(this);
