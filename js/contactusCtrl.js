//contact us @siddharth
myappc.controller('ContactusCtrl', function($scope, $ionicHistory) {

    $scope.backHistory = function() {   //this is for back button 
        $ionicHistory.goBack();
    };

});

