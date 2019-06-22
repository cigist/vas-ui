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
        })
        .state('karyawan', {
            url: '/karyawan/',
            templateUrl: 'pages/karyawan/karyawan.html'
        })
        .state('karyawanAdd', {
            url: '/karyawan/add',
            templateUrl: 'pages/karyawan/karyawanAdd.html'
        })
        .state('karyawanEdit', {
            url: '/karyawan/update?id',
            templateUrl: 'pages/karyawan/karyawanAdd.html'
        })
        .state('salesPartner', {
            url: '/salespartner/',
            templateUrl: 'pages/SalesPartner/SalesPartner.html'
        })
        .state('kendaraan', {
            url: '/kendaraan/',
            templateUrl: 'pages/Kendaraan/Kendaraan.html'
        })
        .state('kendaraanAdd', {
            url: '/kendaraan/add',
            templateUrl: 'pages/KendaraanAdd/KendaraanAdd.html'
        })
        .state('rute', {
            url: '/rute/',
            templateUrl: 'pages/RuteKurir/RuteKurir.html'
        })
        .state('ruteAdd', {
            url: '/rute/add',
            templateUrl: 'pages/RuteKurir/RuteKurirAdd.html'
        })
        .state('gaji', {
            url: '/gaji/',
            templateUrl: 'pages/Gaji/Gaji.html'
        })
        .state('kurir', {
            url: '/kurir/',
            templateUrl: 'pages/Kurir/KurirPerformance.html'
        })
        .state('stock', {
            url: '/stock/',
            templateUrl: 'pages/StockOpname/StockOpname.html'
        })
        .state('penjualan', {
            url: '/penjualan/',
            templateUrl: 'pages/PenjualanPartner/PenjualanPartner.html'
        })
        .state('absensi', {
            url: '/absensi/',
            templateUrl: 'pages/Absensi/Absensi.html'
        })
        .state('kas', {
            url: '/kas/',
            templateUrl: 'pages/Kas/KasKaryawan.html'
        })
        .state('abc', {
            url: '/abc/',
            templateUrl: 'pages/abc/activity.html'
        })
        .state('kurir-in', {
            url:'/kurir-in',
            templateUrl: 'pages/Kurir-in/Kurir-in.html'
        })
        .state('linehaul', {
            url:'/linehaul',
            templateUrl: 'pages/Linehaul/Linehaul.html'
        })
        .state('delivery', {
            url:'/delivery' ,
            templateUrl: 'pages/delivery/delivery.html'
        })
        .state('comdel', {
            url:'/comdel',
            templateUrl: 'pages/comdel/comdel.html'
        })
        .state('onroad', {
            url: '/onroad/',
            templateUrl: 'pages/onroad/onroad.html'
        })
        .state('onroadDetail', {
            url: '/onroad/detail',
            templateUrl: 'pages/onroad/onroadDetail.html'
        })
        .state('nodel', {
            url: '/nodel/',
            templateUrl: 'pages/nodel/nodel.html'
        })
        .state('nodelDetail', {
            url: '/nodel/detail',
            templateUrl: 'pages/nodel/nodelDetail.html'
        })
        .state('track', {
            url: '/onroad/track?resi',
            templateUrl: 'pages/onroad/track.html'
        })
        .state('statusrute', {
            url:'/statusrute',
            templateUrl:'pages/statusrute/statusrute.html'
        })
});
