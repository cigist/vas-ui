app.controller('karyawanAddCtrl', function ($scope,$state, $filter, api) {
    $scope.close = function() {
        $state.go('karyawan');
    };
});