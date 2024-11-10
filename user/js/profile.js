var app = angular.module('myApp', []);

// Directive for file upload
app.directive('ngFileSelect', function() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.bind('change', function(event) {
                scope.$apply(function() {
                    scope.avatarFile = event.target.files[0];
                    if (scope.avatarFile) {
                        scope.uploadAvatar(); // Gọi hàm uploadAvatar ngay tại đây
                    }
                });
            });
        }
    };
});



app.controller('ProfileController', ['$scope', '$window', '$http', function($scope, $window, $http) {
    // Khởi tạo biến cho thông tin người dùng
    $scope.userInfo = {};
    $scope.oldPassword = '';
    $scope.newPassword = '';
    $scope.confirmPassword = '';
    $scope.oldPin = "";
    $scope.newPin = '';
    $scope.confirmNewPin = '';
    $scope.isEditing = false; // Khởi tạo chế độ chỉnh sửa là false

    // Lấy thông tin người dùng từ localStorage
    const userInfo = localStorage.getItem('userInfo');
    $scope.userInfo = userInfo ? JSON.parse(userInfo) : null;

    // Kiểm tra xem có thông tin người dùng không
    if (!$scope.userInfo) {
        $window.location.href = 'login.html'; // Chuyển hướng đến trang đăng nhập
    }

    // Lấy thông tin người dùng từ backend
    $http.get('http://localhost:9999/api/user/profile', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(function(response) {
        $scope.userInfo = response.data;
        localStorage.setItem('userInfo', JSON.stringify($scope.userInfo)); // Lưu thông tin vào localStorage
    }).catch(function(error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
        alert('Lỗi khi tải thông tin người dùng!');
        $scope.logout();
        $window.location.href = '/user/index.html'; // Chuyển hướng nếu có lỗi
    });

    // Hàm upload avatar
    $scope.uploadAvatar = function() {
        var token = localStorage.getItem('token');
        if (!$scope.avatarFile) {
            alert('Vui lòng chọn một tệp ảnh để tải lên.');
            return;
        }

        // Tạo form data để gửi
        var formData = new FormData();
        formData.append('file', $scope.avatarFile);
        formData.append('upload_preset', 'imgavt1'); // Thay YOUR_UPLOAD_PRESET bằng upload preset của bạn

        // Gọi API của Cloudinary để upload ảnh
        $http.post('https://api.cloudinary.com/v1_1/dcr0bghdp/image/upload', formData, {
            headers: {
                'Content-Type': undefined
            }
        }).then(function(response) {
            // Cập nhật avatar URL trong userInfo
            $scope.userInfo.avt = response.data.secure_url; // Lấy URL từ phản hồi
            alert('Tải lên thành công!');
        }).catch(function(error) {
            console.error('Lỗi khi tải lên avatar:', error);
            alert('Tải lên không thành công: ' + (error.data && error.data.message ? error.data.message : ''));
        });
    };

    // Hàm cập nhật thông tin cá nhân
    $scope.updateProfile = function() {
        $http.put('http://localhost:9999/api/user/profile', $scope.userInfo, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function(response) {
            alert('Cập nhật thông tin thành công!');
            $scope.isEditing = false; // Tắt chế độ chỉnh sửa
        }).catch(function(error) {
            console.error('Lỗi khi cập nhật thông tin:', error);
            alert('Cập nhật thông tin không thành công: ' + (error.data && error.data.message ? error.data.message : ''));
        });
    };

    // Hàm cập nhật mật khẩu
    $scope.updatePassword = function() {
        if ($scope.newPassword !== $scope.confirmPassword) {
            alert('Mật khẩu mới không khớp!');
            return;
        }
        $http.put('http://localhost:9999/api/user/profile/password', {
            oldPassword: $scope.oldPassword,
            newPassword: $scope.newPassword
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function(response) {
            alert('Cập nhật mật khẩu thành công!');
        }).catch(function(error) {
            console.error('Lỗi khi cập nhật mật khẩu:', error);
            alert('Cập nhật mật khẩu không thành công: ' + (error.data && error.data.message ? error.data.message : ''));
        });
    };

    // Hàm cập nhật mã PIN
    $scope.updatePin = function() {
        if ($scope.newPin !== $scope.confirmNewPin) {
            alert('Mã PIN mới không khớp!');
            return;
        }
        $http.put('http://localhost:9999/api/user/profile/pin', {
            oldPin: $scope.oldPin,
            newPin: $scope.newPin
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function(response) {
            alert('Cập nhật mã PIN thành công!');
        }).catch(function(error) {
            console.error('Lỗi khi cập nhật mã PIN:', error);
            alert('Cập nhật mã PIN không thành công: ' + (error.data && error.data.message ? error.data.message : ''));
        });
    };

    // Hàm đăng xuất
    $scope.logout = function() {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        $window.location.href = 'home.html'; // Chuyển hướng về trang đăng nhập
    };

    // Hàm kích hoạt chế độ chỉnh sửa
    $scope.enableEdit = function() {
        $scope.isEditing = true; // Bật chế độ chỉnh sửa
    };
}]);