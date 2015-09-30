myappc.controller('recentSearches', function($scope, $rootScope, timeStorage) {
//    $rootScope.defaultButton = true;
    var data1;

    if (timeStorage.get('myRecentSearch'))
    {

        data1 = timeStorage.get('myRecentSearch');

        for (i = 0; i < data1.length; i++)
        {
            var cur_date = new Date();
            cur_date = cur_date.getTime();

            var date = new Date(data1[i].query_date);
            date = date.getTime();
            var diff = (cur_date - date);
            diff = Math.round(diff / (1000 * 60 * 60 * 24));
            data1[i].diff = diff;

        }
        var swap;
        for (c = 0; c < (data1.length - 1); c++)
        {
            for (d = 0; d < data1.length - c - 1; d++)
            {
                if (data1[d].diff > data1[d + 1].diff)
                {
                    swap = data1[d];
                    data1[d] = data1[d + 1];
                    data1[d + 1] = swap;
                }
            }
        }
        var count = 0;
        for (c = 0; c < (data1.length); c++)
        {
            for (d = 0; d < data1.length; d++)
            {
                if (data1[d].diff == data1[c].diff)
                {
                    count++;
                    data1[c].count = count;
                }
                else
                    count = 0;
            }
            count = 0;
        }


        var oldDiff;
        var count = 1;
        for (i = 0; i < data1.length; i++)
        {
            if (data1[i].diff == oldDiff)
            {
                console.log(oldDiff);
                data1[i].show = '';

            }
            else
            {
                data1[i].show = 'show';

            }

            oldDiff = data1[i].diff;

        }
        console.log(data1);
        $scope.recentData = data1;

    }
    else
    {
        data1 = [{msg: 'No Recently Viewed Products Yet!'}];
        $scope.recentData = data1;
    }
    $scope.closePodcastsLoader = function() {
        $ionicLoading.hide();
    };

});