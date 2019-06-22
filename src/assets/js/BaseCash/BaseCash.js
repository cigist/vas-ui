app.controller('baseCashCtrl', function ($http,$scope,$uibModal, $rootScope, $state, $filter, api) {
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
        $scope.trx="POD01";
        $scope.mdeDate = window.dateNow;
        $('#mdeDate').val(window.dateNow);
        $scope.getList();
    }
    $scope.getList = function () {
        loadingShow();
        var param = {
            xtoken: data._token,
            xphone: $scope.phone,
            xdate :$('#mdeDate').val(),
            xaktifitas:$scope.trx,
            xidasp:getCookie("_ASPID"),
            xrecords: $scope.pageSize,
            xpageNumber: $scope.currentPage * $scope.pageSize
        }
        api.doPost('space.spcnactabc', param, function (response) {
            $scope.listData = response.LIST_TRACKING_HEADER;
            $scope.debit = response.TOTAL_DB;
            $scope.kredit = response.TOTAL_CR;
            $scope.records = response.RECORDS
            loadingHide();
        })
    }
    $scope.printToExcel = function () {
        var data = [];
        if ($scope.listData> 0) {
            for (var d = 0; d < $scope.listData; d++) {
                var vdata = {
                    NO:d+1,
                    TANGGAL:$scope.listData[d].TANGGAL,
                    JAM: $scope.listData[d].JAM,
                    STATUS: $scope.listData[d].KODE_STATUS,
                    NAMA_KARYAWAN: $scope.listData[d].KARYAWAN,
                    TRANSAKSI: $scope.listData[d].NAMA_TRANSAKSI,
                    NAMA_BIAYA:$scope.listData[d].NAMA_BIAYA,
                    PCS:$scope.listData[d].PCS,
                    NO_TRX:$scope.listData[d].NO_TRX,
                    BERAT:$scope.listData[d].BERAT,
                    SKALA:$scope.listData[d].SKALA,
                    TARIF:$scope.listData[d].TARIF,
                    TOTAL:$scope.listData[d].TOTAL
                };
                data.push(vdata);
            }
        }
        try {
            json2excel({
                data,
                name: 'ABC'+ $filter('date')(new Date(), 'ddMMyyyy')+$filter('date')(new Date(), 'hhmmss'),
                formateDate: 'yyyy/mm/dd'
            });
            loadingHide();
        } catch (e) {
            loadingHide();
            console.error('export error');
        }
    }
});
        