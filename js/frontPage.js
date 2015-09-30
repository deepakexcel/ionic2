myappc.controller('frontPageCtrl', function($scope, $timeout, $ionicLoading, $log, ajaxRequest, googleLogin, urlHelper, timeStorage, $rootScope) {
    // for google login
    opt = {
        client_id: '117380048302-2a8bqb3vjdme9733tr0mk70gom4llmte.apps.googleusercontent.com',
        redirect_uri: 'http://localhost/priceGenie/www/',
        scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/plus.me',
        secret: 'X763UlBbCrPTrJMfsum9Mwye'
    };
    try {    // for device id and platform
        $scope.uuid = device.uuid;
        console.log($scope.uuid);
        $scope.phoneName = device.platform;
        console.log($scope.phoneName);
    }
    catch (e) {
        // console.log(e);
    }
// function for google login
    $scope.gogleLogin = function() {
        var loginGoogle = googleLogin.authorize(opt);
        loginGoogle.then(function(res) {
            console.log(res);
            if (res.google_id != '') {
                //         api1 = 'mobile_api/api.php?action=facebook&mobile_app=1&reg_firstname=' + res.name +
                //                  '&reg_email=' + res.email + '&reg_pwd=' + res.google_id + '&reg_con_pwd=' + res.google_id + '&register=manual&&device=' + $scope.phoneName + '&device_id=' + $scope.uuid;
                api1 = 'facebook.php?type=mobile_google&id=' + res.google_id + '&name=' + res.name + '&email=' + res.email + '&gender=' + res.gender + '&device_id=' + $scope.uuid;
                ;
                var promise = ajaxRequest.send(api1);
                promise.then(function(data) {
                    $scope.response = data;
                    var name = 'googleLogin';
                    //var data1 = [{email: res.email, name: res.name, image: res.picture}]
                    timeStorage.set(name, data, 48);
                    urlHelper.openHome();

                });


            }

        });
    };



    $timeout(function() {
        //timeout requried to wait for facebook plugin file to load
        try {
            if (window.cordova.platformId == "browser") {
                facebookConnectPlugin.browserInit('941307055915491');
            }
            facebookConnectPlugin.getLoginStatus(function(response) {
                $log.info(response);
                if (response.status === 'connected') {
                    $log.info('User Already LoggedIn');
                    self.getData();
                    self.caller();
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
        $ionicLoading.show({
            templateUrl: 'partials/modals/productPage/loading.html',
            scope: $scope
        });
        console.log("yes");
        facebookConnectPlugin.login(['public_profile'], function(data) {
            $log.info(data);

            self.getData();
            //       self.caller();
        }, function(data) {
            $log.warn(data);
        });
    };
//

    self.getData = function() {
        console.log("api call");
        facebookConnectPlugin.api('/me', ['public_profile', 'email'], function(data) {
            $log.info("data from login" + data);

            $scope.$apply(function() {
                $scope.fb_data = data;
                console.log($scope.fb_data);

            });
            api1 = 'facebook.php?type=mobile_facebook&id=' + data.id + '&name=' + data.name + '&email=' + data.email + '&gender=' + data.gender + '&device_id=' + $scope.uuid;
            var promise = ajaxRequest.send(api1);
            promise.then(function(data1) {
                $scope.response = data;
                var name = 'fbLogin';
                timeStorage.set(name, data1, 48);
                urlHelper.openHome();
            });
            console.log('fb login=' + data.id + ',' + data.name + ',' + data.email);
        });
    };
});