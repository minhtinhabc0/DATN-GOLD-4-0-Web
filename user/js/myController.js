// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
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
app.controller("MainController",'$scope', '$window', function ($scope, $location) {
    $scope.changeRoute = function (route) {
        $location.path(route);
    };
});
// Định nghĩa các route

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/user/home', {
            templateUrl: 'html/home.html',
            controller: 'homeCtrl'
        })
        .when('/user/dssp', {
            templateUrl: 'html/ListProduct.html',
            controller: 'dsspCtrl'
        })
        .when('/user/chitiet', {
            templateUrl: 'html/detalproduct.html',
            controller: 'chitietCtrl'
        })
        .when('/user/profileuser', {
            templateUrl: 'html/profileuser.html',
            controller: 'profileuserCtrl'
        })
        .when('/user/spyeuthich', {
            templateUrl: 'html/favourite.html',
            controller: 'spyeuthichCtrl'
        })
        .when('/user/spvang', {
            templateUrl: 'html/Product_Gold.html',
            controller: 'spvangCtrl'
        })
        .when('/user/giavang', {
            templateUrl: 'html/giavang.html',
            controller: 'giavangCtrl'
        })
        .when('/user/giohang', {
            templateUrl: 'html/Shopping_Cart.html',
            controller: 'giohangCtrl'
        })
        .when('/user/thanhtoan', {
            templateUrl: 'html/thanhtoan.html',
            controller: 'thanhtoanCtrl'
        })

        .otherwise({
            redirectTo: '/user/home'
        });
}])

    .controller('MainController', function ($scope, $location,$window) {

        const userInfo = localStorage.getItem('userInfo');
        $scope.userInfo = userInfo ? JSON.parse(userInfo) : null;
        $scope.logout = function() {
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
            $window.location.href = '/user/index.html';
        };

    })


    .controller('homeCtrl', function ($scope) {
        const userInfo = localStorage.getItem('userInfo');
        $scope.userInfo = userInfo ? JSON.parse(userInfo) : null;

        // Hàm chuyển đến trang login
        // $scope.goToLogin = function() {
        //     $window.location.href = 'html/login.html'; // Chuyển hướng đến trang đăng nhập
        // };

        // // Hàm chuyển đến trang profile
        // $scope.goToProfile = function() {
        //     $window.location.href = 'html/profileuser.html'; // Chuyển hướng đến trang hồ sơ
        // };
    })
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
    app.controller('profileuserCtrl', function ($scope,  $window, $http) {
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
              $window.location.href = '/html/login.html'; // Chuyển hướng đến trang đăng nhập
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
              logout();
              $window.location.href = 'home.html'; // Chuyển hướng nếu có lỗi
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
                $scope.oldPassword = '';
                $scope.newPassword = '';
                $scope.confirmPassword = '';
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
        //   $scope.logout = function() {
        //       localStorage.removeItem('token');
        //       localStorage.removeItem('userInfo');
        //       $window.location.href = 'home.html'; // Chuyển hướng về trang đăng nhập
        //   };

          // Hàm kích hoạt chế độ chỉnh sửa
          $scope.enableEdit = function() {
              $scope.isEditing = true; // Bật chế độ chỉnh sửa
          };
          $scope.disableEdit = function() {
            $scope.isEditing = false; // Bật chế độ chỉnh sửa
        };
    
    })
    .controller('spyeuthichCtrl', function ($scope) {

    })
    .controller('spvangCtrl', function ($scope) {

    })
    .controller('giavangCtrl', function ($scope) {

    })
    .controller('giohangCtrl', function ($scope) {

    })
    .controller('thanhtoanCtrl', function ($scope) {

    })




    .controller('dsspCtrl', function ($scope) {

    })
    .controller('chitietCtrl', function ($scope, $routeParams, dataService) {


    })
    .controller('CARTCtrl', function ($scope, $rootScope) {

    })
    .controller('trangthanhtoanCtrl', function ($scope, $http, $location) {


    })
function goBack() {
    window.history.back();
}