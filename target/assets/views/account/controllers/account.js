(function() {
  jobagrob.controller('Account', function($scope, resumes) {
    log('Account View');
    $scope.resumes = [
      {
        title: 'The title of my resume',
        tagline: 'I dont know what a tagline is and why we need it but ok'
      }, {
        title: 'The title of my resume',
        tagline: 'I dont know what a tagline is and why we need it but ok'
      }
    ];
    this.addResume = function(resumes) {
      return resumes.push({});
    };
    this.removeResume = function(resume, resumes) {
      return resumes.splice(resumes.indexOf(resume, 1));
    };
    this.saveResumes = function(rs) {
      return resumes.save(rs[0].formData);
    };
    return this;
  });

}).call(this);
