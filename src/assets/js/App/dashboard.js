
/* @ngInject */
app.controller('dashboardCtrl', function ($scope, $filter, $http, $state, api) {
    $scope.isFullscreen = false;
    $scope.init = function () {
        api.auth(function(response){
            setCookie('_ASPID',response.idAsp);
        })
        api.getProfile(function (respone) {
           if(respone.status !=='error'){
            var profile =JSON.parse(respone.data);
            if (profile.LOGIN !== 'TRUE') {
                $.confirm({
                    title: 'Confirm!',
                    content: 'Session anda telah habis silhkan login kembali?',
                    buttons: {
                        ok: function () {
                            onLogout();
                            deleteCookies();
                        }
                    }
                });
            } else {
                $scope.logo = profile.IMG_PROFILE;
            }
           }else{
            $.confirm({
                title: 'Error!',
                content: 'Ops...! mohon maaf terjadi kesalahan pada server kami! <br> silahkan logout dan coba login kembali',
                buttons: {
                    ok: function () {
                        deleteCookies();
                        onLogout();
                    }
                }
            }); 
           }
        })
        $scope.name = data._name
        window.dateNow = $filter('date')(new Date(), 'yyyy-MM-dd');
        window.timeNow = $filter('date')(new Date(), 'hh:mm:ss');
        $http.get('./manifest.json').then(function (response) {
            var obj = response.data;
            $scope.version = obj.version;
        });
    }
    $scope.logout = function () {
        $.confirm({
            title: 'Confirm!',
            content: 'Apakah anda ingin keluar dari aplikasi?',
            buttons: {
                ok: function () {
                    onLogout();
                },
                cancel: function () {

                }
            }
        });
    }

    function onLogout() {
        loadingShow();
        var param = {
            xuserid: data._id,
            xtoken: data._token,
            xorgdes: $scope.orgdes
        }
        api.GET('mlogout/', param, function (response) {
            deleteCookies();
            loadingHide();
        });
    }
    $scope.openFullscreen = function () {
        $scope.isFullscreen = !$scope.isFullscreen;
    }
});
