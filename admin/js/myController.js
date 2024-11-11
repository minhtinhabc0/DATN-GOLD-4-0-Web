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
        const ADInfor = localStorage.getItem('ADInfor');
        $scope.ADInfor = ADInfor ? JSON.parse(ADInfor) : null;
        console.log($scope.ADInfor);
      

     
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
                    localStorage.removeItem('ADInfor');
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
    .controller('nhaphanphoiCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {

        // Hàm kiểm tra token hợp lệ và quyền admin
        function isTokenValid() {
            var token = localStorage.getItem('token');
            console.log(token);
            if (!token) {
                console.error('Token không hợp lệ!');
                return false;
            }
    
            // Giải mã token và kiểm tra quyền admin
            var decodedToken = parseJwt(token);
            if (decodedToken.roles !== 'ROLE_ADMIN') {
                console.error('Bạn không có quyền tạo nhà phân phối.');
                return false;
            }
    
            return true;
        }
    
        // Hàm giải mã token
        function parseJwt(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
    
            return JSON.parse(jsonPayload);
        }
    
        // Kiểm tra token khi bắt đầu
        if (!isTokenValid()) {
            return;
        }
    
        // Object chứa thông tin tài khoản nhà phân phối mới
        $scope.distributor = {};
    
        // Hàm tạo nhà phân phối
        $scope.createDistributor = function () {
            // Kiểm tra token mỗi lần thực hiện thao tác
            if (!isTokenValid()) {
                $scope.errorMessage = "Token không hợp lệ!";
                return;
            }
    
            // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp không
            if ($scope.distributor.matkhau !== $scope.distributor.confirmPassword) {
                $scope.errorMessage = "Mật khẩu và xác nhận mật khẩu không khớp.";
                return;
            }
    
            // Khai báo taiKhoanData từ các trường dữ liệu trong distributor
            var taiKhoanData = {
                taikhoan: $scope.distributor.username, // Gán username
                matkhau: $scope.distributor.matkhau, // Gán password
                hoTen: $scope.distributor.hoTen, // Gán họ tên
                email: $scope.distributor.email, // Gán email
                soDienThoai: $scope.distributor.soDienThoai, // Gán số điện thoại
                diaChi: $scope.distributor.diaChi // Địa chỉ
            };
    
            // API endpoint
            const apiEndpoint = 'http://localhost:9999/api/admin/create-distributor';
    
            // Gửi yêu cầu POST đến API
            $http({
                method: 'POST',
                url: apiEndpoint,
                data: taiKhoanData,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token') // Gửi token trong header
                }
            })
            .then(function (response) {
                // Xử lý khi tạo tài khoản thành công
                $scope.successMessage = "Tạo tài khoản nhà phân phối thành công.";
                $scope.errorMessage = null;
                $scope.distributor = {}; // Xóa dữ liệu sau khi tạo thành công
            })
            .catch(function (error) {
                // Xử lý lỗi khi không có quyền (403) hoặc lỗi khác
                $scope.successMessage = null;
                if (error.status === 403) {
                    $scope.errorMessage = "Bạn không có quyền tạo nhà phân phối. Vui lòng kiểm tra quyền truy cập.";
                } else {
                    $scope.errorMessage = error.data || "Đã xảy ra lỗi khi tạo tài khoản.";
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