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
}]);

app.controller('MainController', function ($scope, $location, $window) {
    const adminInfo = localStorage.getItem('adminInfo');
    $scope.adminInfo = adminInfo ? JSON.parse(adminInfo) : null;

    // If adminInfo is null, redirect to login page
    if (!$scope.adminInfo) {
        $window.location.href = '/admin/loginhome.html';
    }

    // Logout function
    $scope.logout = function () {
        Swal.fire({
            title: 'Thông Báo !',
            text: 'Bạn có muốn đăng xuất không',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'có',
            cancelButtonText: 'không',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');
                localStorage.removeItem('adminInfo');
                $window.location.href = '/admin/loginhome.html'; // Redirect to login page
            }
        });
    };

    // Function to change route
    $scope.changeRoute = function (route) {
        $location.path(route);
    };
});

app.controller('bangdieukhienCtrl', function ($scope) { });
app.controller('quanlysanphamCtrl', function ($scope) { });
app.controller('quanlysanphamthemCtrl', function ($scope) { });
app.controller('quanlysanphamsuaCtrl', function ($scope) { });
app.controller('quanlydonhangCtrl', function ($scope) { });
app.controller('baocaoCtrl', function ($scope) { });
app.controller('quanlytaikhoanCtrl', function ($scope) { });
app.controller('khachhangCtrl', function ($scope) { });

app.controller('nhaphanphoiCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
   

    // Fetch approved distributors
    $scope.getApprovedDistributors = function () {
       
        $http.get('http://localhost:9999/api/adctrl/approved', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            $scope.approvedDistributors = response.data;
            
        }, function (error) {
            console.log("Error fetching approved distributors:", error);
        });
    };

    // Fetch pending distributors
    $scope.getPendingDistributors = function () {
        $http.get('http://localhost:9999/api/adctrl/pending', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            $scope.pendingDistributors = response.data;
        }, function (error) {
            console.log("Error fetching pending distributors:", error);
        });
    };

    $scope.getLockedDistributors = function () {
        $http.get('http://localhost:9999/api/adctrl/locked', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            $scope.lockedDistributors = response.data;
            console.log($scope.lockedDistributors);
        }, function (error) {
            console.log("Error fetching locked distributors:", error);
        });
    };
    

    // Lock distributor account (change role to 5)
    $scope.lockAccount = function (id) {
        $http.post('http://localhost:9999/api/adctrl/lock/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
     
        }).then(function (response) {
            alert(response.data);
            $scope.getApprovedDistributors();
        }, function (error) {
            console.log("Error locking account:", error);
        });
    };

    // Approve distributor account (change role to 2)
    $scope.approveAccount = function (id) {
        $http.post('http://localhost:9999/api/adctrl/approve/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
      
        }).then(function (response) {
            alert(response.data);
            $scope.getLockedDistributors();
            $scope.getApprovedDistributors();
            $scope.getPendingDistributors();
        }, function (error) {
            console.log("Error approving account:", error);
        });
    };

    // Reject distributor account (delete account)
    $scope.rejectAccount = function (id) {
        $http.post('http://localhost:9999/api/adctrl/reject/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            alert(response.data);
            $scope.getLockedDistributors();
            $scope.getApprovedDistributors();
            $scope.getPendingDistributors();
        }, function (error) {
            console.log("Error rejecting account:", error);
        });
    };
    $scope.unlockDistributorAccount = function (id) {
        $http.post('http://localhost:9999/api/adctrl/unlock/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            alert(response.data);
            $scope.getLockedDistributors();
            $scope.getApprovedDistributors();
            $scope.getPendingDistributors();
        }, function (error) {
            console.log("Error unlocking account:", error);
        });
    }

    // Initial data fetch
    $scope.getApprovedDistributors();
    $scope.getPendingDistributors();
    $scope.getLockedDistributors();
}]);

app.controller('uudaiCtrl', function ($scope) { });
app.controller('chitietkhCtrl', function ($scope) { });
app.controller('chitietnppCtrl', function ($scope) { });
app.controller('uudaithemCtrl', function ($scope) { });

// Go back function
function goBack() {
    window.history.back();
}
