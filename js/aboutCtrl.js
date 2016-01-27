angular.module('myPortfolio')
.controller('aboutCtrl', function ($scope, $location, $anchorScroll) {
     
  /*     if ($scope.reloadScreen) {
            location.reload();
            $scope.reloadScreen = false;
       } */
    
      $location.hash('about');  
        
      $anchorScroll()
     
});