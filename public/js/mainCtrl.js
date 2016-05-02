angular.module('myPortfolio')
.controller('mainCtrl', function ($scope, mainService) {
	
	var recaptchaExpired = function() {
		grecaptcha.reset();
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
					grecaptcha.reset();
					$scope.inRecaptcha = false;  // no longer in recaptcha
					mainService.writeContact($scope.contact) // do http POST request to server
					.then(function(resp) {
						console.log('in writeContact valid response');
						console.log('resp = ', resp);
						if (resp.status === 200) { // Good status code
							$scope.contact = {};
							$scope.formSuccess = true;
							$scope.userMsg = 'Message successfully sent'; 
						}
						else { // Bad status
							$scope.formSuccess = false;
							$scope.userMsg = 'There was a problem sending the message.'; 
						}
					}, function(er) {
						console.log('in writeContact error')
						console.error('er = ', er);
						$scope.formSuccess = false;
						$scope.userMsg = 'There was a problem sending the message.'; 
					});
				} 
				else { // !response.data.formSubmit
					$scope.formSuccess = false;
					grecaptcha.reset();
					$scope.userMsg = 'There was a problem verifying you are not a robot.'; 
				}
			}
			else { // not good status code (for verifyRecaptcha)
				$scope.formSuccess = false;
				grecaptcha.reset();
				$scope.userMsg = 'There was a problem verifying you are not a robot.'; 
			}
		}, function(err) {
			console.log('in verifyRecaptcha error')
			console.error('err = ', err);
			grecaptcha.reset();
			$scope.userMsg = 'There was a problem verifying you are not a robot.'; 
        });
	}
	
	var onLoadCallback = function() {
		grecaptcha.render('recaptcha-widget', 
		{
			'sitekey' : '6LdOOAsAAAAAAEtjbq6sch1VWiMoBnX4bw4dIKfz',
			'callback' : recaptchaCB,
			'expired-callback': recaptchaExpired
		});
		
		var leftMargin = $('#recaptcha-widget div div').width() * -0.5;
		
		$('#recaptcha-widget').css({'left': '50%', 'margin-left': leftMargin + 'px'});  // Set left of absolutely positioned element to 50%. Set margin left to -0.5 of width. This will center the element. 
		
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
     
     
    $scope.contactForm = function() {
        console.log('in contact form')
        console.log('$scope.contact', $scope.contact);
        if ($scope.contact.email === $scope.contact.emailAgain) {
			$scope.userMsg = '';
			$scope.inRecaptcha = true;
            $scope.emailMatchError = false;
			$scope.formSuccess = false;
			$scope.userMsg = 'Please confirm you are not a robot'; 
			onLoadCallback(); // Call recaptcha
		}
        else {
            $scope.emailMatchError = true;
			$scope.formSuccess = false;
			$scope.userMsg = 'There was a problem with this form';
		}
    }  
});