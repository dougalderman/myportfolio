angular.module('myPortfolio')
.controller('projectsCtrl', function ($scope, $location, $anchorScroll) {
      
      $location.hash('projects');  
     
      $anchorScroll();
    
});