

myapps.factory('timeStorage', ['$localStorage', function($localStorage) {
        var timeStorage = {};
        timeStorage.cleanUp = function() {
            var cur_time = new Date().getTime();
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if (key.indexOf('_expire') === -1) {
                    var new_key = key + "_expire";
                    var value = localStorage.getItem(new_key);
                    if (value && cur_time > value) {
                        localStorage.removeItem(key);
                        localStorage.removeItem(new_key);
                    }
                }
            }
        };
        timeStorage.remove = function(key) {
            this.cleanUp();
            var time_key = key + '_expire';
            $localStorage[key] = false;
            $localStorage[time_key] = false;
        };
        timeStorage.set = function(key, data, hours) {
            this.cleanUp();
            $localStorage[key] = data;
            var time_key = key + '_expire';
            var time = new Date().getTime();
            time = time + (hours * 1 * 60 * 60 * 1000);
            $localStorage[time_key] = time;
        };
        timeStorage.get = function(key) {
            this.cleanUp();
            var time_key = key + "_expire";
            if (!$localStorage[time_key]) {
                return false;
            }
            var expire = $localStorage[time_key] * 1;
            if (new Date().getTime() > expire) {
                $localStorage[key] = null;
                $localStorage[time_key] = null;
                return false;
            }
            return $localStorage[key];
        };
        return timeStorage;
    }]);

myapps.factory('ajaxRequest',
        ['$http', '$q', '$log',
            function($http, $q, $log) {
                return {
                    hasInit: false,
                    init: function() {
                    },
                    url: function(api) {

                        return 'http://pricegenie.co/' + api;

                    },
                    send: function(api, data, method) {
                        var self = this;
                        if (!self.hasInit) {
                            self.init();
                        }
                        var silent = false;
                        if (!angular.isDefined(method)) {
                            method = 'POST';
                        } else {
                            if (method === true) {
                                silent = true;
                                method = 'POST';
                            }
                        }
                        var def = $q.defer();

//                        delete $http.defaults.headers.common['X-Requested-With'];
                        var http = $http({
                            url: this.url(api),
                            method: method,
                            headers: {'Content-Type': 'application/json;charset=utf-8'},
                            cache: false,
                            data: JSON.stringify(data),
                            timeout: 60000
                        });
                        http.success(function(data) {


                            def.resolve(data);

                        });


                        http.error(function() {
                            $log.warn('500 Error');
                            def.reject('500');
                        });
                        return def.promise;
                    }
//                    ,
//                       sendEncoded: function(api, data, method) {
//                        var self = this;
//                        if (!self.hasInit) {
//                            self.init();
//                        }
//                        var silent = false;
//                        if (!angular.isDefined(method)) {
//                            method = 'POST';
//                        } else {
//                            if (method === true) {
//                                silent = true;
//                                method = 'POST';
//                            }
//                        }
//                        var def = $q.defer();
//
////                        delete $http.defaults.headers.common['X-Requested-With'];
//                        var http = $http({
//                            url: this.url(api),
//                            method: method,
//                            headers: {'Content-Type': 'application/json;charset=utf-8'},
//                            cache: false,
//                            data: JSON.stringify(data),
//                            timeout: 60000
//                        });
//                        http.success(function(data) {
//
//
//                            def.resolve(data);
//
//                        });
//
//
//                        http.error(function() {
//                            $log.warn('500 Error');
//                            def.reject('500');
//                        });
//                        return def.promise;
//                    }
                };
            }
        ]);



