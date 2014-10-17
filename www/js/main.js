(function(){
  'use strict';
  var main = angular.module('nss-ball');

  main.controller('MainCtrl', ['$scope', function($scope){
    $scope.title = 'NSS-Ball';
    $scope.data = {};

    $(document).ready(function(){
      var canvas,
      ctx,
      x = 0,
      y = 0,
      WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight,
      x2 = Math.random()*WIDTH,
      y2 = Math.random()*HEIGHT,
      dx = 5,
      dy = 5;


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
          if (canvas.getContext){
            ctx = canvas.getContext('2d');
            window.addEventListener('resize', resizeCanvas, true);
            window.addEventListener('orientationchange', resizeCanvas, true);
            resizeCanvas();
          }
        //ctx = canvas.getContext('2d');
        return setInterval(draw, 10);
      }

      window.addEventListener('deviceorientation', function(data){
        $scope.data = data;
        dx += data.gamma/5;
        dy += data.beta/5;
        $scope.$digest();
      });


      function draw(){
        clear();
        ctx.fillStyle = 'green';
        rect(0,0, WIDTH, HEIGHT);
        ctx.fillStyle = 'black';
        circle(x2, y2, 30, 30);
        ctx.fillStyle = 'white';
        circle(x, y, 10);

        if (dx > WIDTH || dx < 0){
          dx = x;
        }
        if (dy > HEIGHT ||dy < 0){
          dy = y;
        }

        x = dx;
        y= dy;

        if( dx >= x2 - 30 && dx <= x2 + 30 && dy >= y2 -30 && dy <=  y2 + 30) {
          console.log('you win!');
        }

      }

      function resizeCanvas(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      console.log('width>>>>>>>>>>>>', WIDTH);
      console.log('height>>>>>>>>>>>>', HEIGHT);


      init();

    });

  }]);
})();
