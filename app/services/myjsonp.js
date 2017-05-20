/**
 * Created by panyao on 2017/4/14.
 */
(function (angular) {
    var app=angular.module('moviecat.myjsonp',[]);
    app.service('MyJsonp',['$window',function ($window) {
        this.jsonp= function crossDomain(url,arg,fn){
            var queryString='';
            for(var key in arg){
                queryString+=key+'='+arg[key]+'&'
            }
            url+='?'+queryString;
            var callbackName="jsonp_"+Math.random().toString().substr(2);
            $window[callbackName]=function(data){
                fn(data);
            }
            url+='callback='+callbackName;

            var scriptElement=$window.document.createElement('script');
            scriptElement.src=url;
            $window.document.body.appendChild(scriptElement);
        }
    }])
})(angular)