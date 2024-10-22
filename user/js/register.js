var app = angular.module('myApp', []);

app.controller('MainController', ['$scope', '$http', '$interval', '$timeout', function($scope, $http, $interval, $timeout) {
  $scope.isRegistering = true;
  $scope.isLoading = false; // Trạng thái loading
  $scope.recaptchaToken = null;
  $scope.siteKey = '6LexVlgqAAAAACJbJFXNT64FwRl5purGdSfnGJtp'; 
  $scope.user = {
    vaitro: 0  // vai trò cố định cho nguoidung 
  };

  $scope.countdown = 60; 
  $scope.countdownActive = false; 
  $scope.successMessage = null;
  $scope.errorMessage = null;

  // Hàm hiển thị thông báo thành công
  $scope.showSuccess = function(message) {
    $scope.successMessage = message;
    $timeout(function() {
      $scope.successMessage = null;
    }, 3000);
  };

  // Hàm hiển thị thông báo lỗi
  $scope.showError = function(message) {
    $scope.errorMessage = message;
    $timeout(function() {
      $scope.errorMessage = null;
    }, 3000);
  };

  // Đóng thông báo thủ công
  $scope.closeAlert = function() {
    $scope.successMessage = null;
    $scope.errorMessage = null;
  };

  // Xác thực reCAPTCHA
  window.recaptchaCallback = function(response) {
    $scope.recaptchaToken = response;
    $scope.$apply();
  };

  // Gửi đăng ký và nhận OTP
  $scope.submitForm = function() {
    if (!$scope.recaptchaToken) {
      $scope.showError('Vui lòng hoàn tất xác thực reCAPTCHA.');
      return;
    }

    if ($scope.user.matkhau !== $scope.confirmPassword) {
      $scope.showError('Mật khẩu xác nhận không khớp!');
      return;
    }

    $scope.isLoading = true; // Bắt đầu loading

    $http.post('http://localhost:9999/api/auth/register', {
      taikhoan: $scope.user.taikhoan,
      matkhau: $scope.user.matkhau,
      email: $scope.user.email,
      hoten: $scope.user.hoten,
      sdt: $scope.user.sdt,
      vaitro: $scope.user.vaitro,
      recaptchaToken: $scope.recaptchaToken
    })
    .then(function(response) {
      $scope.isLoading = false; // Tắt loading
      $scope.showSuccess('Mã OTP đã được gửi đến email của bạn. Vui lòng nhập mã OTP để xác thực.');
      $scope.isRegistering = false;
      startCountdown(); // Bắt đầu đếm ngược
    }, function(error) {
      $scope.isLoading = false; // Tắt loading
      if (error.data === 2) {
        $scope.showError('Đăng ký thất bại! có vẻ tài khoản đã tồn tại');
    } else if (error.data === 1) {
      $scope.showError('Đăng ký thất bại! có vẻ email đã được đăng ký');
    } else {
      $scope.showError('Đăng ký thất bại! đã có lỗi sảy ra');
    }
      
    });
  };

  function startCountdown() {
    $scope.countdownActive = true;
    var countdownInterval = $interval(function() {
      if ($scope.countdown > 0) {
        $scope.countdown--;
      } else {
        $interval.cancel(countdownInterval);
        $scope.countdownActive = false;
      }
    }, 1000);
  }

  // Gửi lại OTP
  $scope.resendOTP = function() {
    $scope.isLoading = true; // Bắt đầu loading
    $http.post('http://localhost:9999/api/auth/resend-otp', {
      email: $scope.user.email
    })
    .then(function(response) {
      $scope.isLoading = false; // Tắt loading
      $scope.showSuccess('Mã OTP đã được gửi lại đến email của bạn.');
      $scope.countdown = 60; // Reset lại đếm ngược
      startCountdown(); // Bắt đầu lại đếm ngược
    }, function(error) {
      $scope.isLoading = false; // Tắt loading
      $scope.showError('Gửi lại mã OTP thất bại! Vui lòng thử lại.');
    });
  };

  // Xác thực OTP
  $scope.verifyOTP = function() {
    $scope.isLoading = true; // Bắt đầu loading
    $http.post('http://localhost:9999/api/auth/verify-otp', {
      email: $scope.user.email, 
      otp: $scope.otp
    })
    .then(function(response) {
      $scope.isLoading = false; // Tắt loading
      $scope.showSuccess("Đăng ký thành công!"); 
      window.location.href = 'login.html'; // Điều hướng tới trang chính
    }, function(error) {
      $scope.isLoading = false; // Tắt loading
      $scope.showError('Xác thực thất bại! Vui lòng kiểm tra lại mã OTP.');
    });
  };
}]);