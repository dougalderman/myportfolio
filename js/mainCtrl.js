angular.module('myPortfolio')
.controller('mainCtrl', function ($scope) {
    
    $( document ).ready(function(){
        
   /*     $scope.hideSidenav = false;
        $scope.reloadScreen = false; */
        
        $('.button-collapse').sideNav();
        
    /*    $('.button-collapse').click(function(e) {
            
             $('.side-nav').show();
                    
        });
        
        $('.side-nav').click(function(e) {
            
            if( $(e.target).is('a') ) {
                 $(this).hide();
            }
         
        }); */
        
       /* $('.button-collapse').click(function() {
            $('#mobile-demo').show();
            $('.button-collapse').sideNav();
        });
            
        $('#mobile-demo a').click(function() {
            $('#mobile-demo').hide();
        }); */
        
       /*  $scope.clearSidenav = function(newState) {
            $scope.hideSidenav = true;
            $scope.reloadScreen = true;
        }
        
         $scope.showSidenav = function() {
            $('.button-collapse').sideNav();
            $scope.hideSidenav = false;
         } */
        
    })
    
});