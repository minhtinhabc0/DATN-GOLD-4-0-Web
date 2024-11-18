var app = angular.module('myApp', []);

app.controller('MainController', ['$scope', '$http', '$interval', '$timeout', function ($scope, $http, $interval, $timeout) {
  $scope.isRegistering = true;
  $scope.isLoading = false;
  $scope.recaptchaToken = null;
  $scope.siteKey = '6LexVlgqAAAAACJbJFXNT64FwRl5purGdSfnGJtp';
  $scope.user = { vaitro: 0 };
  $scope.countdown = 60;
  $scope.countdownActive = false;
  $scope.successMessage = null;
  $scope.errorMessage = null;

  // Hàm hiển thị thông báo thành công với hiệu ứng đẹp
  $scope.showSuccess = function (message) {
    Swal.fire({
      title: 'Thành công!',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK',
      timer: 3000, // Thời gian hiển thị tự động đóng sau 3 giây
      timerProgressBar: true, // Thanh tiến trình
      didOpen: () => {
        Swal.showLoading();
      },
      customClass: {
        popup: 'swal2-popup-custom', // Sử dụng lớp tùy chỉnh
        title: 'swal2-title-custom' // Sử dụng lớp tùy chỉnh cho tiêu đề
      }
    });
  };

  // Hàm hiển thị thông báo lỗi với hiệu ứng đẹp
  $scope.showError = function (message) {
    Swal.fire({
      title: 'Lỗi!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Đóng',
      customClass: {
        popup: 'swal2-popup-custom',
        title: 'swal2-title-custom'
      },
      timer: 5000, // Thời gian hiển thị tự động đóng sau 5 giây
      timerProgressBar: true, // Thanh tiến trình
      didOpen: () => {
        Swal.showLoading();
      }
    });
  };

  // Đóng thông báo thủ công
  $scope.closeAlert = function () {
    Swal.close();
  };

  // Xác thực reCAPTCHA
  window.recaptchaCallback = function (response) {
    $scope.recaptchaToken = response;
    $scope.$apply();
  };

  // Gửi đăng ký và nhận OTP
  $scope.submitForm = function () {
    if (!$scope.recaptchaToken) {
      $scope.showError('Vui lòng hoàn tất xác thực reCAPTCHA.');
      return;
    }

    if ($scope.user.matkhau !== $scope.confirmPassword) {
      $scope.showError('Mật khẩu xác nhận không khớp!');
      return;
    }

    // Hiển thị loading trước khi gửi yêu cầu
    Swal.fire({
      title: 'Đang xử lý...',
      text: 'Vui lòng đợi trong giây lát.',
      icon: 'info',
      showConfirmButton: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      customClass: {
        popup: 'swal2-popup-custom'
      }
    });

    $http.post('http://localhost:9999/api/re/register', {
      taikhoan: $scope.user.taikhoan,
      email: $scope.user.email,
      hoten: $scope.user.hoten,
      sdt: $scope.user.sdt,
      matkhau: $scope.user.matkhau,
      vaitro: $scope.user.vaitro,
      recaptchaToken: $scope.recaptchaToken
    })
      .then(function (response) {
        Swal.close(); // Đóng loading khi nhận phản hồi thành công
        $scope.showSuccess('Mã OTP đã được gửi đến email của bạn. Vui lòng nhập mã OTP để xác thực.');
        $scope.isRegistering = false;
        startCountdown();
      }, function (error) {
        Swal.close(); // Đóng loading khi có lỗi
        if (error.data === 2) {
          $scope.showError('Đăng ký thất bại! Tài khoản đã tồn tại.');
        } else if (error.data === 1) {
          $scope.showError('Đăng ký thất bại! Email đã được đăng ký.');
        } else if (error.status === 500) {
          $scope.showError('Đăng ký thất bại! Lỗi máy chủ.');
        } else {
          $scope.showError('Đăng ký thất bại! Vui lòng thử lại sau.');
        }
      });
  };

  // Gửi lại OTP
  $scope.resendOTP = function () {
    if (!$scope.user.email) {
      $scope.showError('Vui lòng nhập email để gửi lại mã OTP.');
      return;
    }

    $scope.isLoading = true;
    $http.post('http://localhost:9999/api/re/resend-otp', {
      email: $scope.user.email
    })
      .then(function (response) {
        $scope.isLoading = false;
        $scope.showSuccess('Mã OTP đã được gửi lại đến email của bạn.');
        $scope.countdown = 60;
        startCountdown();
      }, function (error) {
        $scope.isLoading = false;
        if (error.status === 404) {
          $scope.showError('Không tìm thấy tài khoản với email này.');
        } else if (error.status === 500) {
          $scope.showError('Gửi lại mã OTP thất bại! Lỗi máy chủ.');
        } else {
          $scope.showError('Gửi lại mã OTP thất bại! Vui lòng thử lại.');
        }
      });
  };

  // Xác thực OTP
  $scope.verifyOTP = function () {
    if (!$scope.otp) {
      $scope.showError('Vui lòng nhập mã OTP.');
      return;
    }

    // Hiển thị loading trước khi xác thực OTP
    Swal.fire({
      title: 'Đang xác thực...',
      text: 'Vui lòng đợi trong giây lát.',
      icon: 'info',
      showConfirmButton: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      customClass: {
        popup: 'swal2-popup-custom'
      }
    });

    $http.post('http://localhost:9999/api/re/verify-otp', {
      email: $scope.user.email,
      otp: $scope.otp
    })
      .then(function (response) {
        Swal.close(); // Đóng loading khi nhận phản hồi thành công
        Swal.fire({
          title: 'Đăng ký thành công!',
          text: 'Bạn sẽ được chuyển đến trang đăng nhập trong 3 giây.',
          icon: 'success',
          timer: 3000,
          timerProgressBar: true,
          showCancelButton: true,
          cancelButtonText: 'Đóng',
          willClose: () => {
            window.location.href = 'login.html';
          },
          customClass: {
            popup: 'swal2-popup-custom'
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.cancel) {
            window.location.href = 'login.html';
          }
        });
      }, function (error) {
        Swal.close(); // Đóng loading khi có lỗi
        if (error.status === 400 && error.data === 'OTP_INCORRECT') {
          $scope.showError('Xác thực thất bại! Mã OTP không đúng.');
        } else if (error.status === 400 && error.data === 'OTP_EXPIRED') {
          $scope.showError('Xác thực thất bại! Mã OTP đã hết hạn.');
        } else if (error.status === 404) {
          $scope.showError('Không tìm thấy tài khoản với email này.');
        } else if (error.status === 500) {
          $scope.showError('Xác thực thất bại! Lỗi máy chủ.');
        } else {
          $scope.showError('Xác thực thất bại! Vui lòng kiểm tra lại mã OTP.');
        }
      });
  };

  function startCountdown() {
    $scope.countdownActive = true;
    var countdownInterval = $interval(function () {
      if ($scope.countdown > 0) {
        $scope.countdown--;
      } else {
        $interval.cancel(countdownInterval);
        $scope.countdownActive = false;
      }
    }, 1000);
  }
}]);
