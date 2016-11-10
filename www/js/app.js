// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).controller('PokeAppController', function($scope, $http){

  $scope.init = function(){
    $('#down').hide();
    $('.up').show();
    $('.loading').hide();
  }

  $scope.btnBack = function(){
    $('#down').fadeOut(150, function(){
        $('.up').fadeIn(150);
      });
  }

  $scope.getPokeInfo = function(){
    $('.loading').show();
    $scope.pokemon = "";
    $scope.url = 'https://pokeapi.co/api/v2/pokemon/'+($scope.name.toLowerCase());
    console.log($scope.url);
    $http.get($scope.url)
      .success(function(data, status, headers,config){
        $scope.pokemon = data; // for UI
        $('.loading').hide();
        $('.up').fadeOut(150, function(){
          $('#down').fadeIn(150);
        });
        $scope.name = '';
      })
      .error(function(data, status, headers,config){
        $('.loading').hide();
        alert('Nenhum pokemon encontrado');
        $scope.name = '';
      });
  }
})
