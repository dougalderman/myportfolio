angular.module('myPortfolio')
.controller('mainCtrl', function ($scope) {
	
	$(document).ready(function() {

		/* $("ul li a").click(function(){
			return false;  // prevent hash from showing in address bar	
		}); */
		
		$.localScroll();

	});
	
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