angular.module('myPortfolio', ['ui.router', 'ngAnimate'])
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
  			    templateUrl: 'html/aboutTmpl.html',
  			    url: '/about',
                controller: 'aboutCtrl'
        })
        .state('Resume', {
  			    templateUrl: 'html/resumeTmpl.html',
  			    url: '/resume'
        })
        .state('Contact', {
            templateUrl: 'html/contactTmpl.html',
            url: '/contact',
            controller: 'contactCtrl'
        });

});
