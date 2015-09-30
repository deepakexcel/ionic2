myappc.controller('star', function($scope, $ionicNavBarDelegate, ajaxRequest, $rootScope, urlHelper, timeStorage, $ionicLoading) {
//    $rootScope.defaultButton = false;

    var e = $ionicNavBarDelegate.showBar(false);
    console.log(e);
    var self = this;
    $scope.term = {
        text: ''
    };
    self.status = function(star) {
        for (var key in star)
        {
            for (var i = 0; i < star[key].length; i++)
            {
                star[key][i].show = 'false';

            }
        }
        return star;
    };
    try {
        $scope.uuid = device.uuid;
        console.log($scope.uuid);
        $scope.phoneName = device.platform;
        console.log($scope.phoneName);
    }
    catch (e) {
        console.log(e);
    }
    $ionicLoading.show({
        templateUrl: 'partials/modals/productPage/loading.html',
        scope: $scope
    });
    $scope.closePodcastsLoader = function() {
        $ionicLoading.hide();
    };
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
    if (timeStorage.get('star'))
    {
        $scope.star = timeStorage.get('star');
        $scope.star = self.status($scope.star);
        $scope.webs = [];

        $ionicLoading.hide();
        for (i = 0; i < $scope.star.all_websites.length; i++)
        {
            $scope.webs.push({'webname': $scope.star.all_websites[i], 'show': 'false'});
        }

    }
    else
    {
        var promise = ajaxRequest.send('mobile_api/api.php?action=all_deals&only_deal=1');
        promise.then(function(data) {
            timeStorage.set('star', data, 24);
            $scope.star = timeStorage.get('star');
            $scope.star = self.status(data);
            $scope.webs = [];

            $ionicLoading.hide();
            for (i = 0; i < $scope.star.all_websites.length; i++)
            {
                $scope.webs.push({'webname': $scope.star.all_websites[i], 'show': 'false'});
            }
            console.log($scope.webs);
        });
    }


    $scope.mygo = function() {
        console.log('ojhnkkn');
        $rootScope.defaultButton = true;
        urlHelper.openNotification();
    };


    var catObj = [];
    $scope.addCat = function(cat, i) {

        catObj.push(cat);
        console.log(catObj);
        $scope.star.all_cats[i].show = i;
        $scope.next = true;
        $scope.next2 = true;
        $rootScope.catObj = catObj;
    };
    $scope.subCat = function(cat, j) {
        for (i = 0; i < catObj.length; i++)
        {
            if (catObj[i] == cat)
                catObj.splice(i, 1);
        }

        console.log(catObj);
        $scope.star.all_cats[j].show = 'false';
        if (catObj.length == 0)
        {
            $scope.next2 = false;
            $scope.next = false;
        }
        $rootScope.catObj = catObj;
    };
    $scope.addCatAll = function() {
        catObj = [];
        for (i = 0; i < $scope.star.all_cats.length; i++)
        {
            catObj.push($scope.star.all_cats[i].cat_id);

            $scope.star.all_cats[i].show = i;
            $scope.next = true;
            $scope.next2 = true;

        }
        $rootScope.catObj = catObj;
        console.log(catObj);
    };
    $scope.subCatAll = function() {
        catObj = [];
        for (i = 0; i < $scope.star.all_cats.length; i++)
        {
            $scope.star.all_cats[i].show = 'false';
        }
        $scope.next = false;
        $scope.next2 = false;
        $rootScope.catObj = catObj;
        console.log(catObj);
    };

    var webObj = [];
    $scope.addWeb = function(web, i) {

        webObj.push(web);
        console.log(webObj);
        $scope.webs[i].show = i;
        $scope.next = true;
        $scope.next2 = true;
        $rootScope.webObj = webObj;
    };
    $scope.subWeb = function(web, j) {
        for (i = 0; i < webObj.length; i++)
        {
            if (webObj[i] == web)
                webObj.splice(i, 1);
        }

        console.log(webObj);
        $scope.webs[j].show = 'false';
        if (webObj.length == 0)
        {
            $scope.next = false;
        }
        $rootScope.webObj = webObj;
    };
    $scope.addWebAll = function() {
        webObj = [];
        for (i = 0; i < $scope.webs.length; i++)
        {
            webObj.push($scope.webs[i].webname);

            $scope.webs[i].show = i;
            $scope.next = true;
            $scope.next2 = true;

        }
        $rootScope.webObj = webObj;
        console.log(webObj);
    };
    $scope.subWebAll = function() {
        webObj = [];
        for (i = 0; i < $scope.star.all_cats.length; i++)
        {
            $scope.webs[i].show = 'false';
        }
        $scope.next = false;
        $scope.next2 = false;
        $rootScope.webObj = webObj;
        console.log(webObj);
    };
    $scope.notify = function() {
        $ionicLoading.show({
            templateUrl: 'partials/modals/productPage/loading.html',
            scope: $scope
        });
        console.log($rootScope.webObj);
        console.log($rootScope.catObj);
        var comma = '';
        var webStr = '';
        for (i = 0; i < $rootScope.webObj.length; i++)
        {
            if ($rootScope.webObj.length > 1 && $rootScope.webObj.length - 1 != i)
                comma = ',';
            else
                comma = '';
            webStr += $rootScope.webObj[i] + comma;
        }
        comma = '';
        var catStr = '';
        for (i = 0; i < $rootScope.catObj.length; i++)
        {
            if ($rootScope.catObj.length > 1 && $rootScope.catObj.length - 1 != i)
                comma = ',';
            else
                comma = '';
            catStr += $rootScope.catObj[i] + comma;
        }

        console.log($scope.term.text);
        console.log(webStr);
        console.log(catStr);
        var promise = ajaxRequest.send('mobile_api/api.php?action=deal_notify&cat=' + catStr + '&term=' + $scope.term.text + '&website=' + webStr + '&device_id=' + $scope.uuid);
        promise.then(function(data) {
            $ionicLoading.hide();
            console.log(data);
            if (data['status'] == 1)
            {
                urlHelper.openSuccess();
                self.status();
                $rootScope.webObj = [];
                $rootScope.catObj = [];
            }
            else
                self.toast('connectivity problem');
        });
        promise.catch(function(data) {
            $ionicLoading.hide();
            self.toast('connectivity problem');
            console.log(data);
        });
    };
});