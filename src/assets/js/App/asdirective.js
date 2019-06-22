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
