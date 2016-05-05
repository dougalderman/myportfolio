angular.module('myPortfolio')
.service('mainService', function( $http ) {
	
      
    this.writeContact = function(data) {
		return $http({
            method: 'POST',
            url: '/api/contacts',
            data: data
        });
    };
	
	this.verifyRecaptcha = function(data) {
		return $http({
            method: 'POST',
            url: '/api/recaptcha',
            data: data
        });
    };

	
	
    
});