(() => {
    "use strict";
    const forms = document.querySelectorAll(".needs-validation");
    Array.from(forms).forEach((form) => {
        form.addEventListener(
            "submit",
            (event) => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add("was-validated");
            },
            false
        );
    });
})();

var app = angular.module("myapp", ['ngRoute']);
app.controller("MainController", function ($scope, $location) {
    $scope.changeRoute = function (route) {
        $location.path(route);
    };
});

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/distributor/bangdieukhien', {
            templateUrl: '/distributor/html/bangdieukhien.html',
            controller: 'bangdieukhienCtrl'
        })
        .when('/distributor/quanlysanpham', {
            templateUrl: '/distributor/html/quanlysanpham.html',
            controller: 'quanlysanphamCtrl'
        })
        .when('/distributor/quanlydonhang', {
            templateUrl: '/distributor/html/quanlydonhang.html',
            controller: 'quanlydonhangCtrl'
        })
        .when('/distributor/baocao', {
            templateUrl: '/distributor/html/baocao.html',
            controller: 'baocaoCtrl'
        })
        .otherwise({
            redirectTo: '/distributor/bangdieukhien'
        });
}]);

app.controller('bangdieukhienCtrl', function ($scope) {
    // Vẽ biểu đồ doanh thu trên bảng điều khiển
    const ctx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(ctx, {
        type: 'bar', // Hoặc loại biểu đồ bạn muốn
        data: {
            labels: ['January', 'February', 'March', 'April'],
            datasets: [{
                label: 'Doanh thu',
                data: [3000, 2000, 5000, 4000],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

app.controller('quanlysanphamCtrl', function ($scope) { });

app.controller('quanlydonhangCtrl', function ($scope) { });

app.controller('baocaoCtrl', function ($scope) {
    // Vẽ biểu đồ doanh thu trong báo cáo
    const ctx1 = document.getElementById('revenueChart1').getContext('2d');
    const revenueChart1 = new Chart(ctx1, {
        type: 'line', // Hoặc loại biểu đồ bạn muốn
        data: {
            labels: ['May', 'June', 'July', 'August'],
            datasets: [{
                label: 'Doanh thu',
                data: [5000, 7000, 6000, 8000],
                fill: false,
                borderColor: 'rgba(153, 102, 255, 1)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

function goBack() {
    window.history.back();
}
