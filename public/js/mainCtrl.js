angular.module('myPortfolio')
.controller('mainCtrl', function ($scope, mainService, RECAPTCHA_SITEKEY) {
	
	var resetCaptcha = function() {
		var newId = 0;
		var len = $scope.currentRecaptchaId.length;
		var idNum = $scope.currentRecaptchaId.charAt(len - 1); // return last character
		if ($.isNumeric(idNum)) { // if number
			idNum++;
			newId = $scope.currentRecaptchaId.slice(0, len - 1) + idNum;
		}
		else {
			idNum = 1;
			newId = $scope.currentRecaptchaId + idNum;
		}
		
		// Code alternative to error-producing grecaptcha.reset();
		// Need to append new element because recaptcha code will check if element has been used before for recaptcha.
		$('#' + $scope.currentRecaptchaId).empty(); // empty widget
		$('#' + $scope.currentRecaptchaId).append('<div id="' + newId + '"></div>'); // set id to newId
		
		$scope.currentRecaptchaId = newId; // update currentRecaptchaId

	};
	
	var recaptchaExpired = function() {
		resetCaptcha();
	};
		
	var recaptchaCB = function(recaptchaResponse) {
		console.log('in recaptchaCB');
		mainService.verifyRecaptcha({
			'g-recaptcha-response': recaptchaResponse
		})
		.then(function(response) {
			console.log('in verifyRecaptcha valid response');
			console.log('response = ', response);
			if (response.status === 200) { // Good status code
				if (response.data.formSubmit) { // if valid response
					mainService.writeContact($scope.contact) // do http POST request to server
					.then(function(resp) {
						console.log('in writeContact valid response');
						console.log('resp = ', resp);
						$scope.inRecaptcha = false;  // no longer in recaptcha
						resetCaptcha();
						if (resp.status === 200) { // Good status code
							$scope.contact = {};
							$scope.formSuccess = true;
							$scope.userMsg = 'Message successfully sent'; 
						}
						else { // Bad status
							$scope.formSuccess = false;
							$scope.userMsg = 'Problem sending the message.'; 
						}
					}, function(er) {
						console.log('in writeContact error')
						console.error('er = ', er);
						$scope.inRecaptcha = false;  // no longer in recaptcha
						resetCaptcha();
						$scope.formSuccess = false;
						$scope.userMsg = 'Problem sending the message.'; 
					});
				} 
				else { // !response.data.formSubmit
					$scope.formSuccess = false;
					$scope.inRecaptcha = false;  // no longer in recaptcha
					resetCaptcha();
					$scope.userMsg = 'Problem verifying you\'re not a robot.'; 
				}
			}
			else { // not good status code (for verifyRecaptcha)
				$scope.inRecaptcha = false;  // no longer in recaptcha
				$scope.formSuccess = false;
				resetCaptcha();	
				$scope.userMsg = 'Problem verifying you\'re not a robot.'; 
			}
		}, function(err) {
			$scope.formSuccess = false;
			$scope.inRecaptcha = false;  // no longer in recaptcha
			console.log('in verifyRecaptcha error')
			console.error('err = ', err);
			resetCaptcha();
			$scope.userMsg = 'Problem verifying you\'re not a robot.'; 
        });
	}
	
	var onLoadCallback = function() {
		console.log('in onLoadCallback');
		grecaptcha.render($scope.currentRecaptchaId, 
		{
			'sitekey' : RECAPTCHA_SITEKEY,
			'callback' : recaptchaCB,
			'expired-callback': recaptchaExpired
		});
		
		if ($scope.currentRecaptchaId === 'recaptcha-widget') { // only do once for parent div 
          
            var leftMargin = $('#' + $scope.currentRecaptchaId + ' div').width() * -0.5;

			$('#' + $scope.currentRecaptchaId).css({'left': '50%', 'margin-left': leftMargin + 'px'});  // Set left of absolutely positioned element to 50%. Set margin left to -0.5 of width. This will center the element. 
        }
		
	}; 
	
	$(document).ready(function() {
		
		$.localScroll();
	
	});
	
	$scope.contact = {};
	$scope.userMsg = '';
    $scope.emailMatchError = false;
	$scope.formSuccess = false;
	$scope.inRecaptcha = false;
	$scope.currentRecaptchaId = 'recaptcha-widget';
	$scope.mobileNavbarSelected = false;
    $scope.myInterval = 4000;
    $scope.active = 0;
    $scope.noWrapSlides = false;
    $scope.pictureQuizSlides = [
      {image: 'images/Picture_Quiz_Home_Screen.jpg',
        id: 0},
      {image: 'images/Picture_Quiz_Picture_Question_TF.jpg',
        id: 1},
      {image: 'images/Picture_Quiz_Picture_Answer.jpg', 
        id: 2},
      {image: 'images/Picture_Quiz_Picture_Question_MC.jpg',
        id: 3},
      {image: 'images/Picture_Quiz_Results_Screen.jpg', 
        id: 4}
    ]
	
	$scope.activateMobileNavbar = function() {
		if ($scope.mobileNavbarSelected === false)
			$scope.mobileNavbarSelected = true;
		else // if Navbar is already active
			$scope.mobileNavbarSelected = false;
	}
	
	$scope.deactivateMobileNavbar = function() {
		$scope.mobileNavbarSelected = false;
	}

	     
     
    $scope.contactForm = function() {
        console.log('in contact form')
        console.log('$scope.contact', $scope.contact);
					
        if ($scope.contact.email === $scope.contact.emailAgain) {
			$scope.userMsg = '';
			$scope.inRecaptcha = true;
		    $scope.emailMatchError = false;
			$scope.formSuccess = false;
			$scope.userMsg = 'Please confirm that you\'re not a robot'; 
			onLoadCallback(); // Call recaptcha
		}
        else {
            $scope.emailMatchError = true;
			$scope.formSuccess = false;
			$scope.userMsg = 'There was a problem with this form';
		}
    }
});