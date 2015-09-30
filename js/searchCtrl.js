//search controller @siddharth


myappc.controller('searchCtrl', function($scope, urlHelper, $ionicLoading, timeStorage, $ionicPlatform, $ionicHistory, ajaxRequest) {
    var self = this;
    var previous = [];
    var name = "previousSearch";

    if (timeStorage.get(name)) {    // this is for getting recent searches
        var local = timeStorage.get(name);
        //     console.log(local);
        var local2 = local.reverse();
        //    console.log(local2);
        var local3 = [];
        for (var i = 0; i < 5; i++) {
            local3[i] = local2[i];

        }
        $scope.response1 = local3;

        for (key in local)
            previous.push(local[key]);
    }

    $scope.closePodcastsLoader = function() {
        $ionicLoading.hide();
    };
    $scope.myGoBack = function() {  // for back button
        $ionicHistory.goBack();
    };

    sea = 0;

    select = 0;
    $scope.$watch('textSearch', function(value1) {
        $scope.textS = value1;
        var last_query = Math.round(Math.random() * 10000);
        try {

            if ($scope.textS.length > 1) {
                $scope.scrollshow = true;
                $scope.yes = true;
                sea = 1;
                if (select == 0) {
                    $ionicLoading.show({
                        templateUrl: 'partials/modals/productPage/loading.html',
                        scope: $scope
                    });
                    var api = "auto_new.php?term=" + $scope.textS + '&category=-1&subcategory=-1&last_query_id=' + last_query;
                    self.AllData(api);

                }
                else {
                    $ionicLoading.show({
                        templateUrl: 'partials/modals/productPage/loading.html',
                        scope: $scope
                    });
                    var last_query = Math.round(Math.random() * 10000);
                    var api = 'auto_new.php?term=' + $scope.textS + '&filter=' + y + '&last_query_id=' + last_query;
                    self.AllData(api);
                    sea = 0;
                }
            }

            if ($scope.textS.length < 2) {
                $scope.scrollshow = false;
                sea = 0;
            }
        }
        catch (e)
        {
            //      console.log(e);
        }
    });

    $scope.value1 = function() {
        console.log($scope.textS)

    };
    self.AllData = function(api) {

        var promise = ajaxRequest.send(api);
        promise.then(function(data) {
            $scope.response = data.data;
            $ionicLoading.hide();
            //  console.log($scope.response.bestMatch);

            if ($scope.response.bestMatch[0] == undefined) {
                console.log("no");
                $scope.linshow = true;
                $scope.msg1 = "Sorry! No Products Found";
                $scope.abc = true;
            } else {
                $scope.linshow = false;
                $scope.abc = false;
            }
        });
    };
    $scope.All = function() {
        var x = "All";
        select = 1;
        $scope.msg = "in All";
        self.product(x);

    };
    $scope.Books = function() {
        var x = "Books";
        $scope.msg = "in Books";
        self.product(x);
        select = 1;
    };
    $scope.MobileTablets = function() {
        var x = "MobilesampTablets";
        self.product(x);
        $scope.msg = "in Mobile & Tablets";
        select = 1;
    };
    $scope.Gaming = function() {
        var x = "Gaming";
        self.product(x);
        $scope.msg = "in Gaming";
        select = 1;
    };
    $scope.HealthBeauty = function() {
        var x = "HealthampBeauty";
        self.product(x);
        $scope.msg = "in Health & Beauty";
        select = 1;
    };
    $scope.LaptopDesktop = function() {
        var x = "LaptopampDesktop";
        self.product(x);
        $scope.msg = "in Laptop & Desktop";
        select = 1;
    };
    $scope.Camera = function() {
        var x = "Camera";
        self.product(x);
        $scope.msg = "in  Camera";
        select = 1;
    };
    $scope.TvHomeAudio = function() {
        var x = "TVampHomeAudio";
        self.product(x);
        $scope.msg = "in Tv & Home Audio";
        select = 1;
    };
    $scope.HomeKitchen = function() {
        var x = "HomeampKitchen";
        self.product(x);
        $scope.msg = "in Home & Kitchen";
        select = 1;
    };
    $scope.BabyToys = function() {
        var x = "BabyampToys";
        self.product(x);
        $scope.msg = "in  Baby & Toys";
        select = 1;
    };
    $scope.ComputerCompAcc = function() {
        var x = "ComputerCompAcc";
        self.product(x);
        $scope.msg = "in Computer Comp/Acc";
        select = 1;
    };

    self.product = function(x) {
        y = x;
        $ionicLoading.show({
            template: '<ion-spinner icon="android" ></ion-spinner>'
        });
        var last_query = Math.round(Math.random() * 10000);
        var api = 'auto_new.php?term=' + $scope.textS + '&filter=' + x + '&last_query_id=' + last_query;
        self.AllData(api);
    };

    $scope.goto = function(uri) {
        var name = "previousSearch";
        timeStorage.set(name, '', 48);
        console.log($scope.textS);
        var val = $scope.textS;
        previous.push(val);

        timeStorage.set(name, previous, 48);
        var url = encodeURI(uri);
        var mainUrl = url.substr(25, url.length);
        console.log(mainUrl);
        var name = mainUrl.split('/')[1];
        console.log(name);
        var brand = mainUrl.split('/')[2];
        console.log(brand);
        var id = mainUrl.split('/')[3];
        console.log(id);
        var sub_id = mainUrl.split('/')[4];
        console.log(sub_id);

        urlHelper.openCategory({category: id, subCategory: sub_id, name: name, brand: brand});
    };

    $scope.gotoProduct = function(uri, val, product) {
        timeStorage.set(name, '', 48);
        console.log(val);
        previous.push(val);
        timeStorage.set(name, previous, 48);
        var url = encodeURI(uri);
        console.log(url);
        var ID = url.split('/')[5];
        console.log(ID);
        urlHelper.openProduct({query_id: ID});


    };
}).directive('resizable', function($window, $timeout) {   // it manage the search box line width

    return function(scope) {
        var self = this;
        scope.width = function() {
            scope.windowWidth = $window.innerWidth - 57;
            console.log(scope.windowWidth);

        };
        angular.element($window).bind("resize", function() {
            $timeout.cancel(self.resizing);
            self.resizing = $timeout(function() {
                scope.width();
            }, 100);
        });
        scope.width();
    };
}).directive('focus', function($timeout) {

    return {
        scope: {
            trigger: '@focus'
        },
        link: function(scope, element) {
            scope.$watch('trigger', function(value) {
                if (value === "true") {
                    $timeout(function() {
                        element[0].focus();
                    });
                }
            });
        }
    };
});


        