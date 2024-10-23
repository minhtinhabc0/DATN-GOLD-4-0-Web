angular.module('myApp', [])
.controller('GoldPriceController', ['$scope', '$http', function($scope, $http) {
    // Function to fetch gold prices
    $scope.fetchGoldPrices = function() {
        const apiUrl = 'http://api.btmc.vn/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v';

        $http.get(apiUrl, { responseType: 'document' })
            .then(function(response) {
                const xmlData = response.data;
                const dataList = xmlData.getElementsByTagName('Data');

                $scope.goldPrices = [];
                for (let i = 0; i < dataList.length; i++) {
                    const dataItem = dataList[i];
                    $scope.goldPrices.push({
                        name: dataItem.getAttribute('n_' + (i + 1)),
                        priceBuy: dataItem.getAttribute('pb_' + (i + 1)),
                        priceSell: dataItem.getAttribute('ps_' + (i + 1)),
                        date: dataItem.getAttribute('d_' + (i + 1))
                    });
                }
            })
            .catch(function(error) {
                console.error('Error fetching gold prices:', error);
            });
    };

    // Call the function to fetch gold prices
    $scope.fetchGoldPrices();
}]);
