app.controller('onroadControlCtrl', function ($scope, $rootScope, $state,api) {
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
    $scope.pageSize = "50";
    $scope.status = '';
    $scope.listData = '';
    $scope.mdeDate = window.dateNow;
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
        $scope.mdeDate = window.dateNow;
        $('#mdeDate').val(window.dateNow);
        $scope.getList();
    }
    $scope.getList = function () {
        loadingShow();
        var param = {
            xtoken: data._token,
            xdate: $('#mdeDate').val(),
            xasp:getCookie('_ASPID'),
            xphone: $scope.phone,
            xpageSize: $scope.pageSize,
            xpageNumber: $scope.currentPage * $scope.pageSize
        }
        api.GET('msun.onroad/?', param, function (response) {
            $scope.listData = response.data;
            $scope.records = response.count
            loadingHide();
        })
    }

    $scope.showDetail = function (_mdeId) {
        $rootScope.onroadData = _mdeId;
        $rootScope.dateMde = $('#mdeDate').val();
        $state.go('onroadDetail')
    }
});