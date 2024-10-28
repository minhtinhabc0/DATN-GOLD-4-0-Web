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
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
            $window.location.href = '/user/index.html';
        };

    })
//=====================================================================================================
//controller home

    .controller('homeCtrl', function($scope, $http) {
        const userInfo = localStorage.getItem('userInfo');
        $scope.userInfo = userInfo ? JSON.parse(userInfo) : null;
        let host = "http://localhost:9999/api";
    
        $scope.items = [];
        $scope.currentIndex = 0;
        $scope.itemsPerPage = 5; // Number of items visible at once
    
        // Load all products and limit to 10 items
        $scope.load_all = function() {
            var url = `${host}/products`;
            $http.get(url).then(resp => {
                $scope.items = resp.data.slice(0, 15); // Limit to 10 items
            }).catch(error => {
                console.log("Error", error);
            });
        }
        $scope.startAutoSlide = function() {
            setInterval(() => {
                $scope.nextSlide();
            }, 3000); // Chuyển đổi sau mỗi 2000ms (2 giây)
        }
        $scope.startAutoSlide();
    
    
        // Move to the next item with circular behavior
        $scope.nextSlide = function() {
            // Ensure that currentIndex + itemsPerPage doesn't exceed item count
            if ($scope.currentIndex + $scope.itemsPerPage < $scope.items.length) {
                $scope.currentIndex += 1;
            } else {
                $scope.currentIndex = 0; // Return to start if at the end
            }
            $scope.updateCarousel();
        }
    
        // Move to the previous item with circular behavior
        $scope.prevSlide = function() {
            if ($scope.currentIndex > 0) {
                $scope.currentIndex -= 1;
            } else {
                $scope.currentIndex = Math.max(0, $scope.items.length - $scope.itemsPerPage); // Go to end if at start
            }
          
        }
    
        // Function to update the carousel by translating it
      $scope.updateCarousel = function() {
    const wrapper = document.querySelector('.product-carousel-wrapper');
    if (wrapper) { // Kiểm tra nếu wrapper tồn tại
        const translateX = -($scope.currentIndex * (100 / $scope.itemsPerPage)); // Tính toán dịch chuyển
        wrapper.style.transform = `translateX(${translateX}%)`;
    } else {
       console.log("Khum phải lỗi đâu tại trang này không có .product-carousel-wrapper thui hihihi");
    }
};

    
        // Initial load
        $scope.load_all();
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
        alert('Lỗi khi tải thông tin người dùng!');
        logout();
        $window.location.href = 'home.html'; // Chuyển hướng nếu có lỗi
    });
    
    // Tải giá vàng
    $scope.loadPrices = function () {
        GoldPriceService.fetchGoldPrices().then(function (data) {
            $scope.goldPrices = data.goldPrices; // Lưu trữ dữ liệu vào scope
            $scope.firstProduct = $scope.goldPrices[0]; // Lưu sản phẩm đầu tiên
            $scope.calculateGcoinValue(); // Tính giá trị Gcoin
        });
    };
    
    // Tính toán giá trị Gcoin
    $scope.calculateGcoinValue = function () {
        if ($scope.firstProduct) {
            $scope.totalGcoinValue = $scope.gcoinBalance * $scope.firstProduct.priceBuy;
        }
    };
    $scope.hasPin = function() {
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
        }).catch(function(error) {
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
    .controller('spvangCtrl', function ($scope) {

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
});
//====================================================================================================

// Khai báo controller giá vàng
app.controller('giavangCtrl', function ($scope, GoldPriceService) {
    $scope.goldPrices = [];
    $scope.selectedProduct = null;
    $scope.selectedView = null;
    $scope.products = [];
    $scope.views = ['Biểu Đồ', 'Bảng Giá'];
    $scope.filteredGoldPrices = []; // Thêm biến này để lưu trữ giá vàng đã lọc
    $scope.errorMessage = '';

    // Hàm để lấy ngày hiện tại
    $scope.getCurrentDate = function () {
        const today = new Date();
        return today.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
    };

    // Gọi hàm từ service để lấy dữ liệu giá vàng
    $scope.fetchGoldPrices = function () {
        GoldPriceService.fetchGoldPrices().then(function (data) {
            $scope.goldPrices = data.goldPrices;
            $scope.products = data.products;

            if ($scope.products.length > 0) {
                $scope.selectedProduct = $scope.products[0];
                $scope.updateChart($scope.selectedProduct);
                $scope.filteredGoldPrices = $scope.goldPrices; // Hiển thị tất cả giá vàng khi khởi tạo
            } else {
                $scope.errorMessage = 'Không có dữ liệu giá vàng hiện có.';
            }
        }).catch(function (error) {
            $scope.errorMessage = error.message;
        });
    };

    // Gọi hàm fetchGoldPrices khi khởi tạo controller
    $scope.fetchGoldPrices();

    // Hàm để vẽ biểu đồ khi chọn sản phẩm
    $scope.updateChart = function (selectedProduct) {
        if ($scope.selectedView === 'Biểu Đồ') {
            var ctx = document.getElementById('goldCanvas').getContext('2d');
            var filteredPrices = selectedProduct === 'Tất cả' 
                ? $scope.goldPrices 
                : $scope.goldPrices.filter(price => price.name === selectedProduct);

            filteredPrices.sort((a, b) => a.date - b.date);

            var labels = filteredPrices.map(function (price) {
                var date = price.date;
                return date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0');
            });

            var priceBuyData = filteredPrices.map(function (price) {
                return price.priceBuy;
            });

            var priceSellData = filteredPrices.map(function (price) {
                return price.priceSell;
            });

            if ($scope.chart) {
                $scope.chart.destroy();
            }

            $scope.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels.length > 0 ? labels : ['Không có dữ liệu'],
                    datasets: [
                        {
                            label: selectedProduct + ' - Giá Mua',
                            data: priceBuyData.length > 0 ? priceBuyData : [0],
                            borderColor: 'red',
                            fill: false
                        },
                        {
                            label: selectedProduct + ' - Giá Bán',
                            data: priceSellData.length > 0 ? priceSellData : [0],
                            borderColor: 'yellow',
                            fill: false
                        }
                    ]
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Giờ'
                            },
                            ticks: {
                                autoSkip: true,
                                maxTicksLimit: 10
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Giá (VNĐ)'
                            }
                        }
                    }
                }
            });
        }

        // Cập nhật bảng giá
        $scope.filteredGoldPrices = selectedProduct === 'Tất cả' 
            ? $scope.goldPrices 
            : $scope.goldPrices.filter(price => price.name === selectedProduct);
    };

    // Theo dõi sự thay đổi của selectedView để cập nhật chart hoặc bảng
    $scope.$watch('selectedView', function(newValue) {
        if (newValue) {
            $scope.updateChart($scope.selectedProduct);
        }
    });

    // Theo dõi sự thay đổi của selectedProduct để cập nhật chart và bảng
    $scope.$watch('selectedProduct', function(newValue) {
        if (newValue) {
            $scope.updateChart(newValue);
        }
    });
})
    //====================================================================================================


    // Khào báo controller giỏ hàng
    .controller('giohangCtrl', function ($scope) {

    })
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
    .controller('dsspCtrl', function ($scope, $http) {
        let host = "http://localhost:9999/api";
        $scope.items = [];
        $scope.filteredItems = []; // Sản phẩm hiển thị trên mỗi trang
        $scope.currentPage = 1; // Trang hiện tại
        $scope.itemsPerPage = 12; // Số sản phẩm trên mỗi trang
        $scope.totalPages = 0;
        $scope.searchText = ''; // Biến để lưu trữ nội dung tìm kiếm
        $scope.sortByPrice = ''; // Biến để lưu trữ phương thức sắp xếp

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

        // Cập nhật danh sách sản phẩm đã lọc
        $scope.updateFilteredItems = function () {
            let start = ($scope.currentPage - 1) * $scope.itemsPerPage;
            let end = start + $scope.itemsPerPage;

            // Cập nhật filteredItems để hiển thị các sản phẩm trên trang hiện tại
            $scope.filteredItems = $scope.items.slice(start, end);
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

        // Chức năng tìm kiếm
        $scope.searchItems = function () {
            var keyword = $scope.searchText ? $scope.searchText.toLowerCase() : '';

            // Lọc sản phẩm theo từ khóa trên toàn bộ sản phẩm
            $scope.filteredItems = $scope.items.filter(item => {
                return !keyword || item.tensanpham.toLowerCase().includes(keyword);
            });

            // Cập nhật số trang dựa trên kết quả tìm kiếm
            $scope.totalPages = Math.ceil($scope.filteredItems.length / $scope.itemsPerPage);
            $scope.currentPage = 1; // Reset về trang 1
            $scope.updateFilteredItems(); // Cập nhật sản phẩm hiển thị sau khi tìm kiếm
        }



        // Hàm sắp xếp theo giá
        $scope.sortByPrice = function (order) {
            if (order === 'asc') {
                $scope.items.sort((a, b) => a.gia - b.gia); // Sắp xếp giá tăng dần
            } else if (order === 'desc') {
                $scope.items.sort((a, b) => b.gia - a.gia); // Sắp xếp giá giảm dần
            }
            $scope.currentPage = 1; // Reset về trang 1 sau khi sắp xếp
            $scope.updateFilteredItems(); // Cập nhật lại sản phẩm sau khi sắp xếp
        }

        // Thực hiện tải toàn bộ sản phẩm
        $scope.load_all();
    })
    //========================================================================


    //khai báo controller chitiet san pham
    .controller('chitietCtrl', function ($scope, $routeParams, dataService) {


    })
    //========================================================================

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