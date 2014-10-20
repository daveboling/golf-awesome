(function(){
  'use strict';
  var main = angular.module('nss-ball');

  main.controller('MainCtrl', ['$scope', '$interval', function($scope, $interval){
    $scope.title = 'NSS-Ball';
    $scope.data = {};
    $scope.results = '';

    //Angular style game states
    $scope.gameIsActive = false;
    $scope.isGameOver = false;
    $scope.isMenu = true;

    var canvas,
    ctx,
    x = 5,
    y = 5,
    WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    x2 = Math.random()*(WIDTH - 20),
    y2 = Math.random()*(HEIGHT - 20),
    dx = 5,
    dy = 5,
    dx2 = 3,
    dy2 = 3,
    activeGame,
    accel,
    ball = new Image(),
    hole = new Image(),
    course = new Image();

    ball.src = '../img/assets/ball.png';
    hole.src = '../img/assets/hole.png';
    course.src = '../img/assets/grass.jpg';

    function circle(x,y,r){
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI*2, true);
      ctx.fill();
    }

    function rect(x,y,w,h){
      ctx.beginPath();
      ctx.rect(x,y,w,h);
      ctx.closePath();
      ctx.fill();
    }

    function clear(){
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }

    document.addEventListener('deviceready', onDeviceReady, false);

    function onDeviceReady(){
      getAcceleration();
    }

    function getAcceleration(){
      var options = {frequency: 10};
      accel = navigator.accelerometer.watchAcceleration(onAccelSuccess, onError, options);
    }

    function onAccelSuccess(data){
      $scope.data = data;
      dx += -data.x / 2;
      dy += data.y / 2;
      $scope.$digest();
    }

    function onError(){
      console.log('it failed');
    }

    function init(){
      canvas = document.getElementById('canvas');

      //dynamic checking of window sizing for all devices (well, almost all)
        if (canvas.getContext){
          ctx = canvas.getContext('2d');
          window.addEventListener('resize', resizeCanvas, true);
          window.addEventListener('orientationchange', resizeCanvas, true);
          resizeCanvas();
        }

      activeGame = setInterval(draw, 10);
      return activeGame;
    }

    function draw(){
      clear(); //clear canvas on each pass and reanimate like Linkin Park.
      //ctx.fillStyle = 'green';
      ctx.drawImage(course, 0, 0, WIDTH, HEIGHT);
      //ctx.fillStyle = 'black';
      //circle(x2, y2, 20);
      ctx.drawImage(hole, x2, y2, 60, 60);
      //ctx.fillStyle = 'white';
      //circle(x, y, 10);
      ctx.drawImage(ball, x, y, 30, 30);

      //bounds checking
      checkBallBounds();

      x = dx;
      y = dy;

      x2 += dx2;
      y2 += dy2;

      //game logic
      //check if ball has touched a zombie or the hole
      checkBallPosition();
      checkHoleBounds();

    }

    function resizeCanvas(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function checkBallPosition(){
      //hole check
      if(dx >= x2 - 10 && dx <= x2 + 10 && dy >= y2 -10 && dy <=  y2 + 10){
        //stop the loop
        clearInterval(activeGame);
        $scope.gameIsActive = false;
        $scope.isGameOver = true;
        $scope.results = 'You win!';
        $scope.$digest();
      }
    }

    function checkBallBounds(){
      if (x2 + dx > WIDTH || x2 + dx < 0){
        dx = x;
      }
      if (dy > HEIGHT ||dy < 0){
        dy = y;
      }
    }

    function checkHoleBounds(){
      if (x2 + dx2 > WIDTH || x2 + dx2 < 0){
        dx2 = -dx2;
      }
      if (y2 + dy2 > HEIGHT || y2 + dy2 < 0){
        dy2 = -dy2;
      }
    }

    //Angular functions
    $scope.startGame = function(){
      $scope.gameIsActive = true;
      $scope.isMenu = false;

      init();
    };


  }]);
})();
