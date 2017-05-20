(function (angular) {
    // "use strict";

    // start your ride
   // 1.创建一个主模块
   var app = angular.module('moviecat',[
       'moviecat.details',//先引入 先匹配相应的路由规则
    'moviecat.home_page',
    'moviecat.movie_list',
       'moviecat.auto-active'



    ]);

   app.controller('mainController',['$scope','$location',
       function($scope,$location){
       $scope.query='';
       $scope.search=function () {
           $location.url('/search/?q='+$scope.query);
       }
   }]);
})(angular);