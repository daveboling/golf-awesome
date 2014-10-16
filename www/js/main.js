(function(){
  'use strict';
  var main = angular.module('nss-ball');

  main.controller('MainCtrl', ['$scope', function($scope){
    $scope.title = 'NSS-Ball';
    $scope.gameStarted = false;
    function onSuccess(speed){
      var x = speed.x * 50,
          y = speed.y * 5;
      //console.log((speed.y * 100), (speed.x * 100), (speed.z * 100));
      if(x < 0 || x > 100){
        x = 0;
      }else if(y < 0 || y > 100){
        y = 0;
      }
      $scope.x = x;
      $scope.y = y;
      $('.ball').css('margin-left', x + '%');
      $('.ball').css('margin-top', y + '%');
    }

    function onError(){
        alert('onError!');
    }

    $scope.start = function(){
      $scope.gameStarted = true;
      var options = {frequency: 10};
      navigator.gyroscope.watchAngularSpeed(onSuccess, onError, options);
    };


  }]);
})();
