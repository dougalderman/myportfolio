angular.module('myPortfolio')
.controller('homeCtrl', function ($scope) {
     
 /*      if ($scope.reloadScreen) {
            location.reload();
            $scope.reloadScreen = false;
       }
*/
    
     $(document).ready(function(){
        $('.tooltipped').tooltip({delay: 50});
     });

});