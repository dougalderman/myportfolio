angular.module('myPortfolio')
.controller('projectsCtrl', function ($scope, $location, $anchorScroll) {
      
      $location.hash('projects');  
     
    /*  if ($scope.reloadScreen) {
            $location.reload();
            $scope.reloadScreen = false;
       } 
    */   
     
      // call $anchorScroll()
      $anchorScroll();
    
});