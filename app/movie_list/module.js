(function(angular){
// 创建正在热模块
 var app = angular.module('moviecat.movie_list',['ngRoute',
 'moviecat.myjsonp']);

 // 配置路由
 app.config(['$routeProvider',function($routeProvider){
     $routeProvider.when('/:movieType/:page?',{
        templateUrl:'movie_list/view.html',
        controller:'movie_listController'
     });
 }]);

 // 创建控制器
 app.controller('movie_listController',[
    '$scope','$http','$routeParams','$route','MyJsonp',
     function($scope,$http,$routeParams,$route,MyJsonp){
        console.log($routeParams);
      // $http.get('/code/moviecat/app/movie_list/movie_list.json').then(function(res){
      //       console.log(res);
      //       $scope.data=res.data;
      //
      // },function () {
      //
      // })
        // console.log(MyJsonp);
         $scope.loading=true;
         $scope.pageSize=5;
         $scope.nowPage=($routeParams.page||'1')-0;
           var start=($scope.nowPage-1)*$scope.pageSize;
         MyJsonp.jsonp('http://api.douban.com/v2/movie/'+$routeParams.movieType+'?q='+$routeParams.q,
             {start:start,count:$scope.pageSize},function (data) {
             //angular不能够监视异步操作中对数据模型的改变

             $scope.data=data;
             $scope.total=data.total;
             $scope.totalPage=Math.ceil(data.total/$scope.pageSize);
             $scope.loading=false;
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

