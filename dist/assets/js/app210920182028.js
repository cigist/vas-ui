var app = angular.module('vas', ['ngMaterial','ui.bootstrap', 'ui.router','angularjs-dropdown-multiselect','ngMap', 'ngMessages','ngTable','FBAngular'])
/* @ngInject */
app.config(function ($stateProvider, $urlRouterProvider,$compileProvider,$locationProvider) {
    $compileProvider.debugInfoEnabled(true);
    $urlRouterProvider.otherwise("/");
    $locationProvider.hashPrefix('');
    $stateProvider
        .state('/', {
           url: '/',
           templateUrl: 'pages/main/dashboard.html'
        });
});

/* @ngInject */
app.factory('focus', function ($rootScope, $timeout) {
    return function (name) {
        $timeout(function () {
            $rootScope.$broadcast('focusOn', name);
        });
    };
});

app.filter('startFrom', function () {
    return function (input, start) {
        if (!input || !input.length) {
            return;
        }
        start = +start; //parse to int
        return input.slice(start);
    };
});
app.filter('rupiah', function () {
    return function (val) {
        if (val !== null) {
            while (/(\d+)(\d{3})/.test(val.toString())) {
                val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
            }
            var val = 'IDR. ' + val;
            return val;
        } else {
            var val = 0;
            while (/(\d+)(\d{3})/.test(val.toString())) {
                val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
            }
            var val = 'IDR. ' + val;
            return val;
        }

    };
});
app.filter('custom', function () {
    return function (input, search) {
        if (!input) return input;
        if (!search) return input;
        var expected = ('' + search).toLowerCase();
        var result = {};
        angular.forEach(input, function (value, key) {
            var actual = ('' + value).toLowerCase();
            if (actual.indexOf(expected) !== -1) {
                result[key] = value;
            }
        });
        return result;
    }
});
app.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];

        if (angular.isArray(items)) {
            var keys = Object.keys(props);

            items.forEach(function (item) {
                var itemMatches = false;

                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }
        return out;
    };
});
app.filter('customDate', function () {
    return function (input) {
        let date = input.substring(0, 10);
        return date;
    }
});
app.filter('customTime', function () {
    return function (input) {
        let time = input.substring(10, 10);
        return time;
    }
});
/* @ngInject */
app.directive('showButton', ['webNotification', function (webNotification) {
    var serviceWorkerRegistration;
    if (navigator.serviceWorker) {
        navigator.serviceWorker.register('service-worker.js').then(function (registration) {
            serviceWorkerRegistration = registration;
        });
    }
    return {
        restrict: 'C',
        scope: {
            notificationTitle: '=',
            notificationText: '='
        },
        link: function (scope, element) {
            element.on('click', function onClick() {
                webNotification.showNotification(scope.notificationTitle, {
                    serviceWorkerRegistration: serviceWorkerRegistration,
                    body: scope.notificationText,
                    onClick: function onNotificationClicked() {
                        console.log('Notification clicked.');
                    },
                    autoClose: 4000 //auto close the notification after 4 seconds (you can manually close it via hide function)
                }, function onShow(error, hide) {
                    if (error) {
                        window.alert('Unable to show notification: ' + error.message);
                    } else {
                        console.log('Notification Shown.');

                        setTimeout(function hideNotification() {
                            console.log('Hiding notification....');
                            hide(); //manually close the notification (you can skip this if you use the autoClose option)
                        }, 5000);
                    }
                });
            });
        }
    };
}]);
app.directive('multiselectDropdown', function () {
    return {
        restrict: 'E',
        scope: {
            model: '=',
            options: '=',
        },
        template:
            "<div class='btn-group' data-ng-class='{open: open}' style='width: 100%;'>" +
            "<button class='form-control dropdown-toggle' data-ng-click='openDropdown()' style='width: auto;' ><span class='caret'></span></button>" +
            "<ul class='dropdown-menu' aria-labelledby='dropdownMenu'>" +
            "<li style='cursor:pointer;' data-ng-repeat='option in options'><a data-ng-click='toggleSelectItem(option)'><span data-ng-class='getClassName(option)' aria-hidden='true'></span> {{option.name}}</a></li>" +
            "</ul>" +
            "</div>",

        controller: function ($scope) {

            $scope.openDropdown = function () {

                $scope.open = !$scope.open;

            };

            $scope.selectAll = function () {

                $scope.model = [];

                angular.forEach($scope.options, function (item, index) {

                    $scope.model.push(item);

                });

            };

            $scope.deselectAll = function () {

                $scope.model = [];

            };

            $scope.toggleSelectItem = function (option) {

                var intIndex = -1;

                angular.forEach($scope.model, function (item, index) {

                    if (item.id == option.id) {

                        intIndex = index;

                    }

                });

                if (intIndex >= 0) {

                    $scope.model.splice(intIndex, 1);

                } else {

                    $scope.model.push(option);

                }

            };

            $scope.getClassName = function (option) {

                var varClassName = 'glyphicon glyphicon-remove-circle';

                angular.forEach($scope.model, function (item, index) {

                    if (item.id == option.id) {

                        varClassName = 'glyphicon glyphicon-ok-circle';

                    }

                });

                return (varClassName);

            };

        }
    }

});
app.directive('formValidate', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            function myValidation(value) {
                if (value.indexOf("e") > -1) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});
