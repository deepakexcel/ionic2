myapps.factory('urlHelper', function($state) {
    var goview = {};
    goview.openHome = function() {
        $state.go("menu.home");
    };
    goview.openCategory = function(data) {
        $state.go("menu.category", data);
    };
    goview.openSearch = function() {
        $state.go('menu.search');
    };
    goview.openProduct = function(data) {
        $state.go('menu.product', data);
    };
    goview.openRegister = function() {
        $state.go('menu.register');
    };
    goview.openLogin = function() {
        $state.go('menu.login');
    };
    goview.openSetting = function() {
        $state.go('menu.setting');
    };
    goview.openFeedback = function() {
        $state.go('menu.feedback');
    };
    goview.openRecent = function() {
        $state.go('menu.recentSearches');
    };
    goview.openAboutus = function() {
        $state.go('menu.Aboutus');
    };
    goview.openStar = function() {
        $state.go('menu.star');
    };
    goview.openNotification = function() {
        $state.go('menu.notification');
    };
    goview.openContactus = function() {
        $state.go('menu.Contactus');
    };
    goview.openYouralert = function() {
        $state.go('menu.YourAlert');
    };
    goview.openWebsite = function() {
        $state.go('menu.website');
    };
    goview.openNotifytext = function() {
        $state.go('menu.notifytext');
    };
    goview.openSuccess = function() {
        $state.go('menu.success');
    };
    goview.openOffline = function() {
        $state.go('menu.offline');
    };
    return goview;
});