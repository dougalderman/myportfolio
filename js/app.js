angular.module('myPortfolio', ['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {

    // routing configuration code

    $urlRouterProvider
      .otherwise('/');

      $stateProvider
  	    .state('Home', {
  			    templateUrl: 'html/homeTmpl.html',
  			    url: '/',
                controller: 'homeCtrl'
  		})
        .state('Projects', {
  			    templateUrl: 'html/homeTmpl.html',
  			    url: '/',
                controller: 'projectsCtrl'
        })
        .state('About', {
  			    templateUrl: 'html/homeTmpl.html',
  			    url: '/',
                controller: 'aboutCtrl'
        })
        .state('Contact', {
            templateUrl: 'html/homeTmpl.html',
            url: '/',
            controller: 'contactCtrl'
        });

});
