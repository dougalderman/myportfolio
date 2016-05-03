angular.module('myPortfolio')
.controller('mainCtrl', function ($scope, mainService) {
	
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
		grecaptcha.render($scope.currentRecaptchaId, 
		{
			'sitekey' : '6LdOOAsAAAAAAEtjbq6sch1VWiMoBnX4bw4dIKfz',
			'callback' : recaptchaCB,
			'expired-callback': recaptchaExpired
		});
		
		if ($scope.currentRecaptchaId === 'recaptcha-widget') { // only do once for parent div 
			var leftMargin = $('#' + $scope.currentRecaptchaId + ' div div').width() * -0.5;

			$('#' + $scope.currentRecaptchaId).css({'left': '50%', 'margin-left': leftMargin + 'px'});  // Set left of absolutely positioned element to 50%. Set margin left to -0.5 of width. This will center the element. 
		}
		
	}; 
	
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
	$scope.formSuccess = false;
	$scope.inRecaptcha = false;
	$scope.currentRecaptchaId = 'recaptcha-widget';

	     
     
    $scope.contactForm = function() {
        console.log('in contact form')
        console.log('$scope.contact', $scope.contact);
		/* if ($scope.formSuccess) { // if already successully submitted form
			console.log('multiple form submit');
			$scope.userMsg = 'Already successfully submitted form';
			return;
		} */
			
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