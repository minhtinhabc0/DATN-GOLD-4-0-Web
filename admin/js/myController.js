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
        .when('/admin/bangdieukhien', {
            templateUrl: 'html/bangdieukhien.html',
            controller: 'bangdieukhienCtrl'
        })
        .when('/admin/quanlysanpham', {
            templateUrl: 'html/quanlysanpham.html',
            controller: 'quanlysanphamCtrl'
        })
        .when('/admin/quanlysanphamthem', {
            templateUrl: 'html/quanlysanphamthem.html',
            controller: 'quanlysanphamthemCtrl'
        })
        .when('/admin/quanlysanphamsua', {
            templateUrl: 'html/quanlysanphamsua.html',
            controller: 'quanlysanphamsuaCtrl'
        })
        .when('/admin/quanlytaikhoan', {
            templateUrl: 'html/quanlytaikhoan.html',
            controller: 'quanlytaikhoanCtrl'
        })
        .when('/admin/quanlydonhang', {
            templateUrl: 'html/quanlydonhang.html',
            controller: 'quanlydonhangCtrl'
        })
        .when('/admin/khachhang', {
            templateUrl: 'html/khachhang.html',
            controller: 'khachhangCtrl'
        })
        .when('/admin/chitietkh', {
            templateUrl: 'html/chitietkh.html',
            controller: 'chitietkhCtrl'
        })
        .when('/admin/nhaphanphoi', {
            templateUrl: 'html/nhaphanphoi.html',
            controller: 'nhaphanphoiCtrl'
        })
        .when('/admin/chitietnpp', {
            templateUrl: 'html/chitietnpp.html',
            controller: 'chitietnppCtrl'
        })
        .when('/admin/baocao', {
            templateUrl: 'html/baocao.html',
            controller: 'baocaoCtrl'
        })
        .when('/admin/uudai', {
            templateUrl: 'html/uudai.html',
            controller: 'uudaiCtrl'
        })
        .when('/admin/uudaithem', {
            templateUrl: 'html/uudaithem.html',
            controller: 'uudaithemCtrl'
        })

        .otherwise({
            redirectTo: '/admin/bangdieukhien'
        });


}])

    .controller('MainController', function ($scope, $location) {
        
    })

    .controller('bangdieukhienCtrl', function ($scope) {

     })
    .controller('quanlysanphamCtrl', function ($scope) { })
    .controller('quanlysanphamthemCtrl', function ($scope) { })
    .controller('quanlysanphamsuaCtrl', function ($scope) { })
    .controller('quanlydonhangCtrl', function ($scope) { })
    .controller('baocaoCtrl', function ($scope) { })
    .controller('quanlytaikhoanCtrl', function ($scope) { })
    .controller('khachhangCtrl', function ($scope) { })
    .controller('nhaphanphoiCtrl', function ($scope) { })
    .controller('uudaiCtrl', function ($scope) { })
    .controller('chitietkhCtrl', function ($scope) { })
    .controller('chitietnppCtrl', function ($scope) { })
    .controller('uudaithemCtrl', function ($scope) { })

function goBack() {
    window.history.back();
}