angular.module('myPortfolio')
.controller('contactCtrl', function ($scope) {
    
    $scope.contact = {};
    $scope.emailMatchError = false;
     
  /*  if ($scope.reloadScreen) {
            location.reload();
            $scope.reloadScreen = false;
    } */
    
    $scope.contactForm = function() {
        console.log('in contact form')
        console.log('$scope.contact', $scope.contact);
        if ($scope.contact.email === $scope.contact.emailAgain) {
            $scope.emailMatchError = false;
            // process form
        }
        else {
            $scope.emailMatchError = true;
        }
    }
        
});