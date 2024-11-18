var app = angular.module('myApp', []);

app.controller('FormController', ['$scope', '$http', function ($scope, $http) {
    $scope.recaptchaToken = null;
    $scope.siteKey = '6LexVlgqAAAAACJbJFXNT64FwRl5purGdSfnGJtp'; // Thay thế bằng site key của bạn

    window.recaptchaCallback = function (response) {
        $scope.recaptchaToken = response;
    };

    // Load thông tin đăng nhập từ cookies
    const storedUsername = getCookie("username");
    const storedPassword = getCookie("password");
    $scope.username = storedUsername || '';
    $scope.password = storedPassword || '';

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    $scope.submitForm = function () {
        if (!$scope.username) {
            Swal.fire({
                title: 'Lỗi',
                text: 'Vui lòng nhập tên tài khoản.',
                icon: 'warning',
                background: '#fff',
                color: '#333',
                confirmButtonColor: '#ffcc00', // Màu vàng ánh kim cho nút
                confirmButtonText: 'OK',
                showCloseButton: true,
                showConfirmButton: true,
                allowOutsideClick: false,
                position: 'center',
                customClass: {
                    popup: 'swal2-popup', // Áp dụng CSS custom cho thông báo
                    title: 'swal2-title', // Áp dụng CSS custom cho tiêu đề
                }
            });
            return;
        }

        if (!$scope.password) {
            Swal.fire({
                title: 'Lỗi',
                text: 'Vui lòng nhập mật khẩu.',
                icon: 'warning',
                background: '#fff',
                color: '#333',
                confirmButtonColor: '#ffcc00',
                confirmButtonText: 'OK',
                showCloseButton: true,
                showConfirmButton: true,
                allowOutsideClick: false,
                position: 'center',
                customClass: {
                    popup: 'swal2-popup',
                    title: 'swal2-title',
                }
            });
            return;
        }

        if ($scope.recaptchaToken) {
            const loginData = {
                tenTK: $scope.username,
                matKhau: $scope.password,
                recaptchaToken: $scope.recaptchaToken
            };

            // Hiển thị hiệu ứng loading khi đăng nhập
            Swal.fire({
                title: 'Đang đăng nhập...',
                text: 'Vui lòng chờ trong giây lát',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
                background: '#fff',
                color: '#333',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'swal2-popup',
                    title: 'swal2-title',
                }
            });

            $http.post('http://localhost:9999/api/auth/login', loginData)
                .then(function (response) {
                    // Đăng nhập thành công
                    Swal.fire({
                        title: 'Đăng nhập thành công!',
                        text: 'Đang chuyển hướng...',
                        icon: 'success',
                        background: '#fff',
                        color: '#333',
                        confirmButtonText: 'OK',
                        timer: 2000,
                        showCloseButton: false,
                        position: 'center',
                        customClass: {
                            popup: 'swal2-popup',
                            title: 'swal2-title',
                        }
                    }).then(() => {
                        // Lưu thông tin người dùng và token vào localStorage
                        localStorage.setItem('userInfo', JSON.stringify(response.data.userInfo));
                        localStorage.setItem('token', response.data.token);

                        // Chuyển hướng đến trang chính
                        window.location.href = '/user/index.html';
                    });
                    grecaptcha.reset();
                }, function (error) {
                    // Lỗi khi đăng nhập từ máy chủ
                    let errorMessage = 'Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin đăng nhập.';
                    if (error.status === 401) {
                        errorMessage = 'Sai tên tài khoản hoặc mật khẩu. Vui lòng thử lại.';
                    } else if (error.status === 500) {
                        errorMessage = 'Lỗi hệ thống. Vui lòng thử lại sau.';
                    }

                    Swal.fire({
                        title: 'Đăng nhập thất bại!',
                        text: errorMessage,
                        icon: 'error',
                        background: '#fff',
                        color: '#333',
                        confirmButtonText: 'Thử lại',
                        confirmButtonColor: '#dc3545',
                        showCloseButton: true,
                        position: 'center',
                        customClass: {
                            popup: 'swal2-popup',
                            title: 'swal2-title',
                        }
                    });
                    grecaptcha.reset();
                });
        } else {
            Swal.fire({
                title: 'Thông báo',
                text: 'Vui lòng hoàn tất xác thực reCAPTCHA.',
                icon: 'warning',
                background: '#fff',
                color: '#333',
                confirmButtonColor: '#ffcc00',
                confirmButtonText: 'OK',
                showCloseButton: true,
                showConfirmButton: true,
                allowOutsideClick: false,
                position: 'center',
                customClass: {
                    popup: 'swal2-popup',
                    title: 'swal2-title',
                }
            });
        }
    };



}]);
