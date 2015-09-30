// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myapp = angular.module('starter', ['ionic', 'startercc', 'angular-chartist']);


myapp.run(function($ionicPlatform, urlHelper, $rootScope) {
    document.addEventListener("offline", onOffline, false);
    function onOffline() {
        console.log('hello1');
        //   window.plugins.toast.showShortBottom('You Are Offline Now');
        urlHelper.openOffline();
    }
    document.addEventListener("online", onOnline, false);
    function onOnline() {
        urlHelper.openHome();
        console.log("hello2");
        //  window.plugins.toast.showShortBottom('You Are Online Now');
    }

    $ionicPlatform.ready(function() {
        var isWebView = ionic.Platform.isWebView();
        console.log(isWebView);
        try {
            if (device.platform == 'Android') {
                StatusBar.backgroundColorByHexString("#06457b");
            }
        }
        catch (e) {


        }
        if (!isWebView) {
            urlHelper.openHome();
        }

    });
// this is for front view of app 
//        if (!timeStorage.get("login") && !timeStorage.get("googleLogin") && !timeStorage.get("fbLogin")) {
//
//            $rootScope.show = true;
//            $rootScope.show1 = false;
//            // urlHelper.openFrontpage();
//            urlHelper.openHome();
//        }
//        else {
//            urlHelper.openHome();
//        }


    // urlHelper.openHome();
    //alert(1);




});
myapp.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
// if (ionic.Platform.isAndroid()) {
//      $ionicConfigProvider.scrolling.jsScrolling(false);
//    }
//    $ionicConfigProvider.platform.android.scrolling.jsScrolling(false);
    $stateProvider
//    .state('frontPage', {
//        url: '/frontPage',
//        templateUrl: 'partials/frontPage.html',
//        controller: 'frontPageCtrl'
//
//    })
            .state('menu', {
                url: '/priceGenie',
                templateUrl: 'partials/menu.html',
                controller: 'menuCtrl',
                // abstract: true
            })

            .state('menu.home', {
                url: '/home',
                views: {'mainView': {
                        templateUrl: 'partials/home.html',
                        controller: 'homeCtrl'
                    }}
            })
            .state('menu.category', {
                url: '/category/:name/:category/:subCategory/:brand',
                views: {'mainView': {
                        templateUrl: 'partials/viewall.html',
                        controller: 'viewallCtrl'
                    }}
            })
            .state('menu.search', {
                url: '/search',
                views: {'mainView': {
                        templateUrl: 'partials/search.html',
                        controller: 'searchCtrl'
                    }}
            })
            .state('menu.product', {
                url: '/product/:name/:query_id/',
                views: {'mainView': {
                        templateUrl: 'partials/product.html',
                        controller: 'productCtrl'
                    }}
            })
            .state('menu.register', {
                url: '/register',
                views: {'mainView': {
                        templateUrl: 'partials/register.html',
                        controller: 'registerCtrl'
                    }}
            })
            .state('menu.login', {
                url: '/login',
                views: {'mainView': {
                        templateUrl: 'partials/login.html',
                        controller: 'loginCtrl'
                    }}
            })
            .state('menu.setting', {
                url: '/setting',
                views: {'mainView': {
                        templateUrl: 'partials/setting.html',
                        controller: 'settingCtrl'
                    }}
            })
            .state('menu.feedback', {
                url: '/feedback',
                views: {'mainView': {
                        templateUrl: 'partials/feedback.html',
                        controller: 'feedbackCtrl'
                    }}
            })
            .state('menu.recentSearches', {
                url: '/recent',
                views: {'mainView': {
                        templateUrl: 'partials/myRecentSearches.html',
                        controller: 'recentSearches'
                    }}
            })
            .state('menu.Aboutus', {
                url: '/Aboutus',
                views: {'mainView': {
                        templateUrl: 'partials/Aboutus.html',
                        controller: 'AboutusCtrl'
                    }}
            })
            .state('menu.star', {
                url: '/notification',
                views: {'mainView': {
                        templateUrl: 'partials/star.html',
                        controller: 'star'
                    }}
            })
            .state('menu.notification', {
                url: '/category',
                views: {'mainView': {
                        templateUrl: 'partials/notification.html',
                        controller: 'star'
                    }}
            })
            .state('menu.Contactus', {
                url: '/Contactus',
                views: {'mainView': {
                        templateUrl: 'partials/Contactus.html',
                        controller: 'ContactusCtrl'
                    }}
            })
            .state('menu.YourAlert', {
                url: '/YourAlert',
                views: {'mainView': {
                        templateUrl: 'partials/YourAlert.html',
                        controller: 'YourAlertCtrl'
                    }}
            })
            .state('menu.website', {
                url: '/website',
                views: {'mainView': {
                        templateUrl: 'partials/website.html',
                        controller: 'star'
                    }}
            })
            .state('menu.notifytext', {
                url: '/text',
                views: {'mainView': {
                        templateUrl: 'partials/notifytext.html',
                        controller: 'star'
                    }}
            })
            .state('menu.success', {
                url: '/successful',
                views: {'mainView': {
                        templateUrl: 'partials/notifySuccess.html',
                        controller: 'star'
                    }}
            })
            .state('menu.offline', {
                url: '/offline',
                views: {'mainView': {
                        templateUrl: 'partials/offline.html',
                        controller: 'recentSearches'
                    }}
            });


    // $urlRouterProvider.otherwise('/priceGenie/home');

});

myapp.directive('menuCloseKeepHistory', ['$ionicHistory', function($ionicHistory) {
        return {
            restrict: 'AC',
            link: function($scope, $element) {
                $element.bind('click', function() {
                    var sideMenuCtrl = $element.inheritedData('$ionSideMenusController');
                    if (sideMenuCtrl) {
                        $ionicHistory.nextViewOptions({
                            historyRoot: false,
                            disableAnimate: true,
                            expire: 300
                        });
                        sideMenuCtrl.close();
                    }
                });
            }
        };
    }]);
var myapps = angular.module('starterss', ['ionic', 'startercc', 'ngStorage']);