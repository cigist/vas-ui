/* @ngInject */
app.controller('indexCtrl', function ($scope, $http, $state, api) {
    document.getElementById("barcode").innerHTML = '<img src="https://service.exaq.id/SE/res/qrgenerator?fc=800021&size=300&barcode=2985852735728578237582375257" style="z-index: 50px;width: 300px;height: 300px;postion:absolute:left:0px;right:0px;">';
    $scope.init = function () {
        var ws = new WebSocket("wss://wss.exaq.id/SE/nikitarn?appid=request");
        //var ws = new WebSocket("wss://dev.exaq.id/SE/nikitarn?appid=request");
        var server ='https://wss.exaq.id/SE/';
        //var server ='https://dev.exaq.id/SE/';
        ws.onopen = function () {
            // console.log("onopen");
        };
        ws.onmessage = function (evt) {
            // console.log("onmessage");
            var received_msg = evt.data;
            var received = JSON.parse(received_msg);
            var action = received.action;
            var sid = received.sid;
            var barcode = received.barcode;
            if (action === 'connected' || action === 'barcode') {
                var vbarcode = encodeURI(barcode);
                document.getElementById("barcode").innerHTML = '<img src="https://service.exaq.id/SE/res/qrgenerator?fc=800021&size=300&barcode=' + vbarcode + '" style="z-index: 50px;width: 300px;height: 300px;postion:absolute:left:0px;right:0px;">';
            } else if (action === 'login') {
                var param = {
                    xsession: barcode,
                    xsid: sid
                };
                api.login(server+'care.carelogin?', param, function (result) {
                    if (result.STATUS === 'OK') {
                      var _data = {
                            _id: result.ID_USER_EXACT,
                            _name: result.NAMA,
                            _token: result.TOKEN
                        }
                        localStorage.setItem('_usrdtaex', JSON.stringify(_data));
                        window.location.href = "dashboard.html";
                    } else {
                        $.alert({
                            title: 'Alert!',
                            content: result.ERROR,
                        });
                    }
                });
            } else {
                $.alert({
                    title: 'Alert!',
                    content: 'Galat login!'
                });
            }
        };
        ws.onclose = function () {
            // websocket is closed.
            $.confirm({
                title: 'Alert!',
                content: 'Connection is closed..., please reload!',
                buttons: {
                    ok: function () {
                        window.location.reload();
                    }
                }
            });
        };
        window.onbeforeunload = function (event) {
            //socket.close();
        };
    }
});
