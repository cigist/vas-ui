app.controller('ruteKurirAddCtrl', function ($scope,$state, $filter, api) {
    $scope.close = function() {
        $state.go('rute');
    };
});