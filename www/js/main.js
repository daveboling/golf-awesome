(function(){
  'use strict';
  var main = angular.module('nss-ball');

  main.controller('MainCtrl', ['$scope', '$interval', function($scope, $interval){
    $scope.title = 'NSS-Ball';
    $scope.data = {};
    $scope.results = '';
    $scope.clock = 30;

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
    dx2 = 13,
    dy2 = 13,
    activeGame,
    accel,
    ball = new Image(),
    hole = new Image(),
    course = new Image(),
    timer;

    ball.src = './img/assets/ball.png';
    hole.src = './img/assets/hole.png';
    course.src = './img/assets/grass.jpg';

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
      var options = {frequency: 12};
      accel = navigator.accelerometer.watchAcceleration(onAccelSuccess, onError, options);
    }

    function onAccelSuccess(data){
      $scope.data = data;
      dx += -data.x / 0.8;
      dy += data.y / 0.8;
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

      timer = $interval(updateTimer, 1000);

      activeGame = setInterval(draw, 16);
      return activeGame;

    }

    function draw(){
      clear(); //clear canvas on each pass and reanimate like Linkin Park.
      ctx.drawImage(course, 0, 0, WIDTH, HEIGHT);
      ctx.drawImage(hole, x2 - 30, y2 - 30, 60, 60);
      ctx.drawImage(ball, x - 20, y - 20, 30, 30);

      //bounds checking
      checkBallBounds();

      x = dx;
      y = dy;

      x2 += (Math.random() * 5) + dx2;
      y2 += (Math.random() * 5) + dy2;

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
      if(dx >= x2 - 20 && dx <= x2 + 20 && dy >= y2 - 20 && dy <=  y2 + 20){
        //stop the loop
        clearInterval(activeGame);
        $interval.cancel(timer);
        $scope.gameIsActive = false;
        $scope.isGameOver = true;
        $scope.results = 'You win!';
      }
    }

    function checkBallBounds(){
      if (dx > WIDTH - 20 || dx < 0){
        dx = x;
      }
      if (dy > HEIGHT - 20 ||dy < 0){
        dy = y;
      }
    }

    function checkHoleBounds(){
      if (x2 + dx2 > WIDTH - 25 || x2 + dx2 < 0){
        dx2 = -dx2;
      }
      if (y2 + dy2 > HEIGHT - 25 || y2 + dy2 < 0){
        dy2 = -dy2;
      }
    }

    function updateTimer(){
      $scope.clock--;
      if($scope.clock === 0){
        gameOverYouLose();
      }
    }

    function gameOverYouLose(){
      clearInterval(activeGame);
      $interval.cancel(timer);
      $scope.gameIsActive = false;
      $scope.isGameOver = true;
      $scope.results = 'You lose. Try again.';
    }

    //Angular functions
    $scope.startGame = function(){
      $scope.gameIsActive = true;
      $scope.isMenu = false;
      $scope.GameOver = false;

      init();
    };

    $scope.newGame = function(){
      //move back to 0 0
      x = 0;
      y = 0;
      dx = 5;
      dy = 5;

      //generate new random hole positon
      x2 = Math.random()*(WIDTH - 50);
      y2 = Math.random()*(HEIGHT - 50);
      dx2 = 13,
      dy2 = 13,

      $scope.clock = 30;
      $scope.startGame();
    }


  }]);
})();
