//vaibhav product controller
myappc.controller('productCtrl', function($ionicModal, urlHelper, $ionicScrollDelegate, $ionicLoading, $scope, $rootScope, $stateParams, timeStorage, ajaxRequest, $filter) {

    $ionicLoading.show({
        templateUrl: 'partials/modals/productPage/loading.html',
        scope: $scope
    });
    console.log($stateParams);
    var catId = $stateParams.a;            //vaibhav category id
    var subId = $stateParams.b;            //vaibhav sub category id
    var pro_name = $stateParams.name;         //vaibhav product name
    var qid = $stateParams.query_id;              //vaibhav  query id for url
    var self = this;
    $scope.qid = qid;
    var email;
    var userid;
    //checking user details
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


    //function to stop loading icon when user clicks on screen
    $scope.closePodcastsLoader = function() {
        $ionicLoading.hide();
    };

//function for ion refresh
    $scope.doRefreshProduct = function() {

        var url1 = 'mobile_api/api.php?action=product&query_id=' + qid;
        var url2 = 'mobile_api/api.php?action=product_related&query_id=' + qid;

        timeStorage.remove(url1); //removing data from the localStorage 
        timeStorage.remove(url2); //removing data from the localStorage 
        self.data1();   //data1 to load product data on the page
        self.data2();        //data2 to load similar and related product data on the page
        $ionicLoading.hide();
    };

    //event when modal closes
    $scope.$on('modal.hidden', function() {
        $ionicScrollDelegate.scrollTop();
    });
//    $rootScope.defaultButton = false;
    //vaibhav url1 for getting clicked product detail 
    var url1 = 'mobile_api/api.php?action=product&query_id=' + qid;
//    var url1 = 'find.php?q=' + pro_name + '&cat=' + catId + '&cache=1&subcat=' + subId + '&product=&ip_addr=&login=0&recent_key=&isbn=&author=';

    //vaibhav url2 for getting related product + similar product
    var url2 = 'mobile_api/api.php?action=product_related&query_id=' + qid;


    var self = this;
    self.data1 = function() {
        if (timeStorage.get(url1)) {      //vaibhav checking data in local Storage
            $scope.main = timeStorage.get(url1);

            $scope.$broadcast('scroll.refreshComplete');
            console.log(timeStorage.get(url1));
            $ionicLoading.hide();
        }
        else
        {                         //if localstorage is false retrieving data from ajax
            var promise1 = ajaxRequest.send(url1);
            promise1.then(function(data1) {

                timeStorage.set(url1, data1, 4);
                $scope.main = timeStorage.get(url1);        //vaibhav saving data to localstorage
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
                console.log(timeStorage.get(url1));
            });
        }

    };
    self.data1();



//    self.status = function () {
//        for (var key in $scope.extra)
//        {
//            console.log($scope.extra);
//            for (var i = 0; i < $scope.extra[key].length; i++)
//            {
//                $scope.extra[key][i].redheart = 0;
//
//            }
//        }
//
//    };

//loading data of similar and related products
    self.data2 = function() {
        //vaibhav checking data in local Storage
        if (timeStorage.get(url2)) {

            $scope.extra = timeStorage.get(url2);
//            self.status();
            $scope.$broadcast('scroll.refreshComplete');
            $ionicLoading.hide();
        }
        else
        {
            //if localstorage is false retrieving data from ajax
            var promise2 = ajaxRequest.send(url2);
            promise2.then(function(data2) {

                var temp = data2['related'];
                data2['related'] = data2['similar'];
                data2['similar'] = temp;
                timeStorage.set(url2, data2, 4);
                $scope.extra = timeStorage.get(url2);      //vaibhav saving data to localstorage
//                self.status();
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
            });
        }

    };
    self.data2();

    //vaibhav function to format date
//    $scope.doom = function (dateObj) {
//        if (dateObj)
//            var date = $filter('date')(new Date(dateObj), 'dd/MM/yy hh:mm a');
//        else
//            date = $filter('date')(new Date(), 'dd/MM/yy hh:mm a');
//
//        return date;
//    };


    //function to check variant data is available or not
    $scope.variant = function(varient) {
        //    console.log(varient.data);
        if (varient.data != undefined)
            return varient.data.length;
    };

//modal for follow page
    $ionicModal.fromTemplateUrl('partials/modals/homePage/follow.html', {
        scope: $scope,
        animaion: 'slide-in-up',
    }).then(function(modal2) {
        $scope.followModal = modal2;
    });
    $scope.followModalClose = function() {
        $scope.followModal.hide();
        $scope.change12 = 'query1';
    };
//vaibhav function for functionality of follow also in home Ctrl
//    $scope.unfollow = function (i, j, query_id) {
////        $scope.followModal.show();
//        if (i == 0)
//            i = 'related';
//        else if (i == 1)
//            i = 'similar';
//        $scope.extra[i][j].redheart = 0;              //vaibhav: 0  to show grey heart
//    };

//function for follow
    $scope.follow = function(i, j, query_id) {
        $scope.change12 = query_id;
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
        if (i == 0)
            i = 'related';
        else if (i == 1)
            i = 'similar';
        $scope.extra[i][j].redheart = 1;     //vaibhav: 1 to show red heart
    };

    //webObj for holding website selected
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

    //function o set product alert
    $scope.processFollow = function() {
        $ionicLoading.show({
            templateUrl: 'partials/modals/productPage/loading.html',
            scope: $scope

        });
        if (webObj.length == 0)
        {
            $ionicLoading.hide();
            console.log('no website selected');
            window.plugins.toast.showShortTop('no website selected');
        }
        else if (webObj.length > 3)
        {
            $ionicLoading.hide();
            console.log('Please select maximum 3 websites');
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
                var promise = ajaxRequest.send('watch.php?watch=1&watch_website=' + webStr + '&query_id=' + qid + '&userid=' + userid + '&device_id=' + $scope.uuid);
                promise.then(function(data) {
                    webObj = [];
                    console.log(data);
                    $ionicLoading.hide();
                    $scope.followModal.hide();
                    $scope.change12 = 'query1';
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
                    $scope.change12 = 'query1';
                });
            }
            else
            {
                $scope.followModal.hide();

                urlHelper.openLogin();

                $scope.change12 = 'query1';

                console.log('please login to start alert');
                window.plugins.toast.showShortTop('please login to start alert');

            }

        }
    };
//    //vaibhav for view all button
//    $scope.check = function (id, sub, name) {
//        name = name.replace(/[^a-zA-Z0-9]/gi, '');
//        gorouter.gostate('menu.category', {a: id, b: sub, c: name});
//    };

    $ionicModal.fromTemplateUrl('partials/modals/productPage/variantModal.html', {
        scope: $scope,
        animaion: 'slide-in-up'
    }).then(function(modal) {
        $scope.variantModal = modal;
    });
    $scope.variantShow = function(variantData) {
        $scope.variantModal.show();
        $scope.variantData = variantData;
    };
    $scope.variantModalClose = function() {
        $scope.variantModal.hide();
    };

//modal for product trend
//    $ionicModal.fromTemplateUrl('partials/modals/productPage/productTrend.html', {
//        scope: $scope,
//        animaion: 'slide-in-up',
//    }).then(function (modal2) {
//        $scope.productTrendModal = modal2;
//    });
//function  for product trend 

    $scope.productTrend = function() {


        var promise = ajaxRequest.send('price_history_graph.php?work=productgraph&action=dailylowest&query_id=' + qid + '&resource=mobile_api&result_show=json');
        promise.then(function(data) {

            $ionicLoading.hide();
            console.log(data);
            $scope.tableEmpty = data.status;
            if ($scope.tableEmpty == 1)
                $scope.tableEmpty = true
            else
                $scope.tableEmpty = false;
            $scope.tableData = data.json_dataProvider;
            if ($scope.tableData)
            {
                $scope.tableData;
                console.log($scope.tableData);

                var price = [];
                var timeSlot = [];
                var rou = $scope.tableData.length / 10;
                var j = 0;
                for (i = 0; i < $scope.tableData.length; i++)
                {
                    if ($scope.tableData.length < 11)
                        price.push($scope.tableData[i].price);
                    else
                    {
                        if (j < rou && i < $scope.tableData.length - 1 && i != 0)
                        {
                            j++;
                            continue;
                        }
                        else
                        {
                            price.push($scope.tableData[i].price);
                            j = 0;
                        }
                    }

                }
                j = 0;

                for (i = 0; i < $scope.tableData.length; i++)
                {
                    if ($scope.tableData.length < 11)
                        timeSlot.push($scope.tableData[i].timeslot);
                    else
                    {
                        if (j < rou && i < $scope.tableData.length - 1 && i != 0)
                        {
                            j++;
                            continue;
                        }
                        else
                        {
                            timeSlot.push($scope.tableData[i].timeslot);
                            j = 0;
                        }
                    }

                }
                console.log(price.length);
                console.log(timeSlot.length);


                $scope.data = {
                    labels: timeSlot,
                    series: [
                        price
                    ]
                };
                $scope.options = {
                    // Within the series options you can use the series names
                    // to specify configuration that will only be used for the
                    // specific series.
                    series: {
                        'series-1': {
                            lineSmooth: Chartist.Interpolation.step()
                        },
                        'series-2': {
                            lineSmooth: Chartist.Interpolation.simple(),
                            showArea: true
                        },
                        'series-3': {
                            showPoint: false
                        }
                    }
                };
                $scope.responsiveOptions = [
                    ['screen and (min-width: 641px) and (max-width: 1024px)', {
                            showPoint: false,
                            lineSmooth: false
                        }],
                    ['screen and (max-width: 640px)', {
                            showLine: false,
                            axisX: {
                                labelInterpolationFnc: function(value) {
                                    return value[0];
                                }
                            }
                        }]
                ];
                $scope.chart = true;



            }
            else
                window.plugins.toast.showShortTop('chart unavailable');
//            $scope.productTrendModal.show();

        });
        promise.catch(function() {
            console.log('error');
        });
    };
    $scope.productTrend();
    //function to close product trend modal
    $scope.trendModalClose = function() {
        $scope.productTrendModal.hide();
    };
    $scope.stopLoading = function() {
        $ionicLoading.hide();

    };

    //modal for full chart
//    $ionicModal.fromTemplateUrl('partials/modals/productPage/fullChart.html', {
//        scope: $scope,
//        animaion: 'slide-in-up',
//    }).then(function (modal3) {
//        $scope.productFullChart = modal3;
//    });

//    function for full chart
    $scope.fullChart = function() {

        var promise = ajaxRequest.send('price_history_graph.php?work=productgraph&action=fullchart&query_id=' + qid + '&resource=mobile_api&result_show=json');
        promise.then(function(data) {

            console.log(data);
            $scope.tableEmptyFull = data.status;
            if ($scope.tableEmptyFull == 1)
            {
                $scope.tableEmptyFull = true;
                $scope.tableDataFull = data.json_dataProvider;
                $scope.colHeading = data.json_chartScrollbar;
                $scope.tableDataFull;
                var rou = $scope.tableDataFull.length / 10;
                var price = []
                var timeSlot = []
                var k = 0;
                console.log($scope.tableDataFull.length);
                console.log($scope.colHeading);
                for (i = 0; i < $scope.colHeading.length; i++)
                {
                    console.log($scope.colHeading[i].id);
                    var pricein = [];
                    for (j = 0; j < $scope.tableDataFull.length; j++)
                    {
                        if (k < rou && i < $scope.tableDataFull.length - 1 && j != 0)
                        {
                            k++;
                            continue;
                        }
                        else
                        {
                            for (var key in $scope.tableDataFull[j])
                            {
                                if (key == $scope.colHeading[i].id)
                                    pricein.push($scope.tableDataFull[j][key]);
                            }



                            if (i == 0)
                                timeSlot.push($scope.tableDataFull[j]['date']);
                            k = 0;
                        }
                    }
                    price.push(pricein);
                    console.log(price[i].length);
                }

                console.log(timeSlot.length);
                $scope.data2 = {
                    labels: timeSlot,
                    series:
                            price

                };
                $scope.options2 = {
                    // Within the series options you can use the series names
                    // to specify configuration that will only be used for the
                    // specific series.
                    series: {
                        'series-1': {
                            lineSmooth: Chartist.Interpolation.step()
                        },
                        'series-2': {
                            lineSmooth: Chartist.Interpolation.simple(),
                            showArea: true
                        },
                        'series-3': {
                            showPoint: false
                        }
                    }
                };
                $scope.responsiveOptions2 = [
                    ['screen and (min-width: 641px) and (max-width: 1024px)', {
                            showPoint: false,
                            lineSmooth: false
                        }],
                    ['screen and (max-width: 640px)', {
                            showLine: false,
                            axisX: {
                                labelInterpolationFnc: function(value) {
                                    return value[0];
                                }
                            }
                        }]
                ];
            }
            else
                $scope.tableEmptyFull = false;
//            $scope.productFullChart.show();
        });
        promise.catch(function() {
            console.log('error');
        });
    };
    $scope.fullChart();
    //function to hide full char modal
    $scope.fullChartClose = function() {
        $scope.productFullChart.hide();
    };

    //function to fill price field in product trend and full chart
    $scope.Price = function(head, index) {
        var ret;
        for (key in $scope.tableDataFull[index])
        {
            if (key == head)
                ret = $scope.tableDataFull[index][key];
//            console.log($scope.tableDataFull[index][key]);  
        }

        if (ret)
            return ret;
        else
            return '-';
    };

//function to open native browser in mobile for buy now button
    $scope.open = function(url) {
        console.log(url);
        window.open(url, '_system', 'location=yes');
    };
    $scope.chart2 = true;
    $scope.chart1 = false;
    $scope.chart1f = function() {
        $scope.chart1 = false;
        $scope.chart2 = true;
    };
    $scope.chart2f = function() {

        $scope.chart1 = true;
        $scope.chart2 = false;
    };
    $rootScope.defaultButton = false;
//    $scope.watch = function (url, watch_website, watch_price, watch_name, watch_url) {
//        $ionicLoading.show({
//            templateUrl: 'partials/modals/productPage/loading.html',
//            scope: $scope
//        });
//
//        console.log(userid);
//        if (userid)
//        {
//            var promise = ajaxRequest.send('watch.php?watch=1&watch_url=' + watch_url + '&watch_website=' + watch_website + '&watch_price=' + watch_price + '&watch_name=' + watch_name + '&query_id=' + qid + '&userid=' + userid + '&device_id=' + $scope.uuid);
//            promise.then(function (data) {
//
//                $ionicLoading.hide();
//                console.log(data);
//                window.plugins.toast.showShortTop(data.message);
//
//            });
//            promise.catch(function () {
//                console.log('error');
//            });
//
//        }
//        else
//        {
//            $scope.variantModal.hide();
//            $ionicLoading.hide();
//
//            gorouter.gostate('menu.login');
//            window.plugins.toast.showShortTop('Please Login With Price Genie Email To Set Price Alert');
//
//        }
//
//    };
});
