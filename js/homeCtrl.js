//vaibhav home controller

myappc.controller('homeCtrl', function($ionicHistory, $timeout, $rootScope, $ionicModal, $scope, ajaxRequest, urlHelper, timeStorage, $interval, $ionicLoading, $ionicScrollDelegate) {
    $ionicHistory.clearHistory();    //clearing history of app to disable back views

    var self = this;
    var email;
    var userid;


    //retrieving user data from local sorage if logged in
    if (timeStorage.get('login').email)
    {
        email = timeStorage.get('login').email;  //retrieving user email
        userid = timeStorage.get('login').userid;  //retrieving userid
    }
    else if (timeStorage.get('googleLogin').email)
    {
        email = timeStorage.get('googleLogin').email;
        userid = timeStorage.get('googleLogin').userid;
    }
    else if (timeStorage.get('fbLogin').email)
    {
        email = timeStorage.get('fbLogin').email;
        userid = timeStorage.get('fbLogin').userid;
    }

//getting device id
    try {
        $scope.uuid = device.uuid;   //getting device id
        console.log($scope.uuid);
        $scope.phoneName = device.platform;
        console.log($scope.phoneName);
    }
    catch (e) {
        console.log(e);
    }
    $scope.closePodcastsLoader = function() {
        $ionicLoading.hide();
    };
    //function to call toast
    self.toast = function(msg) {
        window.plugins.toast.showWithOptions(
                {
                    message: msg,
                    duration: "short",
                    position: "top",
                    addPixelsY: -40  // added a negative value to move it up a bit (default 0)
                }

        );
    };
    //siddharth: checking login for side menu
    self.caller = function() {
        if (!timeStorage.get("login") && !timeStorage.get("googleLogin") && !timeStorage.get("fbLogin")) {
            console.log("show");
            $rootScope.show = true;
            $rootScope.show1 = false;
        }
        else if (timeStorage.get("login") != '') {
            var x = timeStorage.get("login");
            console.log(x);
            $rootScope.user = x.firstname;
            console.log($rootScope.user);
            console.log("show1");
            $rootScope.show1 = true;
            $rootScope.show = false;
            $rootScope.shadow = {
                'box-shadow': '0px -1px 0px 0px #5b656f'
            };
        } else if (timeStorage.get("fbLogin") != '') {
            var x = timeStorage.get("fbLogin");
            console.log(x);
            $rootScope.user = x.firstname;
            console.log("show12");
            $rootScope.show1 = true;
            $rootScope.show = false;
            $rootScope.shadow = {
                'box-shadow': '0px -1px 0px 0px #5b656f'
            };
        }
        else {
            var x = timeStorage.get("googleLogin");
            console.log(x);
            $rootScope.user = x.firstname;
            console.log("show13");
            $rootScope.show1 = true;
            $rootScope.show = false;
            $rootScope.shadow = {
                'box-shadow': '0px -1px 0px 0px #5b656f'
            };
        }
    };
    self.caller();
//   $scope.shadow=function(){                        //for home page search active
//       $scope.boxShadow={
//       'box-shadow': '0px 0px 1px 2px #e3ae22'
//   };
//   };
//   $scope.shadow1=function(){
//       $scope.boxShadow={
//       'box-shadow': '0px 0px 0px 0px '
//   };
//   };
    //event when modal closes
    $scope.$on('modal.hidden', function() {
        $ionicScrollDelegate.scrollTop();
    });
    $ionicLoading.hide();
//function for ion refresh
//    $scope.doRefresh = function () {
//        cate = category.replace(/[^a-zA-Z0-9]/gi, '');  //changing pattern for the categories
//        timeStorage.remove(cate);     //removing data from the localStorage 
//        $scope.loadLatest(cate);         //loadLatest to load data on the page
//        $ionicLoading.hide();             //hiding the loading icon
//    };

//    $rootScope.defaultButton = true;      //showing the common button in menu

    var self = this;

    //vaibhav: function to fire ajaxRequest to load home page popular items
    self.ajax = function(cat) {
        url2 = 'mobile_api/api.php?action=home_products_v1&size=10&device=tablet&swipe=1&key=' + cat;
        var promise = ajaxRequest.send(url2);
        promise.then(function(data) {
            var data = data.data;
            console.log(data);
            //vaibhav :setting data in localstorage
            timeStorage.set(cat, data, 168)
            $scope.catItems1 = data;
//            self.status();
            $ionicLoading.hide();
            $ionicScrollDelegate.resize();
//            $scope.$broadcast('scroll.refreshComplete');
        });
    };


    //vaibhav: initializing default category to load in popular items
    var cat;
    var category;
    //vaibhav: function loads data when click on category
    $ionicModal.fromTemplateUrl('partials/modals/homePage/subCat.html', {
        scope: $scope,
        animaion: 'slide-in-left'
    }).then(function(modal2) {
        $scope.subCatModal = modal2;     // showing sub category in subCat Modal
    });
    $scope.subCatModalClose = function() {
        $scope.subCatModal.hide();

    };

    $scope.loadLatest = function(cat) {
        $scope.homeCat = cat;

        $timeout(function() {
            $scope.homeCat = '';
            $scope.catItems1 = '';
            category = cat;
            $scope.subCatModal.show();
            $ionicLoading.show({
                templateUrl: 'partials/modals/productPage/loading.html',
                scope: $scope
            });
            $scope.categoryDisplay = cat;
            cat = cat.replace(/[^a-zA-Z0-9]/gi, '');
            //vaibhav: checking data in localstorage
            if (timeStorage.get(cat)) {
                $scope.catItems1 = timeStorage.get(cat);
//            self.status();

                $ionicLoading.hide();
                $ionicScrollDelegate.resize();

            }
            //vaibhav: if local storage is empty requesting new data by ajax
            else
            {
                self.ajax(cat);   //def line 91

            }

            console.log($scope.catItems1);

        }, 100);
    };
    //vaibhav: loading data first time


    //function to stop loading icon when user clicks on screen
    $scope.closePodcastsLoader = function() {
        $ionicLoading.hide();
    };

    var webObj = [];     //obj to hold website selected

    //function to add website in webObj 
    $scope.addWeb = function(website, i) {
        webObj.push(website);
        console.log(webObj);
        $scope.pricedata[i].show = i;
    };
    //function to subract website unchecked
    $scope.subWeb = function(website, j) {
        for (i = 0; i < webObj.length; i++)
        {
            if (webObj[i] == website)
                webObj.splice(i, 1);
        }
        console.log(webObj);
        $scope.pricedata[j].show = 'false';
    };

    //function for setting follow console.log
    $scope.processFollow = function() {
        //minimum one and maximum 3 website can be selected 
        if (webObj.length == 0)
        {
            console.log('no website selected');
            self.toast('no website selected');
        }
        else if (webObj.length > 3)
        {
            console.log('Please select maximum 3 websites');
            self.toast('Please select maximum 3 websites');
        }
        else
        {
            var webStr = '';
            //creating string to send website selected using url
            for (i = 0; i < webObj.length; i++)
            {
                if (webObj.length > 1 && webObj.length - 1 != i)
                    comma = ',';
                else
                    comma = '';
                webStr += webObj[i] + comma;
            }
            console.log(webStr);
            //ajax to set console.log
            var promise = ajaxRequest.send('watch.php?watch=1&watch_website=' + webStr + '&query_id=' + qid + '&userid=' + userid + '&device_id=' + $scope.uuid);
            promise.then(function(data) {
                console.log(data);
                $scope.followModal.hide();
                if (data.error == 1)
                {
                    self.toast('please login to start console.log');
                }
                else
                {
                    self.toast('price console.log is successfully activated');

                }

            });
            promise.catch(function(data) {
                console.log(data);
                self.toast('conectivity issue');
                $scope.followModal.hide();
            });
        }
    };
    //function for view all button
    $scope.check = function(id, sub, name) {
        $scope.homeCat = name;
        $ionicHistory.nextViewOptions({
            disableAnimate: true
        });
//        $timeout(function () {


        name = name.replace(/[^a-zA-Z0-9]/gi, '');
        urlHelper.openCategory({category: id, subCategory: sub, name: name});
        $timeout(function() {
            $scope.homeCat = '';
            $scope.subCatModal.hide();
        }, 150);
//        }, 100);
    };
//function for adding extra scroll feature
//    var y = 15;
//    $interval(function () {
//        y = 15;
//        z = -15;
//    }, 500);
//    $scope.onSwipe = function () {
//        $ionicScrollDelegate.$getByHandle('main').scrollBy(0, y, true);
//        console.log(y);
//        y = y + 10;
//    };
//    var z = -15;
//    $scope.onDragDown = function () {
//        $ionicScrollDelegate.$getByHandle('main').scrollBy(0, z, true);
//        console.log(z);
//        z = z - 10;
//    };

    //vaibhav: adding a field in catItems1 array 
//    self.status = function () {
//        for (var i = 0; i < $scope.catItems1.length; i++)
//        {
//            for (var j = 0; j < $scope.catItems1[i].products.length; j++)
//            {
//                $scope.catItems1[i].products[j].redheart = 0;     //vaibhav: 0  to show grey heart
//            }
//        }
//    };

//    //modal to show follow page
//    $ionicModal.fromTemplateUrl('partials/modals/homePage/follow.html', {
//        scope: $scope,
//        animaion: 'slide-in-up',
//    }).then(function (modal2) {
//        $scope.followModal = modal2;
//    });
//    $scope.followModalClose = function () {
//        $scope.followModal.hide();
//    };
////    $scope.unfollow = function (i, j) {
////        $scope.catItems1[i].products[j].redheart = 0;              //vaibhav: 0  to show grey heart
////    };
//    var qid;
//    
//    //function to open follow modal and loading its data
//    $scope.follow = function (i, j, query_id) {
//        qid = query_id;
//        $ionicLoading.show({
//            templateUrl: 'partials/modals/productPage/loading.html',
//            scope: $scope
//        });              //showing loading icon
//        
//        //ajax to retrieve follow moal data
//        var promise = ajaxRequest.send('mobile_api/api.php?action=watch&query_id=' + query_id + '&websitesData=1&userid=' + userid + '&device_id=' + $scope.uuid);
//        promise.then(function (data) {
//            if (data.length > 0)
//            {
//                $scope.pricedata = data;
//                $scope.msg = false;
//                $scope.followModal.show();
//                $ionicLoading.hide();
//            }
//            else
//            {
//                $scope.pricedata = false;
//                $scope.msg = 'price console.log not available for this product';
//                $scope.followModal.show();
//                $ionicLoading.hide();
//            }
//            //adding show key to array $scope.priceata for checkbox functionality
//            for (i = 0; i < $scope.pricedata.length; i++)
//                $scope.pricedata[i].show = 'false';
//            console.log($scope.pricedata);
//        });
////        $scope.catItems1[i].products[j].redheart = 1;      //vaibhav: 1 to show red heart
//    };
});
