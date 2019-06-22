app.controller('onroadDetailControlCtrl', function ($scope, $state, $rootScope, $filter, api) {
    $scope.detail =  $rootScope.onroadData ;
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
    $scope.pageSize = "50";
    $scope.status = '';
    $scope.listMde = '';
    $scope.numberOfPages = function () {
        if ($scope.records !== 0) {
            return Math.ceil($scope.records / $scope.pageSize);
        };
    };
    $scope.backPage = function () {
        if($scope.currentPage !==0){
         $scope.currentPage = $scope.currentPage - 1;
         $scope.getList();
        }
     }
     $scope.nextPage = function () {
         if($scope.numberOfPages() > $scope.currentPage + 1){
             $scope.currentPage = $scope.currentPage + 1;
             $scope.getList();
         }      
     }
     $scope.changeRecords = function () {
        $scope.currentPage = 0;
        $scope.getList();
    }
    $scope.init = function () {
        $scope.mdeDate = $rootScope.dateMde;
        $('#mdeDate').val($scope.mdeDate);
        if ($scope.detail !== undefined) {
            $scope.nama = $scope.detail.kurir;
            $scope.phone = $scope.detail.phone;
            $scope.idAsp = $scope.detail.idAsp;
            $scope.kurir = $scope.detail.idKurir;
            $scope.getList();
        } else {
            $state.go('onroad');
        }
    }
    $scope.getList = function () {
        loadingShow();
        var param = {
            xtoken: data._token,
            xdate:$scope.mdeDate,
            xasp:$scope.idAsp,
            xkurir: $scope.kurir,
            xpageSize: $scope.pageSize,
            xpageNumber: $scope.currentPage * $scope.pageSize
        }
        api.GET('msun.onroad.dtl/?', param, function (response) {
            $scope.listMde = response.data;
            $scope.records = response.count
            loadingHide();
        })
    }
    $scope.goMap = function(){
        window.open('http://exact.co.id/data/peta.php?userid='+$scope.kurir+"&date="+$('#mdeDate').val(), '_blank');
    }
    $scope.doMessage = function () {
        loadingShow();
        var param = {
            xtoken: data._token,
            xuserlogin: data._id
        }
        api.ngPost('care.carerequestpickupwot?', param, function (response) {
            if (response.STATUS === 'OK') {
                loadingHide();
                $.confirm({
                    title: 'Alert!',
                    content: response.NOTIF,
                    buttons: {
                        ok: function () {

                        }
                    }
                });
            } else {
                loadingHide();
                $.confirm({
                    title: 'Alert!',
                    content: response.NOTIF,
                    buttons: {
                        ok: function () {
                        }
                    }
                });
            }
        })
    }
    $scope.goTrack = function(_resi) {
        $state.go('track',{resi: _resi})
    };
});

