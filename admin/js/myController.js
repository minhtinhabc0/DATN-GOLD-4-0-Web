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
            title: 'Bạn muốn đăng xuất?',
            text: 'Nếu bạn đăng xuất, bạn sẽ phải đăng nhập lại để tiếp tục.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '<i class="fa fa-check"></i> Có, đăng xuất',
            cancelButtonText: '<i class="fa fa-times"></i> Không, quay lại',
            confirmButtonColor: '#d4af37', // Nền vàng ánh kim
            cancelButtonColor: '#f44336', // Nền đỏ tươi
            reverseButtons: true,
            customClass: {
                title: 'swal-title', // Bạn có thể thêm kiểu tùy chỉnh cho tiêu đề
                text: 'swal-text', // Tùy chỉnh nội dung thông báo
                cancelButton: 'swal-btn-cancel',
                confirmButton: 'swal-btn-confirm'
            }
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
app.controller('quanlysanphamCtrl', function ($scope, $http) {
    


    $scope.products = [];
    $scope.filteredProducts = []; // Danh sách sản phẩm đã được lọc
    $scope.selectedFilter = '3'; // Mặc định là "Tất cả"
    $scope.searchQuery = '';

    $scope.loadProducts = function() {
        $http.get('http://localhost:9999/api/adctrl/productsall', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function(response) {
            $scope.products = response.data;
            console.log($scope.products);
            $scope.filterProducts(); 
        }, function(error) {
            console.log('Lỗi khi lấy sản phẩm:', error);
        });
    };

    $scope.filterProducts = function() {
        $scope.filteredProducts = $scope.products.filter(function(product) {
            let matchesStatus = false;
            if ($scope.selectedFilter == '1') {
                matchesStatus = product.trangThai == true; // Giả sử trạng thái duyệt là 'duyet'
            } else if ($scope.selectedFilter == '2') {
                matchesStatus = product.trangThai == false; // Giả sử trạng thái chưa duyệt là 'chuaDuyet'
            } else {
                matchesStatus = true; // Tất cả sản phẩm
            }
    
            // Lọc theo tên sản phẩm
            let matchesSearch = product.tenSanPham.toLowerCase().includes($scope.searchQuery.toLowerCase()) ;

    
            return matchesStatus && matchesSearch;
        });
    };

    $scope.loadProducts();

});
app.controller('quanlysanphamthemCtrl', function ($scope) { });
app.controller('quanlysanphamsuaCtrl', function ($scope) { });
app.controller('quanlydonhangCtrl', function ($scope) { });
app.controller('baocaoCtrl', function ($scope) { });
app.controller('quanlytaikhoanCtrl', function ($scope) { });
app.controller('khachhangCtrl', function ($scope, $http, $window) {
    $scope.viewUserDetail = function (user) {

        $scope.useris = user;
    };
    $scope.UserAccount = function () {

        $http.get('http://localhost:9999/api/adctrl/ngdung', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            $scope.users = response.data;
            console.log($scope.users);

        }, function (error) {
            console.log("Error fetching approved distributors:", error);
        });
    };
    $scope.UserAccountband = function () {
        $http.get('http://localhost:9999/api/adctrl/ngdungband', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            $scope.users1 = response.data;
            console.log($scope.users1);

        }, function (error) {
            console.log("Error fetching approved distributors:", error);
        });
    }

    $scope.UserbandAccount = function (id) {
        $http.post('http://localhost:9999/api/adctrl/ngdungband/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            alert(response.data);
            $scope.UserAccount();
        }, function (error) {
            console.log("Error locking account:", error);
        });
    }
    $scope.Userunbandaccount = function (id) {
        $http.post('http://localhost:9999/api/adctrl/ngdungunband/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            alert(response.data);
            $scope.UserAccount();
        }, function (error) {
            console.log("Error unlocking account:", error);
        });
    }
    $scope.UserAccount();
    $scope.UserAccountband();
});

app.controller('nhaphanphoiCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {

    $scope.viewDistributorDetail = function (npp) {
        // Store the selected distributor's data in the distributorDetail variable
        $scope.distributorDetail = npp;
    };

    // Fetch approved distributors
    $scope.getApprovedDistributors = function () {

        $http.get('http://localhost:9999/api/adctrl/approved', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            $scope.approvedDistributors = response.data;
            console.log($scope.approvedDistributors);

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
            console.log($scope.pendingDistributors);
        }, function (error) {
            console.log("Error fetching pending distributors:", error);
        });
    };
    $scope.Deletenpp = function (id) {
        $http.post('http://localhost:9999/api/adctrl/delete/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            alert(response.data);
            $scope.getLockedDistributors();
            $scope.getApprovedDistributors();
            $scope.getPendingDistributors();
        }, function (error) {
            console.log("Error deleting distributor:", error);
            $scope.getLockedDistributors();
            $scope.getApprovedDistributors();
            $scope.getPendingDistributors();
        })
    }



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
            $scope.getLockedDistributors();
            $scope.getApprovedDistributors();
            $scope.getPendingDistributors();
        }, function (error) {
            console.log("Error locking account:", error);
            $scope.getLockedDistributors();
            $scope.getApprovedDistributors();
            $scope.getPendingDistributors();
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
            $scope.getLockedDistributors();
            $scope.getApprovedDistributors();
            $scope.getPendingDistributors();
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
            $scope.getLockedDistributors();
            $scope.getApprovedDistributors();
            $scope.getPendingDistributors();
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
            $scope.getLockedDistributors();
            $scope.getApprovedDistributors();
            $scope.getPendingDistributors();
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
