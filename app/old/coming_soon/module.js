(function(angular){
// 创建正在热模块
 var app = angular.module('moviecat.coming_soon',['ngRoute',
 'moviecat.myjsonp']);

 // 配置路由
 app.config(['$routeProvider',function($routeProvider){
     $routeProvider.when('/coming_soon/:page?',{
        templateUrl:'coming_soon/view.html',
        controller:'coming_soonController'
     });
 }]);

 // 创建控制器
 app.controller('coming_soonController',[
    '$scope','$http','$routeParams','$route','MyJsonp',
     function($scope,$http,$routeParams,$route,MyJsonp){
        console.log($routeParams);
      // $http.get('/code/moviecat/app/coming_soon/coming_soon.json').then(function(res){
      //       console.log(res);
      //       $scope.data=res.data;
      //
      // },function () {
      //
      // })
        // console.log(MyJsonp);
         $scope.pageSize=5;
         $scope.nowPage=($routeParams.page||'1')-0;
           var start=($scope.nowPage-1)*$scope.pageSize;
         MyJsonp.jsonp('http://api.douban.com/v2/movie/coming_soon',
             {start:start,count:$scope.pageSize},function (data) {
             //angular不能够监视异步操作中对数据模型的改变

             $scope.data=data;
             $scope.total=data.total;
             $scope.totalPage=Math.ceil(data.total/$scope.pageSize);
             $scope.$apply();//在改变数据模型之后调用,强制angular监视数据模型的改变
         });
         $scope.goPage=function (newPage) {
             if(newPage<1||newPage>$scope.totalPage){
                 return;
             }
             $route.updateParams({page:newPage})
         }
 }]);

})(angular)

