(function(){
  'use strict';
  var main = angular.module('nss-ball');

  main.controller('MainCtrl', ['$scope', function($scope){
    $scope.title = 'NSS-Ball';
    $scope.data = {};

    $(document).ready(function(){
      var canvas,
      ctx,
      x = 20,
      y = 20,
      dx = 1,
      dy = 1,
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

      function hole(x,y,w,h){
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
        dx += data.gamma / 2;
        dy += data.beta / 2;
        $scope.$digest();
      });


      function draw(){
        clear();
        ctx.fillStyle = 'green';
        rect(0,0,WIDTH,HEIGHT);
        ctx.fillStyle = 'black';
        hole(50, 50, 100, 100);
        ctx.fillStyle = 'white';
        circle(x, y, 10);

        if (dx > WIDTH || dx < 0){
          dx = x;
        }
        if (dy > HEIGHT || dy < 0){
          dy = y;
        }

        y = dy;
        x = dx;
      }

      function resizeCanvas(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      init();

    });



  }]);
})();



