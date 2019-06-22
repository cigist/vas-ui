var app = angular.module('vas', ['ngMaterial','ui.bootstrap', 'ui.router','angularjs-dropdown-multiselect','ngMap', 'ngMessages','ngTable','FBAngular'])
/* @ngInject */
app.config(function ($stateProvider, $urlRouterProvider,$compileProvider,$locationProvider) {
    $compileProvider.debugInfoEnabled(true);
    $urlRouterProvider.otherwise("/");
    $locationProvider.hashPrefix('');
    $stateProvider
        .state('/', {
           url: '/',
           templateUrl: 'pages/main/dashboard.html'
        });
});
