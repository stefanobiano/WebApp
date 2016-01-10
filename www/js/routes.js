angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })

        
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'homeCtrl'
    })

        
    .state('tabsController.profilo', {
      url: '/profilo',
      views: {
        'tab1': {
          templateUrl: 'templates/profilo.html',
          controller: 'profiloCtrl'
        }
      }
    })
        
    .state('tabsController.cerca', {
      url: '/cerca',
      views: {
        'tab2': {
          templateUrl: 'templates/cerca.html',
          controller: 'cercaCtrl'
        }
      }
    })
        
    .state('tabsController.cloudTabDefaultPage', {
      url: '/page6',
      views: {
        'tab3': {
          templateUrl: 'templates/cloudTabDefaultPage.html',
          controller: 'cloudTabDefaultPageCtrl'
        }
      }
    })
      
    .state('tabsController', {
      url: '/page3',
      abstract:true,
      templateUrl: 'templates/tabsController.html'
    })

    .state('tabsControllerTrainer.profiloTrainer', {
      url: '/profiloTrainer',
      views: {
        'tab4': {
          templateUrl: 'templates/profiloTrainer.html',
          controller: 'profiloTrainerCtrl'
        }
      }
    })


    .state('tabsControllerTrainer.creaSchede', {
      url: '/creaSchede',
      views: {
        'tab5': {
          templateUrl: 'templates/creaSchede.html',
          controller: 'creaSchedeCtrl'
        }
      }
    })

    .state('tabsControllerTrainer', {
      url: '/tabsControllerTrainer',
      abstract:true,
      templateUrl: 'templates/tabsControllerTrainer.html'
    })
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});