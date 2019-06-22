app.controller('kurir-inCtrl', function ($scope,$uibModal, $rootScope, $state, $filter, api) {
    $scope.mdeDate = '';
    $scope.currentPage = 0;
    $scope.pageSizeNo = [{
        no: "10"
    }, {
        no: "50"
    }, {
        no: "250"
    }, {
        no: "500"
    }, {
        no: "1000"
    }];
    $scope.records=0;
    $scope.pageSize = "10";
    $scope.status = '';
    $scope.listKaryawan = '';
    $scope.mdeDate = window.dateNow;
    $scope.numberOfPages = function () {
        if ($scope.records > 0) {
            return Math.ceil($scope.records / $scope.pageSize);
        }else{
            return 0
        };
    };
    $scope.backPage = function () {
        $scope.currentPage = $scope.currentPage - 1;
        $scope.getList();
    }
    $scope.nextPage = function () {
        $scope.currentPage = $scope.currentPage + 1;
        $scope.getList();
    }
    $scope.changeRecords = function(){
        $scope.currentPage = 0;
        $scope.numberOfPages();
        $scope.getList();
    }
    $scope.init = function () {
        $scope.mdeDate = window.dateNow;
        $scope.mdeDateTo = window.dateNow;
        $('#mdeDate').val(window.dateNow);
        $('#mdeDateTo').val(window.dateNow);
        $scope.getList();
    }
    $scope.getList = function () {
        // loadingShow();
        var param = {
            xtoken: data._token,
            xphone: $scope.phone,
            xdateFrom: $('#mdeDate').val(),
            xdateTo :$('#mdeDateTo').val(),
            xpageSize: $scope.pageSize,
            xpageNumber: $scope.currentPage * $scope.pageSize
        }
        // api.GET('msun.trace/?', param, function (response) {
        //     $scope.listTrace = response.data;
        //     $scope.records = response.count
        //     loadingHide();
        // })
    }
});
        