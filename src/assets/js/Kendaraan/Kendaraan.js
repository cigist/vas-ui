app.controller('kendaraanCtrl', function ($scope,$state, $filter, api) {
    $scope.close = function() {
        $state.go('kendaraan');
    };
});
