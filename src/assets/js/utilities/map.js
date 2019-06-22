/* @ngInject */
app.controller('mapMarkerCtrl', function ($scope, NgMap, items) {
    var vm = this;
    $scope.init = function () {
        if(items !==null){
            $scope.center = items;
        }else{
            $scope.$dismiss();
            $.alert({
                title:"Alert!",
                content:'Lokasi tidak ditemukan,<br> latitude & longitude tidak tersedia!'
            });
        }
    }
    vm.types = "['address']";
    NgMap.getMap().then(function (map) {
        vm.map = map;
    });
    $scope.close = function () {
        $scope.$dismiss();
    };
    $scope.getCurrentLocation = function (event) {
        console.log(event.latLng.lat());
        console.log(event.latLng.lng());
    }
});