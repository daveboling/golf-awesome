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

    //$(document).ready(function(){
      var canvas,
      ctx,
      x = 0,
      y = 0,
      WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight,
      x2 = Math.random()*WIDTH,
      y2 = Math.random()*HEIGHT,
      dx = 5,
      dy = 5,
      activeGame;


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

      function init(){
        canvas = document.getElementById('canvas');

        //dynamic checking of window sizing for all devices (well, almost all)
          if (canvas.getContext){
            ctx = canvas.getContext('2d');
            window.addEventListener('resize', resizeCanvas, true);
            window.addEventListener('orientationchange', resizeCanvas, true);
            resizeCanvas();
          }

        activeGame = $interval(draw, 16);
        return activeGame;
      }

      window.addEventListener('deviceorientation', function(data){
        $scope.data = data;

        //Ball speed
        dx += data.gamma/2;
        dy += data.beta/2;

        $scope.$digest(); //update variables for Angular
      });


      function draw(){
        clear(); //clear canvas on each pass and reanimate like Linkin Park.
        ctx.fillStyle = 'green';
        rect(0,0, WIDTH, HEIGHT);
        ctx.fillStyle = 'black';
        circle(x2, y2, 30, 30);
        ctx.fillStyle = 'white';
        circle(x, y, 10);

        //bounds checking
        checkBallBounds();

        x = dx;
        y = dy;

        //game logic
        //check if ball has touched a zombie or the hole
        checkBallPosition();

      }

      function resizeCanvas(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      function checkBallPosition(){
        //hole check
        if(dx >= x2 - 30 && dx <= x2 + 30 && dy >= y2 -30 && dy <=  y2 + 30){
          //stop the loop
          $interval.cancel(activeGame);
          $scope.gameIsActive = false;
          $scope.isGameOver = true;
          $scope.results = 'You win!';
          $scope.$digest();
        }
      }

      function checkBallBounds(){
        if (dx > WIDTH || dx < 0){
          dx = x;
        }
        if (dy > HEIGHT ||dy < 0){
          dy = y;
        }
      }

      //Angular functions
      $scope.startGame = function(){
        $scope.gameIsActive = true;
        $scope.isMenu = false;

        init();
      };


    //});

  }]);
})();
