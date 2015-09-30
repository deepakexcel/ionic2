//siddharth category controller
myappc.controller('viewallCtrl', function($scope, $ionicModal, $timeout, $ionicScrollDelegate, $ionicPopup, $rootScope, $ionicLoading, ajaxRequest, urlHelper, $stateParams, timeStorage) {
    var filters = [];
    
    var self = this;
    var bigdata = [];
    console.log($stateParams);
  
    var cat = $stateParams.category;
    var sub_cat = $stateParams.subCategory;
    var sub = $stateParams.subCategory;
    var c = $stateParams.name;

    console.log(cat);
    var brandFsearch = $stateParams.brand;
    $scope.choice = {
        A: ''
    };
    $ionicLoading.show({
        templateUrl: 'partials/modals/productPage/loading.html',
        scope: $scope
    
    });
    $scope.closePodcastsLoader = function() {
        $ionicLoading.hide();
    };

    self.AllData = function(api, page) {
        api = api + page;
        var promise = ajaxRequest.send(api);
        promise.then(function(data) {

            bigdata.push(data);
            //   console.log(bigdata);
            $scope.main = bigdata;
            // timeStorage.set('filter', data, 48);

            $scope.response = data;

            console.log($scope.response);
            $scope.$broadcast('scroll.refreshComplete');

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $ionicLoading.hide();
            console.log($scope.response.crums.length);
//            for(i=0;i<$scope.response.crums.length;i++){
//                if($scope.response.crums[i].url==''){
//                  
//                }
//            }
            $scope.cat_name = $scope.response.crums[2].name;

            if ($scope.response.display_data.length == 8) {
                a = true;

            }

            if ($scope.response.display_data[0] == undefined && a != true) {
                console.log("no");
                $scope.data3 = false;
                $scope.abc = true;
                $scope.msg = "Sorry! No Products Found";
                $scope.filterhide = true;
                $scope.sorthide = true;
                $scope.fade = {
                    'color': '#808080'
                };

            } else if ($scope.response.display_data.length < 6) {
                console.log("no2");
                $scope.abc = false;
                $scope.data3 = false;

            }
            else {
                $scope.abc = false;
                $scope.data3 = true;
                console.log("yes");
            }

        });
        promise.catch(function(e) {
            console.log(e);
        });

    };
    $scope.key1 = function(key) {
        var str = key;
        return  str.replace(/_/g, ' ');
    };
//for search page data========

    if (brandFsearch != '' && sub != '') {
        console.log("i am here");
        $scope.data2 = true;
        $scope.myStyle2 = {
            "padding": "10px 0px 10px 0px"

        };

        var action = 'all_products'
        var mainUrl = 'catalog/' + c + '/' + brandFsearch + '/' + cat + '/' + sub_cat + '/catalog/xxx/' + cat + '/' + sub_cat + '/json__true';
//    var api = 'mobile_api/api.php?action=' + action + '&actual_link=' + mainUrl+'&page=0';
//        bigdata = [];
//
//        self.AllData(api);
//       
        $scope.page = 0;
        action = action + '&' + mainUrl + '=&id=' + cat + '&sub_id=' + sub_cat +
                '&category=' + c + '&brand=' + brandFsearch + '&json=true&cat_id=' + cat + '&sub_cat_id=' + sub_cat + '&page=';

        $scope.url = 'mobile_api/api.php?action=' + action;
        self.AllData($scope.url, $scope.page);
        $scope.choice.A = null;

    }

    $scope.doRefresh = function() {
        self.filter();

        if ($scope.filterhide == true) {
            self.filter();
        }
    };
    var self = this;
    var email;
    var userid;
    if (timeStorage.get('login').email)
    {
        email = timeStorage.get('login').email;
        userid = timeStorage.get('login').userid;
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

    var m = 0;
    self.mainPage = function() {

        var action = 'all_products';
        var actual_link = 'catalog/xxx/' + cat + '/' + sub_cat + '/json__true';
        if (m == 0) {
            console.log('4');
            var api = 'mobile_api/api.php?action=' + action + '&actual_link=' + actual_link;
            self.AllData(api);
            $scope.$broadcast('scroll.refreshComplete');

        }
        m++;
        console.log('5');
        action = action + '&' + actual_link + '=&id=' + cat + '&sub_id=' + sub_cat +
                '&category=' + res + '&json=true&cat_id=' + cat + '&sub_cat_id=' + sub_cat + '&page=';
        $scope.url = 'mobile_api/api.php?action=' + action;
        $scope.$broadcast('scroll.refreshComplete');


        if (fil != 1) {
            self.AllData($scope.url, $scope.page);
            $scope.$broadcast('scroll.refreshComplete');
        }


    };
//    self.mainPage();

    fil = 0;

    var str = $stateParams.name;
    var res = str.toLowerCase();

    $scope.page = 1;


    s = 0;
    $scope.sortclose = function(href, val) {

        $scope.filter.hide();
        $ionicLoading.show({
            templateUrl: 'partials/modals/productPage/loading.html',
            scope: $scope

        });
        br = 0;
        console.log(val);
        if (val == 0) {
            sort = "pricelth";
        } else if (val == 1) {
            sort = "pricehtl";
        } else {
            sort = "popularity";
        }
        popup.close();

        $scope.f = 1;
        if ($scope.data2 == true) {
            $scope.myStyle = {
                "margin": "10px 0px 0px 0px"
            };
        }
        else {
            $scope.myStyle = {
                "margin": "45px 0px 0px 0px"
            };
        }
        var url = href;
        console.log(url);
        var mainUrl = url.substr(62, url.length);

        console.log(mainUrl);
        var action = 'all_products';

        if (s == 1) {
            var api = 'mobile_api/api.php?action=' + brandSort + '&sort=' + sort + '&page=0';
            bigdata = [];

            self.AllData(api);
            $scope.page = 1;

            $scope.url = 'mobile_api/api.php?action=' + brandSort + '&sort=' + sort + '&page=';
        }


        else {
            var api = 'mobile_api/api.php?action=' + action + '&actual_link=' + mainUrl + '&page=0';
            bigdata = [];

            self.AllData(api);
            $scope.page = 1;
            action = action + '&' + mainUrl + '&page=';
            $scope.url = 'mobile_api/api.php?action=' + action;

        }

        $scope.$broadcast('scroll.infiniteScrollComplete');
        //  console.log(url);
        $scope.choice.A = null;

    };
    $scope.sort = function() {
        if ($scope.sorthide == true) {
            console.log('sorthide');
        } else {
            popup = $ionicPopup.show({
                scope: $scope,
                templateUrl: 'partials/modals/categoryPage/popup.html'
            });
            $ionicScrollDelegate.scrollTop(true);
        }

    };

    $scope.closeModal = function() {
        $scope.filter.hide();
        $scope.choice.A = null;

    };
    $scope.closeModal1 = function() {

        popup.close();
    };

    fl = 0;
    br = 0;

    $scope.brandModal = function(brand) {
        console.log("true1");
        // $scope.modalbrand.show();
        $scope.brand12 = true;
        $scope.priceRange = false;
        $scope.filterShow = false;
        $scope.color = brand;

        $ionicScrollDelegate.scrollTop(true);

    };
    $scope.displaybrands = function(href, brand) {
        $scope.change = brand;
        $ionicScrollDelegate.scrollTop(true);
        $timeout(function() {
            $scope.filter.hide();
            $scope.change = '';
            $ionicLoading.show({
                templateUrl: 'partials/modals/productPage/loading.html',
                scope: $scope
            });
            fl = 0;
//             $scope.name = 'Brand';
//            filters.push($scope.name);
//            $scope.final = filters;
//            console.log($scope.final);
            $scope.page = 1;
            //  $scope.data = false;
            $scope.data2 = true;
            $scope.f = 1;
            $scope.myStyle = {
                "margin": "10px 0px 0px 0px"
            };
            fl = 0;
            br = 1;
            var url = href;
            s = 1;
            var mainUrl = url.substr(25, url.length);
            console.log(mainUrl);
            $scope.brand = brand.toLowerCase();

            var action = 'all_products';
            var api = 'mobile_api/api.php?action=' + action + '&actual_link=' + mainUrl;
            if (br == 1) {
                brandSort = action + '&' + mainUrl + '=&id=' + cat + '&sub_id=' + sub_cat +
                        '&category=' + res + '&brand=' + brand + '&json=true&cat_id=' + cat + '&sub_cat_id=' + sub_cat;
                console.log(brandSort);
            }
            bigdata = [];
            self.AllData(api);

            action = action + '&' + mainUrl + '=&id=' + cat + '&sub_id=' + sub_cat +
                    '&category=' + res + '&brand=' + brand + '&json=true&cat_id=' + cat + '&sub_cat_id=' + sub_cat + '&page=';

            $scope.url = 'mobile_api/api.php?action=' + action;

            console.log($scope.url);
            $scope.choice.A = null;
        }, 100);
    };

    $scope.priceModal = function(price) {
        console.log("true");
//        $scope.modalpriceRange.show();
        $scope.priceRange = true;
        $scope.brand12 = false;
        $scope.filterShow = false;
        $ionicScrollDelegate.scrollTop(true);
        $scope.color = price;
    };


    $scope.displayrange = function(href, low, high, range) {
        $scope.change = range;
        $timeout(function() {
            $scope.filter.hide();
            $scope.change = '';
            $ionicLoading.show({
                templateUrl: 'partials/modals/productPage/loading.html',
                scope: $scope
            });
            $scope.page = 1;
//            $scope.name = 'Price';
//            filters.push($scope.name);
//             $scope.final = filters;
//            console.log($scope.final);
            // $scope.data = false;//kk
            $scope.data2 = true;
            $scope.f = 1;
            $scope.myStyle = {
                "margin": "10px 0px 0px 0px"
            };
            var url = href;
            console.log(url);
            var mainUrl = url.substr(25, url.length);
            var action = 'all_products'
            var api = 'mobile_api/api.php?action=' + action + '&actual_link=' + mainUrl;
            bigdata = [];

            self.AllData(api);



            if (br == 1) {
                action = action + '&' + mainUrl + 'json__true/=&id=' + cat + '&sub_id=' + sub_cat +
                        '&category=' + res + '&brand=' + $scope.brand + '&low=' + low + '&high=' + high + '&json=true&cat_id=' + cat + '&sub_cat_id=' + sub_cat + '&page=';

                $scope.url = 'mobile_api/api.php?action=' + action;
            } else {
                action = action + '&' + mainUrl + 'json__true/=&id=' + cat + '&sub_id=' + sub_cat +
                        '&category=' + res + '&low=' + low + '&high=' + high + '&json=true&cat_id=' + cat + '&sub_cat_id=' + sub_cat + '&page=';

                $scope.url = 'mobile_api/api.php?action=' + action;
            }
            $scope.choice.A = null;
        }, 100);
    };
    //nodel for all other filter contents


    $scope.filterModal = function(button) {
        $scope.filterShow = true;
        $scope.key = button;
        $scope.ccc = $scope.response.filters[button];
        $scope.priceRange = false;
        $scope.brand12 = false;
//        filterKey = button;
        $ionicScrollDelegate.scrollTop(true);
        $scope.color = button;


    };
    $scope.displayfilters = function(href, name) {
        $ionicLoading.show({
            templateUrl: 'partials/modals/productPage/loading.html',
            scope: $scope
        });
        $ionicScrollDelegate.scrollTop(true);
        $scope.change = name;
        $timeout(function() {
            $scope.change = '';
            // $scope.data = false;
            $scope.data2 = true;
            $scope.f = 1;
            fl = 1;
            $scope.myStyle = {
                "margin": "10px 0px 0px 0px"

            };
//            $scope.name = filterKey.replace(/_/g, ' ');
//            filters.push($scope.name);
//             $scope.final = filters;
//            console.log($scope.final);
            $ionicLoading.show({
                templateUrl: 'partials/modals/productPage/loading.html',
                scope: $scope
            });
            $scope.page = 1;
            var url = href;
            console.log(url);

            var mainUrl = url.substr(25, url.length);
            // var m = 'catalog/'+res+'/'+ cat + '/' + sub_cat +'/'+ $scope.key +'__'+name+'/json__true/filter__attribute';
            console.log(mainUrl);
            var action = 'all_products';

            var api = 'mobile_api/api.php?action=' + action + '&actual_link=' + mainUrl;
            bigdata = [];

            self.AllData(api);
            $scope.filter.hide();

            console.log($scope.key);
            console.log(mainUrl);
            if (br == 1) {
                console.log('1');
                action = action + '&' + mainUrl + '/json__true=&id=' + cat + '&sub_id=' + sub_cat +
                        '&category=' + res + '&brand=' + $scope.brand + '&' + $scope.key + '=' + name + '&json=true&filter=attribute&cat_id=' + cat + '&sub_cat_id=' + sub_cat + '&page=';
                $scope.url = 'mobile_api/api.php?action=' + action;
            } else {
                console.log('0');
                action = action + '&' + mainUrl + '/json__true=&id=' + cat + '&sub_id=' + sub_cat +
                        '&category=' + res + '&' + $scope.key + '=' + name + '&json=true&filter=attribute&cat_id=' + cat + '&sub_cat_id=' + sub_cat + '&page=';
                $scope.url = 'mobile_api/api.php?action=' + action;
            }
            $scope.choice.A = null;
        }, 100);
    };


    var x = 0;
    $ionicModal.fromTemplateUrl('partials/modals/categoryPage/filter.html', {
        scope: $scope,
        animation: 'slide-in-left'
    }).then(function(modal) {
        $scope.filter = modal;
    });

    $scope.show = function(key) {
        if ($scope.filterhide == true) {
            console.log("filter hide");
        } else {
            $timeout(function() {
                $scope.abcd = {'height': '1000px'};
            }, 500);
            $scope.filter.show();
            $scope.brand12 = true;
            $scope.color = key;
            $scope.priceRange = false;
            $scope.filterShow = false;
            a = false;
        }
    };

    $scope.clearfilter = function() {
        self.filter();

    };
    self.filter = function() {
        filters = [];
        $ionicLoading.show({
            templateUrl: 'partials/modals/productPage/loading.html',
            scope: $scope
        });
        $scope.fade = {
            'color': 'black'
        };
        $scope.sorthide = false;
        $scope.filterhide = false;
        $scope.f = 1;
        m = 0;
        brandFsearch = '';
        fil = 1;
        br--;
        console.log('1');
        s = 0;
        $scope.abc = false;
        $scope.page = 1;
        self.mainPage();
        bigdata = [];
        $scope.data = false;
        $scope.data2 = false;
        $scope.myStyle = {
            "margin": "40px 0px 0px 0px"
        };
        $scope.change = '';
//       $scope.clearf = {
//            "background-color": "#fff",
//              'color': '#808080'
//        };
    };
    if (sub == '') {
        console.log("i am here 2")
        cat = $stateParams.d;
        sub_cat = $stateParams.a;
        self.filter();
        fil = 0;

    }
    $scope.f = 0;
    $scope.loadMore = function() {
        console.log("hello");
        if ($scope.f == 0 && brandFsearch == '' && sub_cat != '') {
            console.log('2');
            self.mainPage();

            $scope.$broadcast('scroll.refreshComplete');

        } else {
            console.log('3');
            self.AllData($scope.url, $scope.page);
            $scope.$broadcast('scroll.refreshComplete');
        }
        $scope.page++;
        $scope.myStyle = {
            "padding": "0px 0px 0px 0px",
            "margin": "32px 0px 0px 0px"
        };
        if ($scope.data2 == true) {
            $scope.myStyle = {
                "padding": "0px 0px 0px 0px",
                "margin": "10px 0px 0px 0px"
            };
        }
    };

    $scope.loadMore();
    $scope.query_id = function(id) {
        
        console.log(id);
        var ID = id.split('/')[6];
        console.log(ID);
        urlHelper.openProduct({query_id: ID});


    };
    $ionicModal.fromTemplateUrl('partials/modals/homePage/follow.html', {
        scope: $scope,
        animaion: 'slide-in-up',
    }).then(function(modal2) {
        $scope.followModal = modal2;
    });
    $scope.followModalClose = function() {
        $scope.followModal.hide();
        $scope.change12='query1';
    };
   
    var qid1;
    $scope.priceAlert = function(query) {
         $scope.change12=query;
        var query_id = query.split('/')[6];
        qid1 = query_id;
        $ionicLoading.show({
            templateUrl: 'partials/modals/productPage/loading.html',
            scope: $scope
        });
       
        var promise = ajaxRequest.send('mobile_api/api.php?action=watch&query_id=' + query_id + '&websitesData=1&userid=' + userid + '&device_id=' + $scope.uuid);
        
        promise.then(function(data) {
            if (data.length > 0)
            {
                $scope.pricedata = data;
                $scope.msg = false;
                $scope.followModal.show();
                $ionicLoading.hide();
                $scope.change12='query1';
            }
            else
            {
                $scope.pricedata = false;
                $scope.msg = 'price alert not available for this product';
                $scope.followModal.show();
                $ionicLoading.hide();
            }
            for (i = 0; i < $scope.pricedata.length; i++)
                $scope.pricedata[i].show = 'false';
            console.log($scope.pricedata);
        });

    };
    var webObj = [];
    $scope.addWeb = function(website, i) {
        webObj.push(website);
        console.log(webObj);
        $scope.pricedata[i].show = i;
    };
    $scope.subWeb = function(website, j) {
        for (i = 0; i < webObj.length; i++)
        {
            if (webObj[i] == website)
                webObj.splice(i, 1);
        }
        console.log(webObj);
        $scope.pricedata[j].show = 'false';
    };

    $scope.processFollow = function() {
        $ionicLoading.show({
        templateUrl: 'partials/modals/productPage/loading.html',
        scope: $scope
    
    });
        if (webObj.length == 0)
        {
            console.log('no website selected');
            $ionicLoading.hide();
            window.plugins.toast.showShortTop('no website selected');
            
        }
        else if (webObj.length > 3)
        {
            console.log('Please select maximum 3 websites');
            $ionicLoading.hide();
            window.plugins.toast.showShortTop('Please select maximum 3 websites');
        }
        else
        {
            var webStr = '';
            for (i = 0; i < webObj.length; i++)
            {
                if (webObj.length > 1 && webObj.length - 1 != i)
                    comma = ',';
                else
                    comma = '';
                webStr += webObj[i] + comma;
            }
            console.log(webStr);
            console.log(email);
            if (email)
            {
                var promise = ajaxRequest.send('watch.php?watch=1&watch_website=' + webStr + '&query_id=' + qid1 + '&userid=' + userid + '&device_id=' + $scope.uuid);
                promise.then(function(data) {
                    webObj = [];
                    console.log(data);
                    $ionicLoading.hide();
                    $scope.followModal.hide();
                    $scope.change12='query1';
                    if (data.error == 1)
                    {
                        window.plugins.toast.showShortTop('please login to start alert');
                    }
                    else
                    {
                        window.plugins.toast.showShortTop('price alert is successfully activated');

                    }

                });
                promise.catch(function(data) {

                    console.log(data);
                    $scope.followModal.hide();
                    $scope.change12='query1';
                });
            }
            else
            {
                $scope.followModal.hide();

                urlHelper.openLogin();

                $scope.change12='query1';

                console.log('please login to start alert');
                window.plugins.toast.showShortTop('please login to start alert');

            }

        }
    };
});
