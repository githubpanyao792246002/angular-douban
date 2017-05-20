/**
 * Created by panyao on 2017/4/15.
 */
(function (angular) {
    var app=angular.module('moviecat.details',[
        'ngRoute',
        'moviecat.myjsonp']);
    app.config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/details/:id',{
            templateUrl:'details/view.html',
            controller:'detailsController'
        })
    }])
    app.controller('detailsController',['$scope','$routeParams','MyJsonp',
        function ($scope,$routeParams,MyJsonp) {
        // console.log(11);
        MyJsonp.jsonp('http://api.douban.com/v2/movie/subject/'+$routeParams.id,
            {},function (data) {
            $scope.movie=data;
            $scope.$apply();
        })
    }]);
})(angular)