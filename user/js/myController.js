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
    app.controller('profileuserCtrl', function ($scope, $window, $http) {
     // Khởi tạo biến cho thông tin người dùng
$scope.userInfo = {};
$scope.oldPassword = '';
$scope.newPassword = '';
$scope.confirmPassword = '';
$scope.oldPin = '';
$scope.newPin = '';
$scope.confirmNewPin = '';
$scope.isEditing = false; // Khởi tạo chế độ chỉnh sửa là false
$scope.gcoinBalance = 0; // Biến lưu số dư Gcoin
$scope.goldPrice = 0; // Biến lưu giá vàng

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
}).then(function (response) {
    $scope.userInfo = response.data;
    localStorage.setItem('userInfo', JSON.stringify($scope.userInfo)); // Lưu thông tin vào localStorage

   
}).catch(function (error) {
    console.error('Lỗi khi lấy thông tin người dùng:', error);
    alert('Lỗi khi tải thông tin người dùng!');
    logout();
    $window.location.href = 'home.html'; // Chuyển hướng nếu có lỗi
});

// Hàm tải số dư Gcoin và giá vàng



$scope.checkAndCreateGcoinWallet = function () {
    const apiUrl = `http://localhost:9999/api/user/profile/gcoin`;
    
    $http.get(apiUrl, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(function (response) {
        if (response.data.hasWallet) {
            // Nếu đã có ví, hiển thị số dư
            $scope.gcoinBalance = response.data.balance; // Lấy số dư từ phản hồi
        
        } else {
            // Nếu không có ví, tạo ví mới
            $scope.createGcoinWallet();
        }
    }).catch(function (error) {
        console.error('Lỗi khi kiểm tra ví Gcoin:', error);
        alert('Có lỗi xảy ra khi kiểm tra ví Gcoin: ' + (error.data && error.data.message ? error.data.message : ''));
    });
};

// Chỉnh sửa hàm tạo ví Gcoin
$scope.createGcoinWallet = function () {
    $http.post(`http://localhost:9999/api/user/profile/create-gcoin`, {}, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(function (response) {
        alert('Tạo ví Gcoin thành công!');
        $scope.loadGcoinData(); // Tải lại dữ liệu Gcoin sau khi tạo ví
    }).catch(function (error) {
        console.error('Lỗi khi tạo ví Gcoin:', error);
        alert('Tạo ví Gcoin không thành công: ' + (error.data && error.data.message ? error.data.message : ''));
    });
};

// Hàm hiển thị số dư Gcoin và giá vàng
$scope.displayGcoinInfo = function () {
    return `Số dư Gcoin: ${$scope.gcoinBalance} | Giá vàng: ${$scope.goldPrice}`;
};

// Gọi hàm để kiểm tra ví Gcoin khi cần thiết
$scope.checkAndCreateGcoinWallet();




// Hàm upload avatar
$scope.uploadAvatar = function () {
    if (!$scope.avatarFile) {
        alert('Vui lòng chọn một tệp ảnh để tải lên.');
        return;
    }

    var formData = new FormData();
    formData.append('file', $scope.avatarFile);

    // Gọi API của backend để upload ảnh
    $http.post(`http://localhost:9999/api/user/upload/${$scope.userInfo.manguoidung}`, formData, {
        headers: {
            'Content-Type': undefined,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(function (response) {
        $scope.userInfo.avt = response.data; // Cập nhật URL avatar
        alert('Tải lên thành công!');
    }).catch(function (error) {
        console.error('Lỗi khi tải lên avatar:', error);
        alert('Tải lên không thành công: ' + (error.data && error.data.message ? error.data.message : ''));
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

    })
    .controller('spyeuthichCtrl', function ($scope) {

    })
    .controller('spvangCtrl', function ($scope) {

    })
    .controller('giavangCtrl', function ($scope, $http) {
        $scope.goldPrices = [];
        $scope.selectedProduct = null; // Sản phẩm được chọn
        $scope.products = []; // Danh sách sản phẩm vàng
        // ngày 
        $scope.getCurrentDate = function() {
            const today = new Date();
            return today.toLocaleDateString('vi-VN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                weekday: 'long' // Hiển thị thứ trong tuần
            });
        };
        

        $scope.fetchGoldPrices = function() {
            const apiUrl = 'http://localhost:9999/api/gold-prices';
        
            $http.get(apiUrl)
                .then(function(response) {  
                    const dataList = response.data.DataList.Data; // Giả sử cấu trúc dữ liệu API
                    $scope.goldPrices = [];
                    $scope.products = []; // Reset danh sách sản phẩm
        
                    if (Array.isArray(dataList)) {
                        for (let i = 0; i < dataList.length; i++) {
                            const dataItem = dataList[i];
        
                            const name = dataItem['@n_' + (i + 1)] || 'Unknown';
                            const priceBuy = parseFloat(dataItem['@pb_' + (i + 1)]) || 0; // Giá mua
                            const priceSell = parseFloat(dataItem['@ps_' + (i + 1)]) || 0; // Giá bán
                            const dateStr = dataItem['@d_' + (i + 1)] || 'N/A'; // Thời gian
                            
        
                            // Convert the date string "dd/mm/yyyy HH:MM" to ISO format
                            const parts = dateStr.split(' '); // Split date and time
                            const dateParts = parts[0].split('/'); // Split date into day, month, year
                            const timeParts = parts[1].split(':'); // Split time into hours, minutes
        
                            // Create a new date string in ISO format
                            const isoDateStr = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${timeParts[0]}:${timeParts[1]}:00`;
        
                            // Chuyển đổi isoDateStr thành object Date
                            const date = new Date(isoDateStr);
                            if (isNaN(date.getTime())) {
                                console.error('Invalid date format for date string:', dateStr); // Log invalid formats
                                continue; // Skip this entry if the date is invalid
                            }
        
                            // Thêm dữ liệu vào mảng goldPrices
                            $scope.goldPrices.push({
                                name: name,
                                priceBuy: priceBuy,
                                priceSell: priceSell,
                                date: date // Giữ nguyên object Date
                            });
        
                            // Thêm sản phẩm vào danh sách nếu chưa có
                            if (!$scope.products.includes(name)) {
                                $scope.products.push(name);
                            }
                        }
                    }
        
                    // Chọn sản phẩm đầu tiên làm mặc định
                    if ($scope.products.length > 0) {
                        $scope.selectedProduct = $scope.products[0];
                        $scope.updateChart($scope.selectedProduct);
                    }
        
                    $scope.errorMessage = '';
                    if ($scope.goldPrices.length === 0) {
                        $scope.errorMessage = 'Không có dữ liệu giá vàng hiện có.';
                    }
                })
                .catch(function(error) {
                    console.error('Error fetching gold prices:', error);
                    $scope.errorMessage = 'Có lỗi xảy ra khi tải dữ liệu giá vàng. Vui lòng thử lại sau.';
                });
        };
        
        
        // Gọi hàm để lấy giá vàng
        $scope.fetchGoldPrices();
        
        // Hàm để vẽ biểu đồ khi chọn sản phẩm
        $scope.updateChart = function(selectedProduct) {
            var ctx = document.getElementById('goldCanvas').getContext('2d');
        
            // Lấy nhãn là giờ từ dữ liệu
            var filteredPrices = $scope.goldPrices.filter(price => price.name === selectedProduct);
        
            // Sắp xếp các giá theo thời gian
            filteredPrices.sort((a, b) => a.date - b.date);
        
            // Lấy nhãn giờ từ các giá đã sắp xếp
            var labels = filteredPrices.map(function(price) {
                var date = price.date;
                // Chỉ lấy giờ và phút
                return date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0'); // Định dạng giờ:phút
            });
        
            var priceBuyData = filteredPrices.map(function(price) {
                return price.priceBuy;
            });
        
            var priceSellData = filteredPrices.map(function(price) {
                return price.priceSell;
            });
        
            // Nếu đã có biểu đồ trước đó, hãy hủy biểu đồ cũ
            if ($scope.chart) {
                $scope.chart.destroy();
            }
        
            // Tạo biểu đồ mới với cả giá mua và giá bán
            $scope.chart = new Chart(ctx, {
                type: 'line',  // Loại biểu đồ
                data: {
                    labels: labels.length > 0 ? labels : ['Không có dữ liệu'],  // Trục X là giờ
                    datasets: [
                        {
                            label: selectedProduct + ' - Giá Mua',
                            data: priceBuyData.length > 0 ? priceBuyData : [0],  // Dữ liệu giá mua
                            borderColor: 'blue',
                            fill: false
                        },
                        {
                            label: selectedProduct + ' - Giá Bán',
                            data: priceSellData.length > 0 ? priceSellData : [0],  // Dữ liệu giá bán
                            borderColor: 'red',
                            fill: false
                        }
                    ]
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Giờ' // Tiêu đề trục X
                            },
                            ticks: {
                                autoSkip: true,  // Tự động bỏ qua nhãn
                                maxTicksLimit: 10 // Giới hạn số nhãn hiển thị
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
        };
        
        
        // Theo dõi thay đổi khi chọn sản phẩm
        $scope.$watch('selectedProduct', function(newVal, oldVal) {
            if (newVal) {
                $scope.updateChart(newVal);
            }
        });
        
        
        
            })
            
    
    .controller('giohangCtrl', function ($scope) {

    })
    .controller('thanhtoanCtrl', function ($scope) {

    })




    .controller('dsspCtrl', function ($scope,$http) {
        let host = "http://localhost:9999/api";
        $scope.items = []
    $scope.filteredItems = []; // Sản phẩm hiển thị trên mỗi trang
    $scope.currentPage = 1; // Trang hiện tại
    $scope.itemsPerPage = 9; // Số sản phẩm trên mỗi trang
    $scope.totalPages = 0;
    $scope.load_all = function(){
        var url = `${host}/products`;
        $http.get(url).then(resp => {
            $scope.items = resp.data; // Gán dữ liệu sản phẩm từ server
            console.log($scope.items)
            $scope.filteredItems = $scope.items; // Khởi tạo filteredItems với toàn bộ sản phẩm
            $scope.totalPages = Math.ceil($scope.filteredItems.length / $scope.itemsPerPage); // Tính số trang
            $scope.currentPage = 1; // Đặt lại về trang đầu tiên
            $scope.updateFilteredItems(); // Hiển thị sản phẩm của trang đầu tiên
            console.log("Success", resp);
        }).catch(error => {
            console.log("Error", error);
        });
    }
    
    $scope.updateFilteredItems = function(){
        let start = ($scope.currentPage - 1) * $scope.itemsPerPage;
        let end = start + $scope.itemsPerPage;
        
        // Cập nhật filteredItems để hiển thị các sản phẩm trên trang hiện tại
        $scope.filteredItems = $scope.items.slice(start, end);
    }
    
    
    $scope.nextPage = function(){
        if ($scope.currentPage < $scope.totalPages) {
            $scope.currentPage++;
            $scope.updateFilteredItems();
        }
    }
    $scope.previousPage = function(){
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
            $scope.updateFilteredItems();
        }
    }
    $scope.goToPage = function(page){
        if (page >= 1 && page <= $scope.totalPages) {
            $scope.currentPage = page;
            $scope.updateFilteredItems();
        }
    }
    $scope.searchItems = function(){
        var keyword = $scope.searchKeyword ? $scope.searchKeyword.toLowerCase() : ''; 
        var category = $scope.searchByCategory || '';
    
        // Lọc sản phẩm theo từ khóa và loại
        $scope.filteredItems = $scope.items.filter(item => {
            let matchKeyword = !keyword || item.tensanpham.toLowerCase().includes(keyword);
            let matchCategory = !category || item.loaisanpham === category;
            return matchKeyword && matchCategory;
        });
    
        // Cập nhật số trang dựa trên kết quả tìm kiếm
        $scope.totalPages = Math.ceil($scope.filteredItems.length / $scope.itemsPerPage); 
        $scope.currentPage = 1; // Reset về trang 1
        $scope.updateFilteredItems(); // Cập nhật sản phẩm hiển thị sau khi tìm kiếm
    }
    
    
    
    $scope.sortByPrice = ''; // Sắp xếp theo giá

// Hàm sắp xếp
    $scope.sortItems = function(){
        if ($scope.sortByPrice == 'asc') {
            $scope.items.sort((a, b) => a.gia - b.gia); // Sắp xếp giá tăng dần
        } else if ($scope.sortByPrice == 'desc') {
        $scope.items.sort((a, b) => b.gia - a.gia); // Sắp xếp giá giảm dần
        }
    $scope.updateFilteredItems(); // Cập nhật lại sản phẩm sau khi sắp xếp
    }
    // Thực hiện tải toàn bộ products
    $scope.load_all();

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