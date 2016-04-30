angular.module('myPortfolio')
.controller('mainCtrl', function ($scope, mainService) {
	
	$(document).ready(function() {

		$.localScroll();
		
		var leftMargin = $('.pic_text h1.line_one').width() * -0.5;
		
		$('.pic_text h1.line_one').css({'left': '50%', 'margin-left': leftMargin + 'px'});  // Set left of absolutely positioned element to 50%. Set margin left to -0.5 of width. This will center the element. 
		
		leftMargin = $('.pic_text h1.line_two').width() * -0.5;
		
		$('.pic_text h1.line_two').css({'left': '50%', 'margin-left': leftMargin + 'px'});  // Set left of absolutely positioned element to 50%. Set margin left to -0.5 of width. This will center the element. 

	});
	
	$scope.contact = {};
	$scope.userMsg = '';
    $scope.emailMatchError = false;
     
     
    $scope.contactForm = function() {
        console.log('in contact form')
        console.log('$scope.contact', $scope.contact);
        if ($scope.contact.email === $scope.contact.emailAgain) {
            $scope.emailMatchError = false;
            mainService.writeContact($scope.contact); // do http POST request to server
			$scope.contact = {};
			$scope.userMsg = 'Message successfully sent'
        }
        else {
            $scope.emailMatchError = true;
			$scope.userMsg = 'There was a problem with this form'
        }
    }  
});