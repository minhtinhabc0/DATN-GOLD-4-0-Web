//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//            Phật phù hộ, không bao giờ BUG
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


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
app.controller("MainController", '$scope', '$window', function ($scope, $location) {
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
        .when('/user/brand', {
            templateUrl: 'html/brand.html',
            controller: 'brandCtrl'
        })
        .when('/user/ngoaite', {
            templateUrl: 'html/ExchangeRate.html',
            controller: 'ngoaiteCtrl'
        })
        .when('/user/hdkh', {
            templateUrl: 'html/hdkh.html',
            controller: 'hdkhCtrl'
        })
        .when('/user/product/:id', {
            templateUrl: 'html/product-detail.html',
            controller: 'productDetailCtrl'
        })


        .otherwise({
            redirectTo: '/user/home'
        });
}])
    //controller chính của website
    //=====================================================================================================
    .controller('MainController', function ($scope, $location, $window) {

        const userInfo = localStorage.getItem('userInfo');
        $scope.userInfo = userInfo ? JSON.parse(userInfo) : null;

        $scope.logout = function () {
            Swal.fire({
                title: 'Bạn có chắc chắn muốn đăng xuất?',
                text: "Bạn sẽ phải đăng nhập lại để tiếp tục sử dụng!",
                icon: 'warning',
                showCancelButton: true, // Hiển thị nút huỷ
                confirmButtonText: 'Đăng xuất',
                cancelButtonText: 'Hủy bỏ',
                confirmButtonColor: '#f0b400', // Màu nút Đăng xuất
                cancelButtonColor: '#d33', // Màu nút Hủy bỏ
                reverseButtons: true, // Đảo ngược nút
                position: 'top-end', // Vị trí thông báo góc trên bên phải
                customClass: {
                    popup: 'swal2-popup-small' // Đặt lớp CSS để chỉnh kích thước
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // Xóa token và thông tin người dùng
                    localStorage.removeItem('token');
                    localStorage.removeItem('userInfo');

                    // Hiển thị thông báo đăng xuất thành công nhỏ
                    Swal.fire({
                        position: 'top-end', // Vị trí thông báo
                        icon: 'success', // Loại thông báo thành công
                        title: 'Đăng xuất thành công!', // Tiêu đề thông báo
                        showConfirmButton: false, // Không có nút xác nhận
                        confirmButtonText: 'OK',
                        timer: 1500, // Thông báo sẽ tự động biến mất sau 1.5 giây
                        position: 'center',
                        customClass: {
                            popup: 'swal2-popup-small' // Đặt lớp CSS để làm nhỏ thông báo
                        }
                    });

                    // Sau khi thông báo biến mất, chuyển hướng
                    setTimeout(() => {
                        $window.location.href = '/user/index.html';
                    }, 1500); // Đồng bộ với thời gian hiển thị thông báo
                }
            });
        };



        const imageUrl = "https://th.bing.com/th/id/OIP.xH_K_kDlIyvn8QfMLwYGiAHaJQ?rs=1&pid=ImgDetMain";
        console.log("%c ", `font-size: 100px; background: url(${imageUrl}) no-repeat; background-size: cover; -webkit-background-clip: text; -webkit-text-fill-color: transparent;`);
        console.log("nó KHÔNG phải là lỗi nó là tính năng")

    })
    //=====================================================================================================
    //controller home

    .controller('homeCtrl', function ($scope, $http, GoldPriceService) {
        const userInfo = localStorage.getItem('userInfo');
        $scope.userInfo = userInfo ? JSON.parse(userInfo) : null;
        let host = "http://localhost:9999/api";

        $scope.items = [];
        $scope.currentIndex = 0;
        $scope.itemsPerPage = 5; // Number of items visible at once
        $scope.goldPrices = [];
        $scope.SJCPrices = null;
        $scope.total_price = null; // Khởi tạo với giá trị hợp lệ
        $scope.gold_quantity = null; // Khởi tạo với giá trị hợp lệ

        // Load all products and limit to 10 items
        $scope.load_all = function () {
            var url = `${host}/products`;
            $http.get(url).then(resp => {
                $scope.items = resp.data.slice(0, 15); // Limit to 10 items
            }).catch(error => {
                console.log("Error", error);
            });
        }
        $scope.startAutoSlide = function () {
            setInterval(() => {
                $scope.nextSlide();
            }, 3000); // Chuyển đổi sau mỗi 2000ms (2 giây)
        }
        $scope.startAutoSlide();


        // Move to the next item with circular behavior
        $scope.nextSlide = function () {
            // Ensure that currentIndex + itemsPerPage doesn't exceed item count
            if ($scope.currentIndex + $scope.itemsPerPage < $scope.items.length) {
                $scope.currentIndex += 1;
            } else {
                $scope.currentIndex = 0; // Return to start if at the end
            }
            $scope.updateCarousel();
        }

        // Move to the previous item with circular behavior
        $scope.prevSlide = function () {
            if ($scope.currentIndex > 0) {
                $scope.currentIndex -= 1;
            } else {
                $scope.currentIndex = Math.max(0, $scope.items.length - $scope.itemsPerPage); // Go to end if at start
            }

        }

        // Function to update the carousel by translating it
        $scope.updateCarousel = function () {
            const wrapper = document.querySelector('.product-carousel-wrapper');
            if (wrapper) { // Kiểm tra nếu wrapper tồn tại
                const translateX = -($scope.currentIndex * (100 / $scope.itemsPerPage)); // Tính toán dịch chuyển
                wrapper.style.transform = `translateX(${translateX}%)`;
            } else {
                console.log("Khum phải lỗi đâu tại trang này không có .product-carousel-wrapper thui hihihi");
            }
        };

        // Tải giá vàng
        $scope.loadPrices = function () {
            GoldPriceService.fetchGoldPrices().then(function (data) {
                $scope.goldPrices = data.goldPrices; // Lưu trữ dữ liệu vào scope
                $scope.SJCPrices = $scope.goldPrices[6]; // Lưu giá vàng SJC
                console.log("SJCPrices:", $scope.SJCPrices); // Kiểm tra giá trị
            });
        };
        // Thay đổi ô số vàng cần mua khi nhập số tiền thanh toán
        $scope.calculateGcoins = function () {
            const total_price = parseFloat($scope.total_price);
            if (!isNaN(total_price) && $scope.SJCPrices) {
                $scope.gold_quantity = (total_price / $scope.SJCPrices.priceSell).toFixed(5);
            } else {
                $scope.gold_quantity = ''; // Reset nếu không hợp lệ
            }
        };
        // Thay đổi ô số tiền thanh toán khi nhập số vàng cần mua
        $scope.calculateMoney = function () {
            const gold_quantity = parseFloat($scope.gold_quantity);
            if (!isNaN(gold_quantity) && $scope.SJCPrices) {
                $scope.total_price = (gold_quantity * $scope.SJCPrices.priceSell);
            } else {
                $scope.total_price = ''; // Reset nếu không hợp lệ
            }
        };


        // Initial load
        $scope.load_all();
        $scope.loadPrices();
    })
