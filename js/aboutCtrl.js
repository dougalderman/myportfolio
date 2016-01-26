angular.module('myPortfolio')
.controller('aboutCtrl', function ($scope) {
     
       if ($scope.reloadScreen) {
            location.reload();
            $scope.reloadScreen = false;
       }
     
});