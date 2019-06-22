app.controller('karyawanCtrl', function ($scope,$uibModal, $rootScope, $state, $filter, api) {
    $scope.mdeDate = '';
    $scope.idAsp=getCookie('_ASPID');
    $scope.employeeName=null;
    $scope.noEmployee=null;
    $scope.idPosition=null;
    $scope.statusEmployee=null;
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
        var param = {
            xtoken: data._token,
            xuserid: data._id,
        }
        $scope.getList();
        api.doGet('mstposisi?', param, function (response){
            $scope.listPosisi = response;
        })
        api.doGet('mstgcm/status?', param, function (response){
            $scope.listStatus = response;
        })
    }
    $scope.getList = function () {
        loadingShow();
        var param = {
            xtoken: data._token,
            xuserid: data._id,
            xidAsp:$scope.idAsp,
            xemployeeName:$scope.employeeName,
            xnoEmployee:$scope.noEmployee,
            xidPosition:$scope.idPosition,
            xstatusEmployee:$scope.statusEmployee,
            xpageSize: $scope.pageSize,
            xpageNumber: $scope.currentPage * $scope.pageSize
        }
        api.doGet('mstemployee?', param, function (response) {
            if(response.status ==='succsess'){
                $scope.listKaryawan = response.data;
                $scope.records = response.records
                loadingHide();
            }
        })
    }

    $scope.showAdd = function() {
       $state.go('karyawanAdd')
    };
    $scope.showEdit = function(_id) {
        $state.go('karyawanEdit',{id: _id})
    };
    $scope.showDelete = function() {
        $state.go('karyawanDelete',{id: '09184787587587P'})
    };
});
