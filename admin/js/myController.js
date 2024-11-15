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

    .controller('MainController', function ($scope, $location, $window) {
        const adminInfo = localStorage.getItem('adminInfo');
        $scope.adminInfo = adminInfo ? JSON.parse(adminInfo) : null;
        console.log($scope.adminInfo);
        if ($scope.adminInfo === null) {
            $window.location.href = '/admin/loginhome.html';
        }


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
                    // Only proceed with logout if confirmed
                    localStorage.removeItem('token');
                    localStorage.removeItem('adminInfo');
                    $window.location.href = '/admin/loginhome.html'; // Redirect to login page
                }
            });
        };

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
    // Controller AngularJS
    .controller('nhaphanphoiCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
        const adminInfo = localStorage.getItem('adminInfo');
        $scope.adminInfo = adminInfo ? JSON.parse(adminInfo) : null;
        console.log($scope.adminInfo);
       const info = localStorage.getItem('token')
       console.log(info)
        $scope.distributor = {};
        $scope.successMessage = "";
        $scope.errorMessage = "";
    
        // Hàm tạo tài khoản nhà phân phối
        $scope.createDistributor = function () {
            // Kiểm tra mật khẩu và xác nhận mật khẩu
            if ($scope.distributor.matkhau !== $scope.distributor.confirmPassword) {
                $scope.errorMessage = "Mật khẩu và xác nhận mật khẩu không khớp.";
                return;
            }
    
            // Kiểm tra tất cả các trường đầu vào
            if (!$scope.distributor.username || !$scope.distributor.matkhau || !$scope.distributor.email || !$scope.distributor.sdt || !$scope.distributor.diaChi || !$scope.distributor.tenCuaHang) {
                $scope.errorMessage = "Vui lòng điền đầy đủ thông tin!";
                return;
            }
    
            // Hiển thị hộp thoại yêu cầu nhập mã PIN
            Swal.fire({
                title: 'Xác thực mã PIN',
                input: 'password',
                inputPlaceholder: 'Nhập mã PIN...',
                showCancelButton: true,
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy',
            }).then((result) => {
                if (result.isConfirmed) {
                    const adminPin = result.value;
    
                    // Kiểm tra mã PIN hợp lệ
                    if (!adminPin || adminPin.length < 0) {
                        Swal.fire('Lỗi!', 'Mã PIN phải có ít nhất 4 ký tự!', 'error');
                        return;
                    }
    
                    // Tạo đối tượng dữ liệu tài khoản nhà phân phối
                    const taiKhoanData = {
                        taiKhoan: {
                            taikhoan: $scope.distributor.username,
                            matkhau: $scope.distributor.matkhau,
                            email: $scope.distributor.email,
                            sdt: $scope.distributor.sdt,
                            diaChi: $scope.distributor.diaChi,
                            nhaPhanPhoi: {
                                tenCuaHang: $scope.distributor.tenCuaHang,
                            },
                        },
                        adminPin: adminPin
                    };
    
                    // Gọi API tạo tài khoản
                    $http.post('http://localhost:9999/api/admin/create-distributor', taiKhoanData, {
                        headers: {
                            'Authorization': 'Bearer ' + $window.localStorage.getItem('token')
                        }
                    })
                    .then(function (response) {
                        // Nếu tạo tài khoản thành công, thông báo thành công
                        Swal.fire('Thành công!', 'Tài khoản đã được tạo.', 'success');
                        $scope.successMessage = "Tài khoản nhà phân phối đã được tạo thành công!";
                        $scope.errorMessage = "";
                        $scope.distributor = {};  // Reset form
                    }, function (error) {
                        // Nếu có lỗi, thông báo lỗi
                        if (error.data) {
                            $scope.errorMessage = error.data.message || "Có lỗi xảy ra. Vui lòng thử lại!";
                        } else {
                            $scope.errorMessage = "Không thể kết nối đến máy chủ. Vui lòng thử lại!";
                        }
                        $scope.successMessage = "";
                    });
                }
            });
        };
    
    }])
    
    
    
    
    






    .controller('uudaiCtrl', function ($scope) { })
    .controller('chitietkhCtrl', function ($scope) { })
    .controller('chitietnppCtrl', function ($scope) { })
    .controller('uudaithemCtrl', function ($scope) { })

function goBack() {
    window.history.back();
}