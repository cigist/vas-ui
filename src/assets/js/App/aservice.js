/* @ngInject */
// var server = 'https://service.exaq.id/SE/';
var server = 'http://192.168.100.113:8084/SE/';
var smart = 'https://speedi.exaq.id/'
var urlApi = 'http://service.exact.co.id/';
var data;
app.service('api', ['$http', function ($http) {
    data = JSON.parse(localStorage.getItem('_usrdtaex'));
    this.doPost = function (service, data, result) {
        var config = {
            headers: {
                "Content-Type": "application/json",
                "Accept":"application/json",
                "X-API-Key":"AAk3i9ThQ4QhEZcqfPvN/MXmeuiSr3BJfSniwmtja2yIuFN2cctjJnTgNeU5nLYg",
                "token":"0329cb5f-c79b-4948-a2c9-fc659914b853"
            }
        }
        $http.post(server + service,data,config).then(function (response) {
            result(response.data);
        }).catch(function (err) {
            jQuery.LoadingOverlay("hide");
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
        });
    };
    // this.doPost = function (service, data, result) {
    //     var config = {
    //         headers: {
    //             "Content-Type": "application/x-www-form-urlencoded"
    //         }
    //     }
    //     $http.post(smart + service,data,config).then(function (response) {
    //         result(response.data);
    //     }).catch(function (err) {
    //         jQuery.LoadingOverlay("hide");
    //         $.confirm({
    //             title: 'Error!',
    //             content: 'Ops...! mohon maaf terjadi kesalahan pada server kami! <br> silahkan logout dan coba login kembali',
    //             buttons: {
    //                 ok: function () {
    //                     deleteCookies();
    //                     onLogout();
    //                 }
    //             }
    //         });
    //     });
    // };
    this.doGet = function (service, arg, result) {
        $http({
            method: "GET",
            url: urlApi + service,
            params: arg,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function mySucces(response) {
            result(response.data);
        }, function myError(err) {
            jQuery.LoadingOverlay("hide");
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
        });
    };
    this.doPut = function (service, data, result) {
        var config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        $http.put(server + service, data, config).then(function (response) {
            result(response.data);
        }).catch(function (err) {
            jQuery.LoadingOverlay("hide");
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
        });
    };
    this.doDelete = function (service, data, result) {
        var config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        $http.delete(server + service, data, config).then(function (response) {
            result(response.data);
        }).catch(function (err) {
            jQuery.LoadingOverlay("hide");
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
        });
    };
    this.postMultiPart = function (service, data, result) {
        var httpServer = server + service;
        setTimeout(function () {
            jQuery.ajax({
                url: httpServer,
                headers: {
                    "Content-Type": undefined
                },
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                timeout: 600000,
                success: function (data) {
                    result(data);
                },
                error: function (err) {
                    jQuery.LoadingOverlay("hide");
                    console.log(err.status);
                }
            });
        }, 500);
    };
    this.jPost = function (service, vdata, result) {
        $.ajax({
            type: 'POST',
            url: server + service,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // 'x-api-key': 'spc-2060-11-2363-1452'
            },
            data:JSON.stringify(vdata)
        }).done(function(data) { 
            alert(data);
        });
        // setTimeout(function () {
        //     jQuery.post(server + service, JSON.stringify(vdata), function (data, status) {
        //         result(data);
        //     }).success('Done').error(function () {
        //         $.LoadingOverlay("hide");
        //     });
        // }, 500);
    };
    this.jGet = function (service, vdata, result) {
        setTimeout(function () {
            jQuery.get(service, vdata, function (data, status) {
                result(data);
            }).success('Done').error(function () {
                $.LoadingOverlay("hide");
                $.alert({
                    title: 'Confirm!',
                    content: 'Silahkan login Whatsapp terlebih dahulu!'
                });
            });
        }, 500);
    };
    this.login = function (service, param, result) {
        $http({
            method: "POST",
            url: service,
            params: param,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function mySucces(response) {
            result(response.data);
        }, function myError(err) {

        });
    };
    this.ngPost = function (service, arg, result) {
        $http({
            method: "POST",
            url: server + service,
            params: arg,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function mySucces(response) {
            result(response.data);
        }, function myError(err) {

        });
    };
    this.POST = function (service, arg, result) {
        $http({
            method: "POST",
            url: smart + service,
            params: arg,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function mySucces(response) {
            result(response.data);
        }, function myError(err) {

        });
    };
    this.GET = function (service, arg, result) {
        $http({
            method: "POST",
            url: smart + service,
            params: arg,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function mySucces(response) {
            result(response.data);
        }, function myError(err) {

        });
    };
    this.tokenVerify = function (result) {
        var param = {
            xtoken: data._token,
            xuserid: data._id,
            xfiretoken: localStorage.getItem('_firbtid_')
        }
        $http({
            method: "POST",
            url: 'https://speedi.exaq.id/mverifikasi/?',
            params: param,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function mySucces(response) {
            result(response.data);
        }, function myError(err) {

        });
    };
    this.auth = function (result) {
        var param = {
            xtoken: data._token,
            xuserid: data._id,
            xfiretoken: localStorage.getItem('_firbtid_')
        }
        $http({
            method: "GET",
            url: urlApi + 'auth?',
            params: param,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function mySucces(response) {
            result(response.data);
        }, function myError(err) {

        });
    };
    this.getProfile = function (result) {
        var param = {
            xtoken: data._token,
            xuserid: data._id,
            xfiretoken: localStorage.getItem('_firbtid_')
        }
        $http({
            method: "GET",
            url: urlApi + 'profile?',
            params: param,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function mySucces(response) {
            result(response.data);
        }, function myError(err) {

        });
    };
    this.stockOpname = function (param, result) {
        $http({
            method: "POST",
            url: 'http://exact.co.id/data/service/stockopname.php',
            params: param,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function mySucces(response) {
            result(response.data);
        }, function myError(err) {

        });
    };
}]);
