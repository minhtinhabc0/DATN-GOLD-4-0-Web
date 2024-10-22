var app = angular.module('passwordResetApp', []);

app.controller('PasswordResetController', function ($scope, $http) {
    $scope.step = 1; // Bước đầu tiên
    $scope.errorMessage = '';
    $scope.successMessage = '';

    // Xác minh tài khoản
    $scope.verifyAccount = function () {
        $http.post('http://localhost:9999/api/users/forgot-password', { taikhoan: $scope.taikhoan })
            .then(function (response) {
                $scope.step = 2; // Chuyển sang bước nhập email
                $scope.errorMessage = '';
            }, function (error) {
                $scope.errorMessage = error.data.message;
            });
    };

    // Xác minh email và gửi mã OTP
    $scope.verifyEmail = function () {
        $http.post('http://localhost:9999/api/users/verify-email', { taikhoan: $scope.taikhoan, email: $scope.email })
            .then(function (response) {
                $scope.step = 3; // Chuyển sang bước nhập OTP
                $scope.errorMessage = '';
            }, function (error) {
                $scope.errorMessage = error.data.message;
            });
    };

    // Xác minh mã OTP
    $scope.verifyOTP = function () {
        $scope.step = 4; // Chuyển sang bước đổi mật khẩu
    };

    // Kiểm tra mật khẩu mới
    $scope.isValidPassword = function () {
        var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@!]).{8,}$/;
        return passwordPattern.test($scope.newPassword);
    };

    // Đặt lại mật khẩu mới
    $scope.resetPassword = function () {
        if (!$scope.isValidPassword()) {
            $scope.errorMessage = "Mật khẩu không hợp lệ!";
            return;
        }

        if ($scope.newPassword !== $scope.confirmPassword) {
            $scope.errorMessage = "Mật khẩu và nhập lại mật khẩu không khớp!";
            return;
        }

        $http.put('http://localhost:9999/api/users/reset-password', { 
                taikhoan: $scope.taikhoan, 
                otp: $scope.otp, 
                newPassword: $scope.newPassword 
            })
            .then(function (response) {
                $scope.successMessage = "Mật khẩu đã được thay đổi thành công!";
                $scope.errorMessage = '';
            }, function (error) {
                $scope.errorMessage = error.data.message;
            });
    };
});