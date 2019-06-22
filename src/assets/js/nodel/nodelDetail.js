app.controller('nodelDetailControlCtrl', function ($scope, $state, $rootScope,$http, $filter, api) {
    $scope.detail = $rootScope.nodelDetail;
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
        if ($scope.detail !== undefined) {
            $scope.asp = $scope.detail.asp;
            $scope.ponsel = $scope.detail.ponsel;
            $scope.getList();
        } else {
            $state.go('nodel');
        }
    }
    $scope.getList = function () {
        var param = {
            xtoken: data._token,
            xasp:$scope.asp,
            xpageSize: $scope.pageSize,
            xpageNumber: $scope.currentPage * $scope.pageSize
        }
        api.GET('msun.comdate.nodel.detail/?', param, function (response) {
            $scope.listData = response.data;
            $scope.records = response.count
            loadingHide();
        })
    }
  
    $scope.doMessage = function () {
        loadingShow();
        $http.get('http://exact.co.id/data/message.php?xasp='+$scope.asp+"&xponsel="+$scope.ponsel).then(function(response) {
            console.log(response)
            loadingHide();
        });
    }
    $scope.goTrack = function(_resi) {
        $state.go('track',{resi: _resi})
    };
});

