app.controller('nodelControlCtrl', function ($scope, $rootScope, $state,api) {
    $scope.mdeDate = '';
    $scope.currentPage = 0;
    $scope.records=0;
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
    $scope.pageSize = "10";
    $scope.status = '';
    $scope.listData = '';
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
        $scope.getList();
        $scope.getPcc();
    }
    $scope.getPcc= function () {
        loadingShow();
        var param ={
            xusrid:data._id,
            xtoken:data._token,
        }
        api.GET('mst.corp/', param, function (response) {
            $scope.listPcc = response.data;
            loadingHide();
        })
    }
    $scope.getList = function () {
        loadingShow();
        var param = {
            xtoken: data._token,
            xasp:getCookie('_ASPID'),
            xpcc: $scope.pcc,
            xpageSize: $scope.pageSize,
            xpageNumber: $scope.currentPage * $scope.pageSize
        }
        api.GET('msun.comdate.nodel/?', param, function (response) {
            $scope.listData = response.data;
            $scope.records = response.count
            loadingHide();
        })
    }

    $scope.showDetail = function (_mdeId) {
        $rootScope.nodelDetail = _mdeId;
        loadingShow();
        $state.go('nodelDetail')
    }
});