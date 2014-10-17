(function(){
  'use strict';
  var main = angular.module('nss-ball');

  main.controller('MainCtrl', ['$scope', function($scope){
    $scope.title = 'NSS-Ball';

    $(document).ready(function(){
      var canvas,
      ctx,
      x = 0,
      y = 0,
      dx = 1,
      dy = 10,
      WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;

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
        ctx = canvas.getContext('2d');
        return setInterval(draw, 10);
      }


      function draw(){
        clear();
        ctx.fillStyle = '#FAF7F8';
        rect(0,0,WIDTH,HEIGHT);
        ctx.fillStyle = '#444444';
        circle(x, y, 10);

        if (x + dx > WIDTH || x + dx < 0){
          dx = -dx;
        }
        if (y + dy > HEIGHT || y + dy < 0){
          dy = -dy;
        }

        x += dx;
        y += dy;
      }

      function resizeCanvas(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      init();

    });



  }]);
})();



