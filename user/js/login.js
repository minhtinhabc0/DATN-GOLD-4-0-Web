var app = angular.module('myApp', []);

app.controller('FormController', ['$scope', '$http', function($scope, $http) {
    $scope.recaptchaToken = null;
    $scope.siteKey = '6LexVlgqAAAAACJbJFXNT64FwRl5purGdSfnGJtp'; // Thay thế bằng site key của bạn

    window.recaptchaCallback = function(response) {
        $scope.recaptchaToken = response;
    };

    // Load login information from cookies
    const storedUsername = getCookie("username");
    const storedPassword = getCookie("password");
    $scope.username = storedUsername || '';
    $scope.password = storedPassword || '';

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    $scope.submitForm = function() {
        if ($scope.recaptchaToken) {
            const loginData = {
                tenTK: $scope.username,
                matKhau: $scope.password,
                recaptchaToken: $scope.recaptchaToken
            };

            console.log('Login Data:', loginData); // Kiểm tra dữ liệu

            $http.post('http://localhost:9999/api/auth/login', loginData)
            .then(function(response) {
                console.log('Success:', response.data);
                showToast('Đăng nhập thành công! Redirecting...');
                grecaptcha.reset();

                // Lưu thông tin người dùng và token vào localStorage
                localStorage.setItem('userInfo', JSON.stringify(response.data.userInfo));
                localStorage.setItem('token', response.data.token);

                // Chuyển hướng đến hello.html
                window.location.href = '/user/index.html';
            }, function(error) {
                console.error('Error during login:', error);
                showToast('Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.');
                grecaptcha.reset();
            });
        } else {
            showToast('Vui lòng hoàn tất xác thực reCAPTCHA.');
        }
    };

    // Function to show toast
    function showToast(message) {
        var toast = document.getElementById("toast");
        toast.innerHTML = message;
        toast.style.visibility = "visible";
        setTimeout(function() {
            toast.style.visibility = "hidden";
        }, 3000);
    }
}]);

app.controller('HelloController', ['$scope', '$window', function($scope, $window) {
    // Lấy thông tin người dùng từ localStorage
    const userInfo = localStorage.getItem('userInfo');
    $scope.userInfo = userInfo ? JSON.parse(userInfo) : null;

    // Kiểm tra nếu không có thông tin người dùng, chuyển hướng đến trang đăng nhập
    if (!$scope.userInfo) {
        $window.location.href = 'index.html'; // Chuyển hướng đến trang đăng nhập nếu không có thông tin
    }

    $scope.logout = function() {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
        $window.location.href = 'index.html';
    }
}]);