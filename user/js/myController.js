// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
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
// Định nghĩa các route

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/user/home', {
            templateUrl: 'html/home.html',
            controller: 'homeCtrl'
        })
        .when('/user/dssp', {
            templateUrl: 'html/ListProduct.html',
            controller: 'dsspCtrl'
        })
        .when('/user/chitiet', {
            templateUrl: 'html/detalproduct.html',
            controller: 'chitietCtrl'
        })
        .when('/user/profileuser', {
            templateUrl: 'html/profileuser.html',
            controller: 'profileuserCtrl'
        })
        .when('/user/spyeuthich', {
            templateUrl: 'html/favourite.html',
            controller: 'spyeuthichCtrl'
        })
        .when('/user/spvang', {
            templateUrl: 'html/Product_Gold.html',
            controller: 'spvangCtrl'
        })
        .when('/user/giavang', {
            templateUrl: 'html/giavang.html',
            controller: 'giavangCtrl'
        })
        .when('/user/giohang', {
            templateUrl: 'html/Shopping_Cart.html',
            controller: 'giohangCtrl'
        })
        .when('/user/thanhtoan', {
            templateUrl: 'html/thanhtoan.html',
            controller: 'thanhtoanCtrl'
        })

        .otherwise({
            redirectTo: '/user/home'
        });
}])

    .controller('MainController', function ($scope, $location) {


    })


    .controller('homeCtrl', function ($scope) {

    })
    .controller('profileuserCtrl', function ($scope) {

    })
    .controller('spyeuthichCtrl', function ($scope) {

    })
    .controller('spvangCtrl', function ($scope) {

    })
    .controller('giavangCtrl', function ($scope) {

    })
    .controller('giohangCtrl', function ($scope) {

    })
    .controller('thanhtoanCtrl', function ($scope) {

    })




    .controller("boyCtrl", function ($scope, $interval, $http, dataService, $rootScope) {


    })


    .controller('dsspCtrl', function ($scope) {

    })
    .controller('chitietCtrl', function ($scope, $routeParams, dataService) {


    })
    .controller('CARTCtrl', function ($scope, $rootScope) {

    })
    .controller('trangthanhtoanCtrl', function ($scope, $http, $location) {


    })
function goBack() {
    window.history.back();
}