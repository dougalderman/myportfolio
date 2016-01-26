angular.module('myPortfolio')
.controller('projectsCtrl', function ($scope, $location, $anchorScroll) {
      
      $location.hash('projects');  // top of body
     
      if ($scope.reloadScreen) {
            $location.reload();
            $scope.reloadScreen = false;
       } 
       
     
      // call $anchorScroll()
      $anchorScroll();
    
});