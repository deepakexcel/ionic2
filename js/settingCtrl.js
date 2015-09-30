//setting controller @siddharth

myappc.controller('settingCtrl', function($scope, timeStorage, $rootScope, ajaxRequest) {
    var self = this;

    try {
        $scope.uuid = device.uuid;
        console.log($scope.uuid);
        $scope.phoneName = device.platform;
        console.log($scope.phoneName);
    }
    catch (e) {
        console.log(e);
    }
    self.caller = function() {
        if (!timeStorage.get("login") && !timeStorage.get("googleLogin") && !timeStorage.get("fbLogin")) {
            console.log("show");
            $rootScope.show = true;
            $rootScope.show1 = false;
        }
        else if (timeStorage.get("login") !== '') {
            var x = timeStorage.get("login");
            console.log(x);
            $rootScope.user = x.firstname;
            console.log("show1");
            $rootScope.show1 = true;
            $rootScope.show = false;
        } else if (timeStorage.get("fbLogin") !== '') {
            var x = timeStorage.get("fbLogin");
            console.log(x);
            $rootScope.user = x.name;
            console.log("show12");
            $rootScope.show1 = true;
            $rootScope.show = false;
        }
        else {
            var x = timeStorage.get("googleLogin");
            console.log(x);
            $rootScope.user = x.firstname;
            console.log("show1");
            $rootScope.show1 = true;
            $rootScope.show = false;
        }
    };
    var y = timeStorage.get("login");

    api = 'mobile_api/api.php?action=logout_notify&user_key=' + y.user_key + '&device_id=' + $scope.uuid;
    $scope.logout = function() {
        timeStorage.remove("login");
        timeStorage.remove("googleLogin");
        timeStorage.remove("google_access_token");
        timeStorage.remove("fbLogin");
        var promise = ajaxRequest.send(api);
        promise.then(function(data) {
            $scope.response = data;
        });
        try {
            if (window.cordova) {
                facebookConnectPlugin.getLoginStatus(function(fbUserObject) {

                    console.log("FB success");
                    console.log(fbUserObject.status);
                    if (fbUserObject.status === 'connected') {
                        facebookConnectPlugin.logout(
                                function() {
                                },
                                function() {
                                });
                    }

                }, function(errorObj) {
                    console.log("FB failed" + errorObj);
                });
            }
            else {
                facebookConnectPlugin.getLoginStatus(function(response) {
                    if (response.status === 'connected') {
                        facebookConnectPlugin.logout(function(response) {
                            // user is now logged out
                        });
                    }
                });

            }
        }
        catch (e) {

        }
        self.caller();

    };
});
