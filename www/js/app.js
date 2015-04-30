// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase' , 'socialAuth.services'])

.run(function($ionicPlatform, $state, $rootScope, userSession) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    //Establezco la pantalla inicio para que empiece en ella
    $state.go('login');

    $rootScope.$on('$firebaseSimpleLogin:login', function(event, user) {
       userSession.user=user;
       $state.go('home.tareas');
    });

    $rootScope.$on('$firebaseSimpleLogin:error', function(event, error) {
       console.log('Error logging user in: ', error);
    });

    $rootScope.$on('$firebaseSimpleLogin:logout', function(event) {
       $state.go('login');
    });


  });
})

.config(function($stateProvider, $urlRouterProvider) {


  //Configuro los distintos escenarios de la aplicacion
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })



  // Establezco un escenario abstracto para albergar las pestañas
  .state('home', {
    url: "/home",
    abstract: true,
    templateUrl: "templates/home.html"
  })


  .state('home.tareas', {
    url: '/tareas',
    views: {
      'home-tareas': {
        templateUrl: 'templates/home-tareas.html',
        controller: 'TareasCtrl'
      }
    }
  })

  .state('home.video', {
      url: '/video',
      views: {
        'home-video': {
          templateUrl: 'templates/home-video.html',
          controller: 'VideoCtrl'
        }
      }
  })

  .state('home.comentarios', {
    url: '/comentarios',
    views: {
      'home-comentarios': {
        templateUrl: 'templates/home-comentarios.html',
        controller: 'ComentariosCtrl'
      }
    }
  });



});


