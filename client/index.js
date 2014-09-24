(function(){
  'use strict';

  angular.module('mommy-business', ['ngRoute', 'LocalForageModule'])
  .config(['$routeProvider', '$httpProvider', '$localForageProvider', function($routeProvider, $httpProvider, $localForageProvider){
    $routeProvider
    .when('/', {templateUrl:'/views/home/home.html', controller:'HomeCtrl'})
    .when('/register', {templateUrl:'/views/register/register.html', controller:'RegisterCtrl'})
    .when('/login',    {templateUrl:'/views/login/login.html',       controller:'LoginCtrl'})
    .when('/logout',   {templateUrl:'/views/logout/logout.html',     controller:'LogoutCtrl'})
    .when('/children',   {templateUrl:'/views/children/children.html', controller:'ChildrenCtrl'})
    .when('/child/:childId',   {templateUrl:'/views/child/child.html',     controller:'ChildCtrl'})
    .otherwise({redirectTo:'/'});

    $httpProvider.interceptors.push('HttpInterceptor');
    $localForageProvider.config({name:'mommy-business', storeName:'cache', version:1.0});
  }]);
})();