//======================================================================================================

// Upload avatar

app.directive('ngFileSelect', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.bind('change', function (event) {
                scope.$apply(function () {
                    scope.avatarFile = event.target.files[0];
                    if (scope.avatarFile) {
                        scope.uploadAvatar(); // Gọi hàm uploadAvatar ngay tại đây
                    }
                });
            });
        }
    };
});

// service load giá vàng
//================================================================================================
app.service('GoldPriceBuyService', function ($http) {
    this.fetchGoldPricesBuy = function () {
        const apiUrl = 'http://localhost:9999/api/gold-prices'; // Đường dẫn API

        return $http.get(apiUrl).then(function (response) {
            return response.data.DataList.Data; // Giả sử cấu trúc dữ liệu API
        }).catch(function (error) {
            console.error('Error fetching gold prices:', error);
            throw new Error('Có lỗi xảy ra khi tải dữ liệu giá vàng.');
        });
    };
});


//===============================================================================================
//controller profile
app.controller('profileuserCtrl', function ($scope, $window, $http, GoldPriceService) {
    $scope.logout1 = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        $window.location.href = '/user/index.html';
    };
    // Khởi tạo biến cho thông tin người dùng
    $scope.userInfo = {};
    $scope.oldPassword = '';
    $scope.newPassword = '';
    $scope.confirmPassword = '';
    $scope.oldPin = '';
    $scope.newPin = '';
    $scope.confirmNewPin = '';
    $scope.isEditing = false; // Chế độ chỉnh sửa
    $scope.gcoinBalance = 0; // Số dư Gcoin
    $scope.goldPrices = []; // Lưu trữ danh sách giá vàng
    $scope.firstProduct = null;
    $scope.totalGcoinValue = 0; // Giá trị Gcoin

    // Lấy thông tin người dùng từ localStorage
    const userInfo = localStorage.getItem('userInfo');
    $scope.userInfo = userInfo ? JSON.parse(userInfo) : null;

    // Kiểm tra thông tin người dùng
    if (!$scope.userInfo) {
        $window.location.href = '/html/login.html'; // Chuyển hướng đến trang đăng nhập
    }

    // Lấy thông tin người dùng từ backend
    $http.get('http://localhost:9999/api/user/profile', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(function (response) {
        $scope.userInfo = response.data;
        localStorage.setItem('userInfo', JSON.stringify($scope.userInfo)); // Lưu thông tin vào localStorage
    }).catch(function (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
        $scope.logout1();
        // Chuyển hướng nếu có lỗi
    });

    // Tải giá vàng
    $scope.loadPrices = function () {
        GoldPriceService.fetchGoldPrices().then(function (data) {
            $scope.goldPrices = data.goldPrices; // Lưu trữ dữ liệu vào scope
            $scope.firstProduct = $scope.goldPrices[5]; // Lưu sản phẩm đầu tiên
            $scope.calculateGcoinValue(); // Tính giá trị Gcoin
        });
    };

    // Tính toán giá trị Gcoin
    $scope.calculateGcoinValue = function () {
        if ($scope.firstProduct) {
            $scope.totalGcoinValue = $scope.gcoinBalance * $scope.firstProduct.priceBuy;
        }
    };
    $scope.hasPin = function () {
        return !!$scope.userInfo.pin; // Trả về true nếu có mã PIN
    };
    // Hàm tải số dư Gcoin và giá vàng
    $scope.checkAndCreateGcoinWallet = function () {
        const apiUrl = `http://localhost:9999/api/user/profile/gcoin`;

        $http.get(apiUrl, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            // Hiển thị số dư
            $scope.gcoinBalance = response.data.balance; // Lấy số dư từ phản hồi
            $scope.loadPrices(); // Tải giá vàng
            $scope.hasPin();
        }).catch(function (error) {
            console.error('Lỗi khi tải số dư Gcoin:', error);
        });
    };

    // Hàm tạo ví Gcoin
    $scope.createGcoinWallet = function () {
        const apiUrl = `http://localhost:9999/api/user/profile/create-gcoin`;

        $http.post(apiUrl, {}, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }

        }).then(function (response) {
            alert(response.data.message); // Hiển thị thông báo thành công
            $scope.checkAndCreateGcoinWallet(); // Tải lại số dư Gcoin
        }).catch(function (error) {
            console.error('Lỗi khi tạo ví Gcoin:', error);
            alert('Không thể tạo ví Gcoin: ' + (error.data || ''));
        });
    };

    // Gọi hàm để kiểm tra ví Gcoin khi cần thiết
    $scope.checkAndCreateGcoinWallet();

    // Hàm upload avatar
    $scope.uploadAvatar = function () {
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
        }).then(function (response) {
            // Cập nhật avatar URL trong userInfo
            $scope.userInfo.avt = response.data.secure_url; // Lấy URL từ phản hồi
        }).catch(function (error) {
            console.error('Lỗi khi tải lên avatar:', error);
        });
    };

    // Hàm cập nhật thông tin cá nhân
    $scope.updateProfile = function () {
        $http.put('http://localhost:9999/api/user/profile', $scope.userInfo, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            alert('Cập nhật thông tin thành công!');
            $scope.isEditing = false; // Tắt chế độ chỉnh sửa
        }).catch(function (error) {
            console.error('Lỗi khi cập nhật thông tin:', error);
            alert('Cập nhật thông tin không thành công: ' + (error.data && error.data.message ? error.data.message : ''));
        });
    };

    // Hàm cập nhật mật khẩu
    $scope.updatePassword = function () {
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
        }).then(function (response) {
            // Xóa các trường mật khẩu sau khi cập nhật
            $scope.oldPassword = '';
            $scope.newPassword = '';
            $scope.confirmPassword = '';
            alert('Cập nhật mật khẩu thành công!');
        }).catch(function (error) {
            console.error('Lỗi khi cập nhật mật khẩu:', error);
            alert('Cập nhật mật khẩu không thành công: ' + (error.data && error.data.message ? error.data.message : ''));
        });
    };

    // Hàm cập nhật mã PIN
    $scope.updatePin = function () {
        if ($scope.hasPin() && $scope.newPin !== $scope.confirmNewPin) {
            alert('Mã PIN mới không khớp!');
            return;
        }

        const payload = {
            oldPin: $scope.hasPin() ? $scope.oldPin : undefined, // Gửi oldPin chỉ khi đã có PIN
            newPin: $scope.newPin
        };

        $http.put('http://localhost:9999/api/user/profile/pin', payload, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            // Xóa các trường PIN sau khi cập nhật
            $scope.oldPin = '';
            $scope.newPin = '';
            $scope.confirmNewPin = '';
            alert('Cập nhật mã PIN thành công!');
        }).catch(function (error) {
            console.error('Lỗi khi cập nhật mã PIN:', error);
            alert('Cập nhật mã PIN không thành công: ' + (error.data && error.data.message ? error.data.message : ''));
        });
    };


    // Hàm kích hoạt chế độ chỉnh sửa
    $scope.enableEdit = function () {
        $scope.isEditing = true; // Bật chế độ chỉnh sửa
    };

    $scope.disableEdit = function () {
        $scope.isEditing = false; // Tắt chế độ chỉnh sửa
    };

    // Khởi động hàm tải dữ liệu
    $scope.loadPrices(); // Tải giá vàng khi khởi động
})


    .controller('spyeuthichCtrl', function ($scope) {

    })
    .controller('spvangCtrl', function ($scope, $http, GoldPriceService) {
        $scope.goldPrices = [];
        $scope.SJCPrices = null;
        $scope.total_price = null; // Khởi tạo với giá trị hợp lệ
        $scope.gold_quantity = null; // Khởi tạo với giá trị hợp lệ

        // Tải giá vàng
        $scope.loadPrices = function () {
            GoldPriceService.fetchGoldPrices().then(function (data) {
                $scope.goldPrices = data.goldPrices; // Lưu trữ dữ liệu vào scope
                $scope.SJCPrices = $scope.goldPrices[6]; // Lưu giá vàng SJC
                console.log("SJCPrices:", $scope.SJCPrices); // Kiểm tra giá trị
            });
        };
        // Thay đổi ô số vàng cần mua khi nhập số tiền thanh toán
        $scope.calculateGcoins = function () {
            const total_price = parseFloat($scope.total_price);
            if (!isNaN(total_price) && $scope.SJCPrices) {
                $scope.gold_quantity = (total_price / ($scope.SJCPrices.priceSell * (0.1 / 100))).toFixed(5);
            } else {
                $scope.gold_quantity = ''; // Reset nếu không hợp lệ
            }
        };
        // Thay đổi ô số tiền thanh toán khi nhập số vàng cần mua
        $scope.calculateMoney = function () {
            const gold_quantity = parseFloat($scope.gold_quantity);
            if (!isNaN(gold_quantity) && $scope.SJCPrices) {
                $scope.total_price = (gold_quantity * ($scope.SJCPrices.priceSell * (0.1 / 100)));
            } else {
                $scope.total_price = ''; // Reset nếu không hợp lệ
            }
        };
        $scope.initiatePayment = function () {
            console.log("Initiating payment...");
            const paymentData = {
                productName: "Gcoin",
                quantity: $scope.gold_quantity,
                price: $scope.total_price
            };

            $http({
                method: 'POST',
                url: 'http://localhost:9999/api/checkout/create-payment-link',
                data: paymentData,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(function (response) {
                console.log("Response received:", response.data);
                const checkoutUrl = response.data.checkoutUrl;  // Lấy checkoutUrl từ JSON
                window.location.href = checkoutUrl;  // Redirect sang checkoutUrl
            }).catch(function (error) {
                console.error('Error creating payment link:', error);
            });
        };
        // Initial load
        $scope.loadPrices();
    })
//====================================================================================================


//trống

//====================================================================================================
// Khai báo service
app.service('GoldPriceService', function ($http) {
    this.fetchGoldPrices = function () {
        const apiUrl = 'http://localhost:9999/api/gold-prices';

        return $http.get(apiUrl).then(function (response) {
            const dataList = response.data.DataList.Data;
            const goldPrices = [];
            const products = [];

            if (Array.isArray(dataList)) {
                for (let i = 0; i < dataList.length; i++) {
                    const dataItem = dataList[i];
                    const name = dataItem['@n_' + (i + 1)] || 'Unknown';
                    const priceBuy = parseFloat(dataItem['@pb_' + (i + 1)]) || 0;
                    const priceSell = parseFloat(dataItem['@ps_' + (i + 1)]) || 0;
                    const dateStr = dataItem['@d_' + (i + 1)] || 'N/A';

                    const parts = dateStr.split(' ');
                    const dateParts = parts[0].split('/');
                    const timeParts = parts[1].split(':');

                    const isoDateStr = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${timeParts[0]}:${timeParts[1]}:00`;
                    const date = new Date(isoDateStr);

                    if (isNaN(date.getTime())) {
                        console.error('Invalid date format for date string:', dateStr);
                        continue;
                    }

                    goldPrices.push({
                        name: name,
                        priceBuy: priceBuy,
                        priceSell: priceSell,
                        date: date
                    });

                    if (!products.includes(name)) {
                        products.push(name);
                    }
                }
            }

            return { goldPrices: goldPrices, products: products };
        }).catch(function (error) {
            console.error('Error fetching gold prices:', error);
            throw new Error('Có lỗi xảy ra khi tải dữ liệu giá vàng. Vui lòng thử lại sau.');
        });
    };
})
//====================================================================================================




// Khào báo controller giỏ hàng

app.controller('giohangCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {

    // Kiểm tra người dùng đã đăng nhập hay chưa bằng cách lấy token từ localStorage
    function getAuthToken() {
        return localStorage.getItem("token");
    }

    // Hàm thêm sản phẩm vào giỏ hàng
    $scope.addToCart = function (productId, quantity) {
        const token = getAuthToken();
        if (!token) {
            alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
            $window.location.href = "http://127.0.0.1:5501/user/html/login.html";  // Đảm bảo là URL tuyệt đối
            return;
        }

        // Tạo đối tượng CartRequest
        const cartRequest = {
            sanPhamId: productId,
            soLuong: quantity
        };

        // Gửi yêu cầu POST đến API thêm sản phẩm vào giỏ hàng
        $http.post('http://localhost:9999/api/cart/add', cartRequest, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(function (response) {
            // Xử lý thành công
            alert('Sản phẩm đã được thêm vào giỏ hàng!');
            // Cập nhật lại giỏ hàng hoặc chuyển hướng đến trang giỏ hàng nếu cần
            $scope.getCart();
        }).catch(function (error) {
            // Xử lý khi có lỗi
            console.error("Error details:", error);
            if (error.status === 401) {
                alert('Bạn chưa đăng nhập. Vui lòng đăng nhập!');
                $window.location.href = "http://127.0.0.1:5501/user/html/login.html";  // Chuyển hướng đến trang đăng nhập
            } else if (error.status === 400) {
                alert('Số lượng sản phẩm không đủ trong kho!');
            } else {
                alert('Có lỗi xảy ra, vui lòng thử lại!');
            }
        });
    };

    // Lấy thông tin giỏ hàng
    // Gọi API lấy giỏ hàng từ backend
    $scope.getCart = function () {
        const token = getAuthToken();
        if (!token) {
            alert("Bạn cần đăng nhập để xem giỏ hàng!");
            $window.location.href = "http://127.0.0.1:5501/user/html/login.html";
            return;
        }

        $http.get('http://localhost:9999/api/cart', {
            headers: { 'Authorization': 'Bearer ' + token }
        }).then(function (response) {
            $scope.gioHang = response.data;  // Cập nhật giỏ hàng trong UI
        }).catch(function (error) {
            alert('Có lỗi xảy ra khi lấy giỏ hàng!');
        });
    };

    // Hàm xử lý khi người dùng cập nhật số lượng sản phẩm trong giỏ hàng
    $scope.updateQuantity = function (item, change) {
        item.soLuong += change;

        // Gửi yêu cầu cập nhật số lượng sản phẩm trong giỏ hàng
        const token = getAuthToken();
        if (!token) {
            alert("Bạn cần đăng nhập để cập nhật giỏ hàng!");
            $window.location.href = "http://127.0.0.1:5501/user/html/login.html";
            return;
        }

        // Tạo đối tượng CartRequest để gửi lên API
        const cartRequest = {
            sanPhamId: item.sanPhamId,
            soLuong: item.soLuong
        };

        $http.put('http://localhost:9999/api/cart/update', cartRequest, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(function (response) {
            alert('Giỏ hàng đã được cập nhật!');
        }).catch(function (error) {
            alert('Có lỗi xảy ra khi cập nhật giỏ hàng!');
        });
    };

    // Hàm xóa sản phẩm khỏi giỏ hàng
    $scope.removeFromCart = function (item) {
        const token = getAuthToken();
        if (!token) {
            alert("Bạn cần đăng nhập để xóa sản phẩm khỏi giỏ hàng!");
            $window.location.href = "http://127.0.0.1:5501/user/html/login.html";
            return;
        }

        // Gửi yêu cầu DELETE để xóa sản phẩm
        $http.delete('http://localhost:9999/api/cart/remove/' + item.sanPhamId, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(function (response) {
            alert('Sản phẩm đã được xóa khỏi giỏ hàng!');
            $scope.getCart(); // Tải lại giỏ hàng
        }).catch(function (error) {
            alert('Có lỗi xảy ra khi xóa sản phẩm!');
        });
    };

    // Khởi động: Lấy thông tin giỏ hàng khi trang được tải
    $scope.getCart();
}])







    //================================================================================================
    // Khào báo controller thanh toán
    .controller('thanhtoanCtrl', function ($scope) {

    })
    //================================================================================================
    // Khào báo service tỉ giá tiền tệ
    .service('ExchangeRateService', function ($http) {
        this.getExchangeRates = function () {
            return $http.get('https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx') // Thay thế với URL API của bạn
                .then(function (response) {
                    // Chuyển đổi dữ liệu XML sang JSON
                    return parseXML(response.data);
                });
        };

        function parseXML(xml) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xml, "text/xml");
            const exrates = xmlDoc.getElementsByTagName("Exrate");
            const rates = [];

            for (let i = 0; i < exrates.length; i++) {
                rates.push({
                    CurrencyCode: exrates[i].getAttribute("CurrencyCode"),
                    CurrencyName: exrates[i].getAttribute("CurrencyName"),
                    Buy: exrates[i].getAttribute("Buy"),
                    Transfer: exrates[i].getAttribute("Transfer"),
                    Sell: exrates[i].getAttribute("Sell")
                });
            }

            return rates;
        }
    })
    //================================================================================================
    // Khào báo controller tiền tệ
    .controller('ngoaiteCtrl', function ($scope, ExchangeRateService) {
        $scope.exchangeRates = [];

        ExchangeRateService.getExchangeRates().then(function (rates) {
            $scope.exchangeRates = rates;
        }).catch(function (error) {
            console.error("Error fetching exchange rates:", error);
        });
    })
    //================================================================================================
    // Khào báo controller dssp
    .controller('dsspCtrl', function ($scope, $http, $location) {
        let host = "http://localhost:9999/api";
        $scope.items = [];
        $scope.filteredItems = []; // Sản phẩm hiển thị trên mỗi trang
        $scope.currentPage = 1; // Trang hiện tại
        $scope.itemsPerPage = 12; // Số sản phẩm trên mỗi trang
        $scope.totalPages = 0;
        $scope.searchText = ''; // Biến để lưu trữ nội dung tìm kiếm
        $scope.sortByPrice = ''; // Biến để lưu trữ phương thức sắp xếp


        // Filter selections
        $scope.selectedBrand = '';
        $scope.selectedMainStone = '';
        $scope.selectedGender = '';
        $scope.selectedGoldType = '';
        $scope.selectedJewelryType = '';

        // Hàm tải dữ liệu sản phẩm từ server
        $scope.load_all = function () {
            var url = `${host}/products`;
            $http.get(url).then(resp => {
                $scope.items = resp.data; // Gán dữ liệu sản phẩm từ server
                $scope.filteredItems = $scope.items; // Khởi tạo filteredItems với toàn bộ sản phẩm
                $scope.totalPages = Math.ceil($scope.filteredItems.length / $scope.itemsPerPage); // Tính số trang
                $scope.currentPage = 1; // Đặt lại về trang đầu tiên
                $scope.updateFilteredItems(); // Hiển thị sản phẩm của trang đầu tiên
            }).catch(error => {
                console.log("Error", error);
            });
        }

        $scope.goToDetail = function (product) {
            if (!product || !product.maSanPham) {
                console.error("Product ID is undefined:", product);
                alert("Sản phẩm không có mã hợp lệ.");
                return;
            }
            console.log("Navigating to product detail:", product);
            $location.path('/user/product/' + product.maSanPham);
        };




        // Cập nhật danh sách sản phẩm đã lọc
        $scope.updateFilteredItems = function () {
            let start = ($scope.currentPage - 1) * $scope.itemsPerPage;
            let end = start + $scope.itemsPerPage;

            // Cập nhật filteredItems để hiển thị các sản phẩm trên trang hiện tại
            $scope.displayedItems = $scope.filteredItems.slice(start, end);;
        }

        // Chức năng chuyển trang
        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.totalPages) {
                $scope.currentPage++;
                $scope.updateFilteredItems();
            }
        }

        $scope.previousPage = function () {
            if ($scope.currentPage > 1) {
                $scope.currentPage--;
                $scope.updateFilteredItems();
            }
        }

        $scope.goToPage = function (page) {
            if (page >= 1 && page <= $scope.totalPages) {
                $scope.currentPage = page;
                $scope.updateFilteredItems();
            }
        }
        // Lọc theo thương hiệu
        $scope.filterByBrand = function () {
            var brand = $scope.selectedBrand;

            // Kiểm tra xem thương hiệu có hợp lệ không trước khi lọc
            if (brand === undefined || brand === null || brand === '') {
                $scope.filteredItems = $scope.items;  // Không lọc nếu giá trị không hợp lệ
            } else {
                $scope.filteredItems = $scope.items.filter(item => {
                    return item.chiTiet === brand;  // So sánh trực tiếp
                });
                console.log("Sản phẩm sau khi lọc:", $scope.filteredItems);
            }

            $scope.totalPages = Math.ceil($scope.filteredItems.length / $scope.itemsPerPage);
            $scope.currentPage = 1;
            $scope.updateFilteredItems();
        };


        // lọc loại đá
        $scope.filterByMainStone = function () {
            var mainStone = $scope.selectedMainStone;

            // Kiểm tra xem loại đá có hợp lệ không trước khi lọc
            if (mainStone === undefined || mainStone === null || mainStone === '') {
                $scope.filteredItems = $scope.items;  // Không lọc nếu giá trị không hợp lệ
            } else {
                $scope.filteredItems = $scope.items.filter(item => {
                    return item.loaiDa === mainStone;  // So sánh trực tiếp
                });
                console.log("Sản phẩm sau khi lọc:", $scope.filteredItems);
            }

            $scope.totalPages = Math.ceil($scope.filteredItems.length / $scope.itemsPerPage);
            $scope.currentPage = 1;
            $scope.updateFilteredItems();
        };


        // Lọc theo giới tính
        $scope.filterByGender = function () {
            var gender = $scope.selectedGender;

            // Kiểm tra xem giới tính có hợp lệ không trước khi lọc
            if (gender === undefined || gender === null || gender === '') {
                $scope.filteredItems = $scope.items;  // Không lọc nếu giá trị không hợp lệ
            } else {
                $scope.filteredItems = $scope.items.filter(item => {
                    // Nếu chọn 'nam' thì chỉ hiển thị các sản phẩm có chứa từ 'nam' trong tên
                    if (gender === 'nam') return item.tenSanPham.toLowerCase().includes("nam");

                    // Nếu chọn 'nữ' thì chỉ hiển thị các sản phẩm không chứa từ 'nam' trong tên
                    if (gender === 'nữ') return !item.tenSanPham.toLowerCase().includes("nam");

                    return true; // Trả về true nếu không chọn giới tính, để hiển thị tất cả
                });
                console.log("Sản phẩm sau khi lọc:", $scope.filteredItems);
            }

            $scope.totalPages = Math.ceil($scope.filteredItems.length / $scope.itemsPerPage);
            $scope.currentPage = 1;
            $scope.updateFilteredItems();
        };



        // Lọc theo loại vàng
        $scope.filterByGoldType = function () {
            var goldType = $scope.selectedGoldType;

            // Kiểm tra xem loại vàng có hợp lệ không trước khi lọc
            if (goldType === undefined || goldType === null || goldType === '') {
                $scope.filteredItems = $scope.items;  // Không lọc nếu giá trị không hợp lệ
            } else {
                $scope.filteredItems = $scope.items.filter(item => {
                    return item.loaiVang === goldType;  // So sánh trực tiếp
                });
                console.log("Sản phẩm sau khi lọc:", $scope.filteredItems);
            }

            $scope.totalPages = Math.ceil($scope.filteredItems.length / $scope.itemsPerPage);
            $scope.currentPage = 1;
            $scope.updateFilteredItems();
        };


        // Lọc theo loại trang sức
        $scope.filterByJewelryType = function () {
            var jewelryType = $scope.selectedJewelryType;

            // Kiểm tra xem loại trang sức có hợp lệ không trước khi lọc
            if (jewelryType === undefined || jewelryType === null || jewelryType === '') {
                $scope.filteredItems = $scope.items;  // Không lọc nếu giá trị không hợp lệ
            } else {
                $scope.filteredItems = $scope.items.filter(item => {
                    // Kiểm tra xem loại trang sức trong item có chứa chuỗi jewelryType
                    return item.loai && item.loai.toLowerCase().includes(jewelryType.toLowerCase());
                });
                console.log("Sản phẩm sau khi lọc:", $scope.filteredItems);
            }

            // Cập nhật số trang và hiển thị lại các sản phẩm sau khi lọc
            $scope.totalPages = Math.ceil($scope.filteredItems.length / $scope.itemsPerPage);
            $scope.currentPage = 1;
            $scope.updateFilteredItems();
        };





        // Cập nhật bộ lọc và hiển thị sản phẩm
        $scope.applyFilters = function () {
            let filtered = $scope.items.filter(item => {
                // Kiểm tra từng bộ lọc và trả về true nếu sản phẩm đáp ứng yêu cầu của tất cả bộ lọc
                let brandMatch = !$scope.selectedBrand || item.chiTiet === $scope.selectedBrand;
                let mainStoneMatch = !$scope.selectedMainStone || item.loaiDa === $scope.selectedMainStone;
                let genderMatch = !$scope.selectedGender ||
                    ($scope.selectedGender === 'nam' && item.tenSanPham.toLowerCase().includes("nam")) ||
                    ($scope.selectedGender === 'nữ' && !item.tenSanPham.toLowerCase().includes("nam"));
                let goldTypeMatch = !$scope.selectedGoldType || item.loaiVang === $scope.selectedGoldType;
                let jewelryTypeMatch = !$scope.selectedJewelryType ||
                    (item.loai && item.loai.toLowerCase().includes($scope.selectedJewelryType.toLowerCase()));

                return brandMatch && mainStoneMatch && genderMatch && goldTypeMatch && jewelryTypeMatch;
            });

            // Cập nhật lại filteredItems và tính toán số trang
            $scope.filteredItems = filtered;
            $scope.totalPages = Math.ceil(filtered.length / $scope.itemsPerPage);
            $scope.currentPage = 1; // Reset trang về 1 sau khi áp dụng bộ lọc
            $scope.updateFilteredItems();
        };

        // Hàm sắp xếp theo giá
        $scope.sortByPrice = function (order) {
            var sortByPrice = $scope.selectedSort;

            // Kiểm tra xem loại đá có hợp lệ không trước khi lọc
            if (sortByPrice === undefined || sortByPrice === null || sortByPrice === '') {
                $scope.filteredItems = $scope.items;  // Không lọc nếu giá trị không hợp lệ
            }
            else if (order === 'asc') {
                $scope.filteredItems.sort((a, b) => a.gia - b.gia); // Sắp xếp giá tăng dần
            } else if (order === 'desc') {
                $scope.filteredItems.sort((a, b) => b.gia - a.gia); // Sắp xếp giá giảm dần
            }
            $scope.currentPage = 1; // Reset về trang 1 sau khi sắp xếp
            $scope.updateFilteredItems(); // Cập nhật lại sản phẩm sau khi sắp xếp
        }

        // Chức năng tìm kiếm
        // $scope.searchItems = function () {
        //     var keyword = $scope.searchText ? $scope.searchText.toLowerCase() : '';

        //     // Lọc sản phẩm theo từ khóa trên toàn bộ sản phẩm
        //     $scope.filteredItems = $scope.items.filter(item => {
        //         return !keyword || item.tenSanPham.toLowerCase().includes(keyword);
        //     });

        //     // Cập nhật số trang dựa trên kết quả tìm kiếm
        //     $scope.totalPages = Math.ceil($scope.filteredItems.length / $scope.itemsPerPage);
        //     $scope.currentPage = 1; // Reset về trang 1
        //     $scope.updateFilteredItems(); // Cập nhật sản phẩm hiển thị sau khi tìm kiếm
        // }
        // Chức năng tìm kiếm
        $scope.searchItems = function () {
            var searchText = $scope.searchText.toLowerCase(); // Chuyển đổi về chữ thường để so sánh
            $scope.filteredItems = $scope.items.filter(item => {
                // Tìm kiếm trong tên sản phẩm, loại đá, và mô tả nếu có
                return item.tenSanPham.toLowerCase().includes(searchText) ||
                    item.loaiDa.toLowerCase().includes(searchText) ||
                    item.loaiVang.toLowerCase().includes(searchText);
            });

            // Cập nhật số trang và hiển thị sản phẩm sau khi tìm kiếm
            $scope.totalPages = Math.ceil($scope.filteredItems.length / $scope.itemsPerPage);
            $scope.currentPage = 1;
            $scope.updateFilteredItems();
        };

        // Hàm gọi lại applyFilters sau khi mỗi bộ lọc thay đổi
        $scope.$watchGroup([
            'selectedBrand',
            'selectedMainStone',
            'selectedGender',
            'selectedGoldType',
            'selectedJewelryType'
        ], function () {
            $scope.applyFilters();
        });
        // Hàm thêm vào giỏ hàng
        $scope.themVaoGioHang = function (product) {
            giohangCtrl.themVaoGioHang(product);
        };
        // Thực hiện tải toàn bộ sản phẩm
        $scope.load_all();
    })

    //========================================================================


    //khai báo controller chitiet san pham

    //========================================================================
    //chi tiet 
    // Định nghĩa controller detailsCtrl
    // Assume product ID is available in the route params or scope
    .controller('productDetailCtrl', function ($scope, $routeParams, $http) {
        const productId = $routeParams.id; // Lấy maSanPham từ URL
        console.log("Product ID from URL:", productId);

        const apiUrl = `http://localhost:9999/api/products/${productId}`;
        const token = localStorage.getItem('token');

        const config = token ? { headers: { 'Authorization': 'Bearer ' + token } } : {};

        $http.get(apiUrl, config)
            .then(function (response) {
                console.log("API Response:", response.data);
                $scope.product = response.data;
            })
            .catch(function (error) {
                console.error("Error loading product details:", error);
                alert("Không thể tải thông tin sản phẩm. Vui lòng thử lại.");
            });
    })





    .controller('CARTCtrl', function ($scope, $rootScope) {

    })
app.controller('hdkhCtrl', function ($scope) {


})

app.controller('brandCtrl', function ($scope, $http) {

})
//========================================================================
//quay lai trang truoc
function goBack() {
    window.history.back();
}