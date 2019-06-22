app.controller('trackCtrl', function ($scope,$stateParams,api) {
    $scope.listData = '';
    $scope.init = function () {
        $scope.nokiriman=$stateParams.resi;
        $scope.getList();
    }
    $scope.getList = function () {
        loadingShow();
        var param = {
            xtoken: data._token,
            xnokiriman: $scope.nokiriman
        }
        api.ngPost('myexweb.extrackresi?', param, function (response) {
            if(response.STATUS ==='OK'){
                $scope.listData = response.DATA;
            }else{
                $.alert({
                    title: 'Alert!',
                    content: response.ERROR,
                });
            }
            loadingHide();
        })
    }
});