angular.module('myPortfolio')
.controller('resumeCtrl', function ($scope, $location, $anchorScroll) {
     
      $location.hash('resume');  
        
      $anchorScroll(); 
     
});