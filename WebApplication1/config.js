(function () {
    "use strict";
    angular.module('Cosmos').config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider
            .state('/', {
                url: '/',
                templateUrl: 'views/login.html'
            })
                .state('home', {
                    url: '/home',
                    templateUrl: 'views/home.html'
                })
            .state('home.admin', {
                url: '/admin',
                templateUrl: 'admin/admin.html'
            })
        }])
})();