app.directive('ngTab', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 9 | event.which === 10) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngTab);
                });
                event.preventDefault();
            }
        });
    };
});
app.directive('ngFocusOut', function ($timeout) {
    return function ($scope, elem, attrs) {
        $scope.$watch(attrs.ngFocusOut, function (newval) {
            if (newval) {
                $timeout(function () {
                    elem[0].focusout();
                }, 0, false);
            }
        });
    };
});
app.directive('opendialog', function (modal) {
    var openDialog = {
        link: function (scope, element, attr) {
            function openDialog() {
                var element = angular.element(modal);
                var ctrl = element.controller();
                ctrl.setModel(scope.blub);
                element.modal('show');
            }
            element.bind('click', openDialog);
        }
    };
    return openDialog;
});
app.directive('focusOn', function () {
    return function (scope, elem, attr) {
        scope.$on('focusOn', function (e, name) {
            if (name === attr.focusOn) {
                elem[0].focus();
            }
        });
    };
});
app.directive('eventFocus', function (focus) {
    return function (scope, elem, attr) {
        elem.on(attr.eventFocus, function () {
            focus(attr.eventFocusId);
        });
        scope.$on('$destroy', function () {
            element.off(attr.eventFocus);
        });
    };
});
app.directive('autoComplete', function ($timeout) {
    return function (scope, element, iAttrs) {
        element.autocomplete({
            source: scope[iAttrs.uiItems],
            select: function () {
                $timeout(function () {
                    element.trigger('input');
                }, 0);
            }
        });
    };
});
app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
app.directive('fullscreen', ['Fullscreen', function (Fullscreen) {
    return {
        link: function ($scope, $element, $attrs) {
            // Watch for changes on scope if model is provided
            if ($attrs.fullscreen) {
                $scope.$watch($attrs.fullscreen, function (value) {
                    var isEnabled = Fullscreen.isEnabled();
                    if (value && !isEnabled) {
                        Fullscreen.enable($element[0]);
                        $element.addClass('isInFullScreen');
                    } else if (!value && isEnabled) {
                        Fullscreen.cancel();
                        $element.removeClass('isInFullScreen');
                    }
                });
                // Listen on the `FBFullscreen.change`
                // the event will fire when anything changes the fullscreen mode
                var removeFullscreenHandler = Fullscreen.$on('FBFullscreen.change', function (evt, isFullscreenEnabled) {
                    if (!isFullscreenEnabled) {
                        $scope.$evalAsync(function () {
                            $scope.$eval($attrs.fullscreen + '= false');
                            $element.removeClass('isInFullScreen');
                        });
                    }
                });

                $scope.$on('$destroy', function () {
                    removeFullscreenHandler();
                });

            } else {
                if ($attrs.onlyWatchedProperty !== undefined) {
                    return;
                }

                $element.on('click', function (ev) {
                    Fullscreen.enable($element[0]);
                });
            }
        }
    };
}]);

app.directive('numberOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
app.directive('ngGooglePlace', function ($parse) {
    return {
        scope: {
            details: '=',
            ngAutocomplete: '=',
            options: '='
        },

        link: function (scope, element, attrs, model) {

            //options for autocomplete
            var opts;

            //convert options provided to opts
            var initOpts = function () {
                opts = {};
                if (scope.options) {
                    if (scope.options.types) {
                        opts.types = [];
                        opts.types.push(scope.options.types);
                    }
                    if (scope.options.bounds) {
                        opts.bounds = scope.options.bounds;
                    }
                    if (scope.options.country) {
                        opts.componentRestrictions = {
                            country: scope.options.country
                        };
                    }
                }
            };
            initOpts();

            //create new autocomplete
            //reinitializes on every change of the options provided
            var newAutocomplete = function () {
                scope.gPlace = new google.maps.places.Autocomplete(element[0], opts);
                google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
                    scope.$apply(function () {
                        //              if (scope.details) {
                        scope.details = scope.gPlace.getPlace();
                        //              }
                        scope.ngAutocomplete = element.val();
                    });
                });
            };
            newAutocomplete();

            //watch options provided to directive
            scope.watchOptions = function () {
                return scope.options;
            };
            scope.$watch(scope.watchOptions, function () {
                initOpts();
                newAutocomplete();
                element[0].value = '';
                scope.ngAutocomplete = element.val();
            }, true);
        }
    };
});

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

/* @ngInject */
function queryUrl(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue;
};
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
var delete_cookie = function (cvalue) {
    document.cookie = cvalue + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
function deleteCookies() {
  var _data = {
      _id: '',
      _name: '',
      _token:''
  }
    delete_cookie("token");
    localStorage.setItem('_usrdtaex',JSON.stringify(_data));
    window.location = "index.html";
}
function getParam() {
    var _data = {
        _id: queryUrl('uid'),
        _name: '',
        _token: queryUrl('token')
    }
    if (queryUrl('xnikita') === 'true') {
        localStorage.setItem('_usrdtaex', JSON.stringify(_data));
    }
}
// getParam();
function loadingShow(){
    $.LoadingOverlay("show", {
        image: "./images/loading.gif"
    });
}
function loadingHide(){
    $.LoadingOverlay("hide");
}


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

/* @ngInject */
app.controller('mapMarkerCtrl', function ($scope, NgMap, items) {
    var vm = this;
    $scope.init = function () {
        if(items !==null){
            $scope.center = items;
        }else{
            $scope.$dismiss();
            $.alert({
                title:"Alert!",
                content:'Lokasi tidak ditemukan,<br> latitude & longitude tidak tersedia!'
            });
        }
    }
    vm.types = "['address']";
    NgMap.getMap().then(function (map) {
        vm.map = map;
    });
    $scope.close = function () {
        $scope.$dismiss();
    };
    $scope.getCurrentLocation = function (event) {
        console.log(event.latLng.lat());
        console.log(event.latLng.lng());
    }
});
