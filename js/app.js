angular.module('myPortfolio', ['ui.router', 'zumba.angular-waypoints'])
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
  			    url: '/#projects',
                controller: 'projectsCtrl'
        })
        .state('About', {
  			    templateUrl: 'html/homeTmpl.html',
  			    url: '/#about',
                controller: 'aboutCtrl'
        })
        .state('Contact', {
            templateUrl: 'html/homeTmpl.html',
            url: '/#contact',
            controller: 'contactCtrl'
        });

});
