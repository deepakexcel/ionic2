//search controller @siddharth-->


myappc.controller('loginCtrl', function($scope, $log, ajaxRequest, $ionicHistory, $ionicLoading, googleLogin, $ionicPopup, $ionicModal, urlHelper, $rootScope, $timeout, timeStorage) {
    var self = this;
    $scope.model = {
        login_email: '',
        login_pwd: ''

    };
//    $rootScope.defaultButton = true;
    $ionicHistory.nextViewOptions({
        historyRoot: true,
        disableBack: true
    });
    $scope.goback = function() {
        $ionicHistory.goBack();
    };
    $scope.closePodcastsLoader = function() {
        $ionicLoading.hide();
    };
    //  $ionicLoading.hide();
    try {
        $scope.uuid = device.uuid;
        console.log($scope.uuid);
        $scope.phoneName = device.platform;
        console.log($scope.phoneName);
    }
    catch (e) {
        //    console.log(e);
    }
    // for manual login
    $scope.login = function() {
        if (!$scope.model.login_email) {
            $scope.msg = "please enter valid email";
            console.log($scope.msg);
            window.plugins.toast.showShortTop($scope.msg);

        }
        else if (!$scope.model.login_pwd) {
            $scope.msg = "please enter password";
            console.log($scope.msg);
            window.plugins.toast.showShortTop($scope.msg);
        }
        else {
            $ionicLoading.show({
                templateUrl: 'partials/modals/productPage/loading.html',
                scope: $scope
            });

            api = 'mobile_api/api.php?action=facebook&mobile_app=1&login_email=' + $scope.model.login_email +
                    '&login_pwd=' + $scope.model.login_pwd +
                    '&login=manual&device=' + $scope.phoneName + '&device_id=' + $scope.uuid;
            var promise = ajaxRequest.send(api);
            promise.then(function(data) {
                $scope.response = data;
                console.log(data.login);
                if (data.login == true) {
                    var name = 'login';
                    $ionicLoading.hide();

                    timeStorage.set(name, data, 48);
                    urlHelper.openHome();
                    window.plugins.toast.showShortTop('Hi ' + data.firstname);

                    //   self.caller();
                }
                else {
                    $ionicLoading.hide();
                    $scope.msg = data.login_status;
                    window.plugins.toast.showShortTop($scope.msg);
                }
            });
        }
    };
    opt = {
        client_id: '117380048302-2a8bqb3vjdme9733tr0mk70gom4llmte.apps.googleusercontent.com',
        redirect_uri: 'http://localhost/PriceGeniee/www/',
        scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/plus.me',
        secret: 'X763UlBbCrPTrJMfsum9Mwye'
    };


    $scope.gogleLogin = function() {
        $ionicLoading.show({
            templateUrl: 'partials/modals/productPage/loading.html',
            scope: $scope,
            noBackdrop: false
        });
        var loginGoogle = googleLogin.authorize(opt);
        loginGoogle.then(function(res) {
            console.log(res);
            if (res.google_id != '') {

                //         api1 = 'mobile_api/api.php?action=facebook&mobile_app=1&reg_firstname=' + res.name +
                //                  '&reg_email=' + res.email + '&reg_pwd=' + res.google_id + '&reg_con_pwd=' + res.google_id + '&register=manual&&device=' + $scope.phoneName + '&device_id=' + $scope.uuid;
                api1 = 'facebook.php?type=mobile_google&id=' + res.google_id + '&name=' + res.name + '&email=' + res.email + '&gender=' + res.gender + '&device_id=' + $scope.uuid;
                var promise = ajaxRequest.send(api1);
                promise.then(function(data) {
                    $scope.response = data;

                    var name = 'googleLogin';
                    //var data1 = [{email: res.email, name: res.name, image: res.picture}]
                    timeStorage.set(name, data, 48);
                    urlHelper.openHome();
                    window.plugins.toast.showShortTop('Hi ' + data.firstname);
                    $ionicLoading.hide();

                    // self.caller();
                });


            }

        });
    };
    // modal for resend confirmation link
    $ionicModal.fromTemplateUrl('partials/modals/loginPage/ResendCnf.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal1 = modal;
    });
    $scope.show1 = function() {
        $scope.modal1.show();
    };

    $scope.resendCnf = function(Femail) {
        $scope.femail = Femail;
        if (!$scope.femail) {
            window.plugins.toast.showShortTop("please enter email");
        }

        else {
            api = 'facebook.php?task=resendconflink&resendconf_email=' + $scope.femail;
            var promise = ajaxRequest.send(api);
            promise.then(function(data) {
                $scope.response = data;
                console.log($scope.response);
                if (data.status == false) {
                    window.plugins.toast.showShortTop(data.status_message);
                } else {
                    window.plugins.toast.showShortTop(data.status_message);
                }
            });
        }
    };

// modal for forget password
    $ionicModal.fromTemplateUrl('partials/modals/loginPage/passwordReset.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal1) {
        $scope.modal = modal1;
    });
    $scope.show = function() {
        $scope.modal.show();
    };
    $scope.hide = function() {
        $scope.modal.hide();
        $scope.modal1.hide();
    }
    $scope.forgotPWD = function(Femail) {
        $scope.femail = Femail;
        if (!$scope.femail) {
            window.plugins.toast.showShortTop("please enter email");
        }

        else {
            api = 'facebook.php?task=resetpwd&fpwd_email=' + $scope.femail;
            var promise = ajaxRequest.send(api);
            promise.then(function(data) {
                $scope.response = data;
                console.log($scope.response);
                if (data.status == false) {
                    window.plugins.toast.showShortTop(data.status_message);
                } else {
                    window.plugins.toast.showShortTop(data.status_message);
                    $scope.femail = null;
                }
            });
        }
    };


    $timeout(function() {
        //timeout requried to wait for facebook plugin file to load
        try {
            if (window.cordova.platformId == "browser") {
                facebookConnectPlugin.browserInit('467986553238213');
            }
            facebookConnectPlugin.getLoginStatus(function(response) {
                $log.info(response);
                if (response.status === 'connected') {
                    $log.info('User Already LoggedIn');
                    self.getData();
                    //  self.caller();
                } else {
                    $log.info('User Not Logged In');
                }
            }, function() {
                $log.warn('Get Login Status Error');

            });
        }
        catch (e) {

        }
    }, 1000);
    $scope.facebookLogin = function() {
        console.log("yes");
        $ionicLoading.show({
            templateUrl: 'partials/modals/productPage/loading.html',
            scope: $scope,
            noBackdrop: false
        });
        facebookConnectPlugin.login(['public_profile'], function(data) {
            $log.info(data);
            self.getData();

        }, function(data) {
            $log.warn(data);
            $ionicLoading.hide();
        });
    };
    self.getData = function() {
        facebookConnectPlugin.api('/me', ['public_profile'], function(data) {
            $log.info(data);
            $scope.$apply(function() {
                $scope.fb_data = data;

            });
            api1 = 'facebook.php?type=mobile_facebook&id=' + data.id + '&name=' + data.name + '&email=' + data.email + '&gender=' + data.gender + '&device_id=' + $scope.uuid;
            var promise = ajaxRequest.send(api1);
            promise.then(function(data1) {
                $scope.response = data;

                var name = 'fbLogin';
                timeStorage.set(name, data1, 48);
                urlHelper.openHome();
                window.plugins.toast.showShortTop('Hi ' + data1.firstname);
//                

            });
            console.log('fb login' + data.id + ',' + data.name);
        });
    };
});

