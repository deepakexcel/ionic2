myappc.controller('feedbackCtrl', function($scope, $ionicLoading, ajaxRequest, $ionicScrollDelegate, $http) {
    var self = this;
    $scope.text = {
        show: 'What do you want to say about the product!',
        email: '',
        name: ''
    };

    $scope.closePodcastsLoader = function() {
        $ionicLoading.hide();
    };
    $scope.again = function() {
        if (!$scope.text.show)
            $scope.text.show = 'What do you want to say about the product!';
    };

    $scope.feedBack = function() {

        $ionicScrollDelegate.scrollTop(true);
        if (!$scope.text.name)
        {
            console.log('please enter your name');
            window.plugins.toast.showShortTop('please enter your name');
        }
        else if (!$scope.text.email)
        {
            console.log('please enter a valid email');
            window.plugins.toast.showShortTop('please enter a valid email');
        }
        else if (!$scope.text.show)
        {
            console.log('please enter a some message');
            window.plugins.toast.showShortTop('please enter a some message');
        }
        else
        {
            $ionicLoading.show({
                templateUrl: 'partials/modals/productPage/loading.html',
                scope: $scope
            });
            var data = {
                email: $scope.text.email,
                feed_msg: $scope.text.show,
                name: $scope.text.name,
                pageURL: 'From Mobile App'
            };

            console.log(data);
            $http({method: 'POST',
                url: 'http://pricegenie.co/dev/sendmail.php',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: data
            })
                    .success(function(data) {
                        console.log(data);
                        console.log('Thanking you for your valuable feedback');
                        $ionicLoading.hide();
                        $scope.text.name = '';
                        $scope.text.email = '';
                        $scope.text.show = 'What do you want to say about the product!';
                        window.plugins.toast.showShortTop('Thanking you for your valuable feedback');
                    })
                    .error(function() {
                        console.log('error');
                        window.plugins.toast.showShortTop('Feedback not submitted, check network');
                    });
        }
    };


});