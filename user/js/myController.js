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

    .controller('homeCtrl', function ($scope, $http, GoldPriceService,) {
      
     const d8sApi = initDimensions({      
       account: "d8s-euumfx",       
       viewers: ["3D"],  		
	 })    

	
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
app.run(function (SharedService) {
    SharedService.fetchGcoinBalance().then(function (balance) {
        console.log('Số dư Gcoin khởi tạo:', balance);
    });
});

app.service('SharedService', function ($http, $q) {
    let gcoinBalance = 0;

    return {
        getGcoinBalance: function () {
            return gcoinBalance;
        },
        setGcoinBalance: function (value) {
            gcoinBalance = value;
        },
        fetchGcoinBalance: function () {
            const deferred = $q.defer();
            $http.get('http://localhost:9999/api/user/profile/gcoin', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(function (response) {
                gcoinBalance = response.data.balance; // Cập nhật giá trị
                deferred.resolve(gcoinBalance);
            }).catch(function (error) {
                console.error('Lỗi khi tải số dư Gcoin:', error);
                deferred.reject(error);
            });
            return deferred.promise; // Trả về Promise để xử lý bất đồng bộ
        }
    };
});

//===============================================================================================
//controller profile
app.controller('profileuserCtrl', function ($scope, $window, $http, GoldPriceService, SharedService) {

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

    // ============================ĐƠN HÀNG NGƯỜI DÙNG==================================================
    // Khởi tạo danh sách đơn hàng
    $scope.donHangs = []; // Lưu trữ dữ liệu đơn hàng


    $scope.pageSize = 2; // Số lượng sản phẩm mỗi trang
    $scope.currentPage = 1; // Trang hiện tại
    $scope.totalPages = 1; // Tổng số trang
    $scope.oderfillter = []; // Dữ liệu đã lọc
    $scope.selectedOrder = {}; // Lưu trữ đơn hàng được chọn
    $scope.ticketQROrder = {};
    $scope.searchKeyword = ''; // Từ khóa tìm kiếm mã đơn hàng
    $scope.selectedStatus = ''; // Trạng thái đã chọn để lọc
    $scope.sortCriteria = ''; // Tiêu chí sắp xếp
    // Tải danh sách đơn hàng
    $scope.loadOrders = function () {
        const apiUrl = 'http://localhost:9999/api/donhangnd';
        $http.get(apiUrl, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            $scope.donHangs = response.data; // Lưu dữ liệu đơn hàng vào scope
            $scope.oderfillter = angular.copy($scope.donHangs);
            console.log($scope.donHangs);
            $scope.calculateTotalPages();
            $scope.paginateData();
        }).catch(function (error) {
            console.error('Lỗi khi tải đơn hàng:', error);
        });
    };

    // Hàm phân trang dữ liệu
    $scope.paginateData = function () {
        const start = ($scope.currentPage - 1) * $scope.pageSize;
        const end = start + $scope.pageSize;
        $scope.oderfillterPage = $scope.oderfillter.slice(start, end); // Hiển thị dữ liệu đã lọc cho trang hiện tại
    };

    // Tính tổng số trang
    $scope.calculateTotalPages = function () {
        $scope.totalPages = Math.ceil($scope.oderfillter.length / $scope.pageSize);
    };

    // Chuyển trang
    $scope.goToPage = function (pageNumber) {
        if (pageNumber < 1 || pageNumber > $scope.totalPages) return; // Kiểm tra xem trang có hợp lệ không
        $scope.currentPage = pageNumber;
        $scope.paginateData(); // Cập nhật dữ liệu cho trang mới
    };
    $scope.showOrderDetails = function (order) {
        console.log(order); // Kiểm tra dữ liệu của đơn hàng
        $scope.selectedOrder = order; // Lưu dữ liệu của đơn hàng được chọn
    };
    $scope.showQRCode = function (order) {
        $scope.ticketQROrder = order;
        // Tìm phần tử chứa mã QR trong ticket modal
        var qrcodeContainer = document.getElementById('qrcodeTicketContainer');

        // Đảm bảo phần tử chứa mã QR không rỗng
        qrcodeContainer.innerHTML = '';  // Xóa mã QR cũ nếu có

        // Tạo mã QR mới
        new QRCode(qrcodeContainer, {
            text: order.maDonHang,  // Dữ liệu là mã đơn hàng
            width: 150,       // Kích thước mã QR
            height: 150,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: 2   // Sử dụng cấp độ sửa lỗi là 2 (L)
        });

        // Mở modal với ticket
        $('#ticketModal').modal('show');
    };
    // Hàm tìm kiếm và lọc đơn hàng
    $scope.filterOrders = function () {
        // Nếu trạng thái và từ khóa tìm kiếm là trống, đặt lại mặc định
        if (!$scope.searchKeyword && !$scope.selectedStatus) {
            $scope.oderfillter = angular.copy($scope.donHangs); // Nếu không lọc, trả lại tất cả đơn hàng
        } else {
            let filtered = $scope.donHangs.filter(function (order) {
                return order.maDonHang.toLowerCase().includes($scope.searchKeyword.toLowerCase());
            });

            // Lọc theo trạng thái
            if ($scope.selectedStatus) {
                filtered = filtered.filter(function (order) {
                    return order.trangThai === $scope.selectedStatus;
                });
            }

            $scope.oderfillter = filtered; // Cập nhật dữ liệu đã lọc
        }
        $scope.totalPages = Math.ceil($scope.oderfillter.length / $scope.pageSize);
        $scope.calculateTotalPages(); // Cập nhật tổng số trang
        $scope.paginateData(); // Phân trang lại dữ liệu
    };

    // Hàm sắp xếp đơn hàng
    $scope.sortOrders = function () {
        // Nếu không có lựa chọn sắp xếp, đặt lại mặc định
        if (!$scope.sortCriteria) {
            $scope.oderfillter = angular.copy($scope.donHangs); // Trả lại dữ liệu mặc định
        } else {
            switch ($scope.sortCriteria) {
                case '1':
                    // Sắp xếp theo "Mới nhất"
                    $scope.oderfillter.sort((a, b) => new Date(b.thoiGian) - new Date(a.thoiGian));
                    break;
                case '2':
                    // Sắp xếp theo "Cũ nhất"
                    $scope.oderfillter.sort((a, b) => new Date(a.thoiGian) - new Date(b.thoiGian));
                    break;
                case '3':
                    // Sắp xếp theo "Giá trị cao nhất"
                    $scope.oderfillter.sort((a, b) => b.tongTien - a.tongTien);
                    break;
                case '4':
                    // Sắp xếp theo "Giá trị thấp nhất"
                    $scope.oderfillter.sort((a, b) => a.tongTien - b.tongTien);
                    break;
                default:
                    break;
            }
        }
        $scope.totalPages = Math.ceil($scope.oderfillter.length / $scope.pageSize);
        $scope.calculateTotalPages(); // Cập nhật tổng số trang sau khi sắp xếp
        $scope.paginateData(); // Phân trang lại dữ liệu
    };





    // Khởi động tải đơn hàng khi trang được tải
    $scope.loadOrders();

    // ===========================================================================================================

    // ============================ Hóa Đơn NGƯỜI DÙNG==================================================
    // Khởi tạo danh sách hóa đơn
    $scope.hoaDons = []; // Lưu trữ dữ liệu hóa đơn


    $scope.pageSizeHoaDon = 4; // Số lượng sản phẩm mỗi trang
    $scope.currentPageHoaDon = 1; // Trang hiện tại
    $scope.totalPagesHoaDon = 1; // Tổng số trang
    $scope.billfillter = []; // Dữ liệu đã lọc
    $scope.selectedBill = {}
    // Tải danh sách hóa đơn
    $scope.loadbills = function () {
        const apiUrl = 'http://localhost:9999/api/hoadonnd';
        $http.get(apiUrl, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            $scope.hoaDons = response.data; // Lưu dữ liệu hóa đơn vào scope
            $scope.billfillter = angular.copy($scope.hoaDons);

            $scope.calculateTotalPagesHoaDon();
            $scope.paginateDataHoaDon();
        }).catch(function (error) {
            console.error('Lỗi khi tải hóa đơn:', error);
            alert('Không thể tải hóa đơn. Vui lòng kiểm tra kết nối hoặc thử lại sau.');
        });

    };
    $scope.showBillDetails = function (hoaDon) {
        console.log(hoaDon); // Kiểm tra dữ liệu của Bill
        $scope.selectedBill = hoaDon; // Lưu dữ liệu của Bill được chọn
        $('#billDetailsModal').modal('show'); // Mở modal chi tiết Bill
    };
    $scope.calculateTotalPrice = function (gia, soLuong) {
        var price = parseFloat(gia.replace(/,/g, ''));
        var quantity = parseInt(soLuong, 10);
        return price * quantity;
    };



    // Hàm phân trang dữ liệu
    $scope.paginateDataHoaDon = function () {
        const start = ($scope.currentPageHoaDon - 1) * $scope.pageSizeHoaDon;
        const end = start + $scope.pageSizeHoaDon;
        $scope.billfillterPage = $scope.billfillter.slice(start, end); // Hiển thị dữ liệu đã lọc cho trang hiện tại
    };

    // Tính tổng số trang
    $scope.calculateTotalPagesHoaDon = function () {
        $scope.totalPagesHoaDon = Math.ceil($scope.billfillter.length / $scope.pageSizeHoaDon);
    };

    // Chuyển trang
    $scope.goToPageHoaDon = function (pageNumber) {
        if (pageNumber < 1 || pageNumber > $scope.totalPagesHoaDon) return; // Kiểm tra xem trang có hợp lệ không
        $scope.currentPageHoaDon = pageNumber;
        $scope.paginateDataHoaDon(); // Cập nhật dữ liệu cho trang mới
    };

    $scope.removeBrackets = function (input) {
        if (input) {
            return input.replace(/[\[\]"]/g, '');  // Loại bỏ dấu ngoặc vuông và dấu "
        }
        return input;
    };

    $scope.filterOrdersHoaDon = function () {
        // Lấy từ khóa tìm kiếm và trạng thái đã chọn
        const searchKeyword = $scope.searchKeywordHoaDon || ''; // Nếu không có từ khóa thì mặc định là rỗng
        const selectedStatus = $scope.selectedStatusHoaDon || ''; // Nếu không có trạng thái thì mặc định là rỗng

        // Lọc danh sách hóa đơn dựa trên từ khóa và trạng thái
        $scope.billfillter = $scope.hoaDons.filter(function (hoaDon) {
            // Chuyển đổi searchKeyword thành kiểu số nếu có thể, hoặc để nó là rỗng
            const searchKeywordNumeric = searchKeyword ? parseInt(searchKeyword, 10) : '';

            // Kiểm tra nếu mahoadon và trạng thái khớp với điều kiện
            const matchesKeyword = searchKeyword === '' || hoaDon.maHoaDon === searchKeywordNumeric; // So sánh mahoadon
            const matchesStatus = selectedStatus === '' || hoaDon.trangThai === selectedStatus; // So sánh trạng thái

            // Trả về các hóa đơn thỏa mãn cả 2 điều kiện
            return matchesKeyword && matchesStatus;
        });

        // Cập nhật lại tổng số trang và phân trang dữ liệu
        $scope.calculateTotalPagesHoaDon();
        $scope.paginateDataHoaDon();
    };






    $scope.sortOrdersHoaDon = function () {
        if (!$scope.sortCriteriaHoaDon) {
            // Reset về danh sách gốc
            $scope.billfillter = angular.copy($scope.hoaDons);
            $scope.calculateTotalPagesHoaDon();
            $scope.paginateDataHoaDon();
            return;
        }

        $scope.billfillter.sort(function (a, b) {
            switch ($scope.sortCriteriaHoaDon) {
                case '1': // Mới nhất
                    return new Date(b.ngayInHoaDon) - new Date(a.ngayInHoaDon);
                case '2': // Cũ nhất
                    return new Date(a.ngayInHoaDon) - new Date(b.ngayInHoaDon);
                case '3': // Giá trị cao nhất
                    return b.tongTien - a.tongTien;
                case '4': // Giá trị thấp nhất
                    return a.tongTien - b.tongTien;
                default:
                    return 0;
            }
        });
        $scope.totalPagesHoaDon = Math.ceil($scope.billfillter.length / $scope.pageSizeHoaDon);
        $scope.calculateTotalPagesHoaDon();
        $scope.paginateDataHoaDon(); // Cập nhật phân trang
    };

    // Khởi động tải hóa đơn khi trang được tải
    $scope.loadbills();

    // ===========================================================================================================




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
            $scope.totalGcoinValue = $scope.firstProduct.priceBuy * (0.1 / 100) * $scope.gcoinBalance;
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
            $scope.gcoinBalance = response.data.balance;
            SharedService.setGcoinBalance($scope.gcoinBalance);// Lấy số dư từ phản hồi
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
      // Mở modal Quy đổi
      $scope.openExchangeModal = function () {
        document.getElementById('exchange-modal').style.display = 'block';
    };
  // Đóng modal Quy đổi
  $scope.closeExchangeModal = function () {
    document.getElementById('exchange-modal').style.display = 'none';
};

// Gửi yêu cầu Quy đổi Gcoin sang vàng
$scope.exchangeGold = function () {
    $http.post('http://localhost:9999/api/user/profile/exchange-gold', null, {
        params: { goldAmount: $scope.goldAmount },
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).then(function (response) {
        alert(response.data.message);
        $scope.goldAmount = 0;
        $scope.closeExchangeModal();
        $scope.loadTransactionHistory();
    }).catch(function (error) {
        alert(error.data.message || 'Đã xảy ra lỗi khi quy đổi.');
    });
};

// // Lấy danh sách lịch sử giao dịch
$scope.loadTransactionHistory = function () {
    $http.get('http://localhost:9999/api/user/profile/transaction-history', {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).then(function (response) {
        $scope.transactions = response.data; // Lưu danh sách giao dịch vào scope
    }).catch(function (error) {
        console.error('Không thể tải lịch sử giao dịch:', error);
        alert(error.data?.message || 'Đã xảy ra lỗi khi tải lịch sử giao dịch.');
    });
};

// Tải dữ liệu khi trang được khởi tạo
$scope.loadTransactionHistory();
$scope.viewTransactionDetail = function (transactionId) {
    $http.get('http://localhost:9999/api/user/profile/transaction-detail/' + transactionId, {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).then(function (response) {
        $scope.selectedTransaction = response.data; // Lưu thông tin giao dịch vào scope
        $('#transactionDetailModal').modal('show'); // Hiển thị modal chi tiết
    }).catch(function (error) {
        console.error('Không thể tải chi tiết giao dịch:', error);
        alert(error.data?.message || 'Đã xảy ra lỗi khi tải chi tiết giao dịch.');
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



app.controller('spyeuthichCtrl', function ($scope, $http, $location) {
    // Khai báo các biến trong scope
    $scope.favoriteProducts = []; // Danh sách sản phẩm yêu thích
    $scope.pageSize = 5; // Số lượng sản phẩm mỗi trang
    $scope.currentPage = 1; // Trang hiện tại
    $scope.totalPages = 1; // Tổng số trang
    $scope.favoritesFiltered = []; // Dữ liệu đã lọc
    $scope.productDetail = {}; // Chi tiết sản phẩm
    $scope.searchKeyword = ""; // Từ khóa tìm kiếm
    $scope.sortCriteria = ""; // Tiêu chí sắp xếp
    $scope.goToDetail = function (product) {
        if (!product || !product.maSanPham) {
            console.error("Product ID is undefined:", product);
            alert("Sản phẩm không có mã hợp lệ.");
            return;
        }
        console.log("Navigating to product detail:", product);
        $location.path('/user/product/' + product.maSanPham);
    };
    // Hàm khởi tạo khi controller được gọi
    $scope.init = function () {
        $scope.getFavoriteProducts();
    };

    // API lấy danh sách sản phẩm yêu thích
    $scope.getFavoriteProducts = function () {
        $http.get('http://localhost:9999/api/yeuthich', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
            .then(function (response) {
                console.log('Dữ liệu lấy được từ API:', response.data); // Log dữ liệu nhận được từ API
                $scope.favoriteProducts = response.data; // Chỉ cần gán trực tiếp vào favoriteProducts
                $scope.favoritesFiltered = angular.copy($scope.favoriteProducts);

                $scope.calculateTotalPages();
                $scope.paginateData();
            })
            .catch(function (error) {
                console.error('Lỗi khi gọi API:', error);
            });
    };


    $scope.removeProductFromFavorites = function (maSanPham) {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Token không hợp lệ. Vui lòng đăng nhập lại.");
            return;
        }

        console.log("Đang xóa sản phẩm với mã:", maSanPham);

        $http({
            method: 'DELETE',
            url: 'http://localhost:9999/api/yeuthich/' + maSanPham,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(function (response) {
                if (response.status === 200) {
                    console.log("Dữ liệu trả về:", response.data);

                    $scope.getFavoriteProducts();
                } else {
                    alert("Không thể xóa sản phẩm");
                }
            })
            .catch(function (error) {
                console.error("Lỗi khi gọi API:", error);
                alert("Đã xảy ra lỗi khi xóa sản phẩm");
            });




    };






    // Hàm phân trang dữ liệu
    $scope.paginateData = function () {
        const start = ($scope.currentPage - 1) * $scope.pageSize;
        const end = start + $scope.pageSize;
        $scope.favoriteProductsPage = $scope.favoritesFiltered.slice(start, end); // Hiển thị dữ liệu đã lọc cho trang hiện tại
    };

    // Tính tổng số trang
    $scope.calculateTotalPages = function () {
        $scope.totalPages = Math.ceil($scope.favoritesFiltered.length / $scope.pageSize);
    };

    // Chuyển trang
    $scope.goToPage = function (pageNumber) {
        if (pageNumber < 1 || pageNumber > $scope.totalPages) return; // Kiểm tra xem trang có hợp lệ không
        $scope.currentPage = pageNumber;
        $scope.paginateData(); // Cập nhật dữ liệu cho trang mới
    };

    // Hàm tìm kiếm sản phẩm yêu thích
    $scope.filterFavorites = function () {
        $scope.favoritesFiltered = $scope.favoriteProducts.filter(function (product) {
            return product.tenSanPham.toLowerCase().includes($scope.searchKeyword.toLowerCase());
        });
        $scope.calculateTotalPages();
        $scope.currentPage = 1; // Reset lại trang hiện tại khi tìm kiếm
        $scope.paginateData(); // Cập nhật dữ liệu sau khi lọc
    };

    // Hàm sắp xếp sản phẩm yêu thích
    $scope.sortFavorites = function () {
        if ($scope.sortCriteria === "1") {
            $scope.favoritesFiltered.sort((a, b) => new Date(b.thoiGian) - new Date(a.thoiGian)); // Mới nhất
        } else if ($scope.sortCriteria === "2") {
            $scope.favoritesFiltered.sort((a, b) => new Date(a.thoiGian) - new Date(b.thoiGian)); // Cũ nhất
        } else if ($scope.sortCriteria === "3") {
            $scope.favoritesFiltered.sort((a, b) => b.gia - a.gia); // Giá trị cao nhất
        }
        $scope.calculateTotalPages();
        $scope.currentPage = 1; // Reset lại trang hiện tại khi sắp xếp
        $scope.paginateData(); // Cập nhật dữ liệu sau khi sắp xếp
    };

    // Gọi hàm khởi tạo khi controller được khởi tạo
    $scope.init();
})


    .controller('spvangCtrl', function ($scope, $http, GoldPriceService, SharedService) {
        $scope.goldPrices = [];
        $scope.SJCPrices = null;
        $scope.total_price = null; // Khởi tạo với giá trị hợp lệ
        $scope.gold_quantity = null; // Khởi tạo với giá trị hợp lệ
        $scope.gcoinBalance = SharedService.getGcoinBalance();
        SharedService.fetchGcoinBalance().then(function (balance) {
            $scope.gcoinBalance = balance; // Cập nhật nếu cần thiết
            console.log('Số dư Gcoin trong spvangCtrl:', balance);
        });
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
                url: 'http://localhost:9999/api/checkout/create',
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
// Khai báo controller gia vang
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
    $scope.$watch('selectedView', function (newValue) {
        if (newValue) {
            $scope.updateChart($scope.selectedProduct);
        }
    });

    // Theo dõi sự thay đổi của selectedProduct để cập nhật chart và bảng
    $scope.$watch('selectedProduct', function (newValue) {
        if (newValue) {
            $scope.updateChart(newValue);
        }
    });
})
//====================================================================================================


// Khào báo controller giỏ hàng

app.controller('giohangCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {

    // Kiểm tra người dùng đã đăng nhập hay chưa bằng cách lấy token từ localStorage
    function getAuthToken() {
        return localStorage.getItem("token");
    }

    // Lấy thông tin giỏ hàng
    // Gọi API lấy giỏ hàng từ backend
    $scope.getCart = function () {
        const token = getAuthToken();
        if (!token) {
            Swal.fire({
                title: 'Yêu cầu đăng nhập!',
                text: 'Vui lòng đăng nhập để xem giỏ hàng.',
                icon: 'warning', // Biểu tượng cảnh báo
                confirmButtonText: 'Đăng nhập',
                confirmButtonColor: '#3085d6', // Màu của nút đăng nhập
                background: '#f8f9fa', // Màu nền của thông báo
                backdrop: true, // Hiển thị nền mờ
                showCancelButton: true, // Hiển thị nút hủy
                cancelButtonText: 'Đóng', // Văn bản nút hủy
                cancelButtonColor: '#d33' // Màu của nút hủy
            }).then((result) => {
                if (result.isConfirmed) {
                    // Điều hướng người dùng đến trang đăng nhập
                    $window.location.href = "http://127.0.0.1:5501/user/html/login.html";
                }
            });
        
            // Ngăn người dùng truy cập tiếp
            return;
        }
        

        $http.get('http://localhost:9999/api/user/giohang', {
            headers: { 'Authorization': 'Bearer ' + token }
        }).then(function (response) {
            $scope.gioHang = response.data;
            console.log($scope.gioHang);
            $scope.calculateTotal();// Cập nhật giỏ hàng trong UI
        }).catch(function (error) {

        });
    };
    $scope.calculateTotal = function () {
        $scope.totalAmount = 0; // Khởi tạo biến tổng tiền
        // Duyệt qua từng sản phẩm trong gioHang và cộng dồn vào tổng tiền
        if ($scope.gioHang && Array.isArray($scope.gioHang)) {
            $scope.gioHang.forEach(function (item) {
                // Tính tổng tiền cho từng sản phẩm
                if (item.sanPham && item.soLuong) {
                    $scope.totalAmount += (item.sanPham.gia + item.sanPham.tienCong) * item.soLuong; // Cộng dồn giá trị sản phẩm * số lượng
                }
            });
        }
        console.log("Tổng tiền giỏ hàng: ", $scope.totalAmount); // In tổng tiền ra console để kiểm tra
    };

    // Hàm xử lý khi người dùng cập nhật số lượng sản phẩm trong giỏ hàng
    $scope.updateQuantity = function (item, change) {
        // Kiểm tra số lượng sản phẩm không để nó nhỏ hơn 1
        if (item.soLuong + change < 1) {
            alert("Số lượng không thể nhỏ hơn 1!");
            return;
        }

        // Cập nhật số lượng sản phẩm trong giỏ hàng
        item.soLuong += change;

        // Gửi yêu cầu cập nhật số lượng sản phẩm trong giỏ hàng
        const token = getAuthToken();
        if (!token) {
            alert("Bạn cần đăng nhập để cập nhật giỏ hàng!");
            $window.location.href = "http://127.0.0.1:5501/user/html/login.html";
            return;
        }
        // Tạo đối tượng CartRequest để gửi lên API


        // Gửi yêu cầu PUT (cập nhật giỏ hàng) thay vì POST, vì bạn đang chỉnh sửa giỏ hàng hiện tại
        $http.post('http://localhost:9999/api/user/giohang', item, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(function (response) {
            $scope.getCart();
        }).catch(function (error) {
            $scope.getCart();
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
        $http.delete('http://localhost:9999/api/user/giohang/' + item.sanPham.maSanPham, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(function (response) {
            alert('Sản phẩm đã được xóa khỏi giỏ hàng!');
            $scope.getCart();
            $scope.getCart(); // Tải lại giỏ hàng
        }).catch(function (error) {
            $scope.getCart();
        });
    };




    // THANH TOÁN TRANG SỨC
    $scope.isProcessing = false;

    $scope.checkout = function () {
        $scope.isProcessing = true; // Bắt đầu xử lý
        const token = getAuthToken();
        if (!token) {
            alert("Bạn cần đăng nhập để thực hiện thanh toán!");
            $window.location.href = "http://127.0.0.1:5501/user/html/login.html";
            return;
        }

        const paymentTSRequest = {
            totalAmount: $scope.totalAmount,
            items: $scope.gioHang.map(item => ({
                maSanPham: item.sanPham.maSanPham,
                tenSanPham: item.sanPham.tenSanPham,
                gia: item.sanPham.gia + item.sanPham.tienCong,
                soLuong: item.soLuong
            }))
        };

        $http.post('http://localhost:9999/api/checkoutTS/create', paymentTSRequest, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(function (response) {
            $scope.isProcessing = false; // Kết thúc xử lý
            if (response.data && response.data.checkoutUrl) {
                $window.location.href = response.data.checkoutUrl;
            } else {
                alert("Thanh toán thất bại! Vui lòng thử lại.");
            }
        }).catch(function (error) {
            $scope.isProcessing = false; // Kết thúc xử lý
            console.error("Lỗi khi xử lý thanh toán:", error);
            alert("Có lỗi xảy ra khi thanh toán. Vui lòng thử lại sau.");
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
    .controller('productDetailCtrl', function ($scope, $routeParams, $http, $window) {
        $scope.calculatePrice = function (gia) {
            if (gia > 70000000) {
                return gia + 20000000;
            } else if (gia > 50000000) {
                return gia + 10000000;
            } else if (gia > 20000000) {
                return gia + 7000000;
            } else if (gia > 10000000) {
                return gia + 5000000;
            } else if (gia > 5000000) {
                return gia + 2000000;
            } else if (gia <= 1000000) {
                return gia + 200000;
            }
        };

        const productId = $routeParams.id; // Lấy maSanPham từ URL
        console.log("Product ID from URL:", productId);

        const apiUrl = `http://localhost:9999/api/products/${productId}`;
        const token = localStorage.getItem('token');

        const config = token ? { headers: { 'Authorization': 'Bearer ' + token } } : {};

        // Lấy thông tin sản phẩm
        $http.get(apiUrl)
            .then(function (response) {
                console.log("API Response:", response.data);
                $scope.product = response.data;
            })
            .catch(function (error) {
                console.error("Error loading product details:", error);
                alert("Không thể tải thông tin sản phẩm. Vui lòng thử lại.");
            });

        $scope.selectedSize = null; // Biến để lưu kích thước được chọn

        // Chọn kích thước sản phẩm
        $scope.selectSize = function (size) {
            $scope.selectedSize = size;
            console.log("Kích thước được chọn:", $scope.selectedSize);
        };

        // Thêm sản phẩm vào giỏ hàng
        $scope.addToCart = function () {
            const gioHangData = {
                sanPham: $scope.product,
                soLuong: 1,  // Ví dụ, số lượng mặc định là 1
                kichThuoc: $scope.selectedSize
            };

            // Lấy token từ localStorage hoặc sessionStorage
            const token = localStorage.getItem('token');

            if (!token) {
                Swal.fire({
                    title: 'Yêu cầu đăng nhập!',
                    text: 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.',
                    icon: 'warning', // Biểu tượng cảnh báo
                    confirmButtonText: 'Đăng nhập',
                    confirmButtonColor: '#3085d6', // Màu của nút
                    background: '#f8f9fa', // Màu nền của thông báo
                    backdrop: true, // Hiển thị nền mờ
                    showCancelButton: true, // Hiển thị nút hủy
                    cancelButtonText: 'Đóng', // Văn bản nút hủy
                    cancelButtonColor: '#d33' // Màu của nút hủy
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Điều hướng người dùng đến trang đăng nhập
                        window.location.href = '../user/html/login.html'; // Thay bằng đường dẫn tới trang đăng nhập của bạn
                    }
                });

                return;
            }

            // Cấu hình header với Authorization
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            };

            if (!$scope.selectedSize) {
                Swal.fire({
                    title: 'Thông Báo !',
                    text: 'Vui lòng chọn kích thước sản phẩm ',
                    icon: 'warning',  // Biểu tượng thành công
                    confirmButtonText: 'Đóng',  // Nút xác nhận
                    confirmButtonColor: '#3085d6',  // Màu của nút
                    background: '#f8f9fa',  // Màu nền của thông báo
                    backdrop: true,  // Hiển thị nền mờ
                    timerProgressBar: true  // Hiển thị thanh tiến trình
                });
                return;
            }


            // Gửi yêu cầu POST để thêm sản phẩm vào giỏ hàng
            const addToCartUrl = 'http://localhost:9999/api/user/giohang';
            $http.post(addToCartUrl, gioHangData, config)
                .then(function (response) {
                    console.log("Sản phẩm đã được thêm vào giỏ hàng:", response.data);
                    Swal.fire({
                        title: 'Thành công!',
                        text: 'Sản phẩm đã được thêm vào giỏ hàng',
                        icon: 'success',  // Biểu tượng thành công
                        confirmButtonText: 'Đóng',  // Nút xác nhận
                        confirmButtonColor: '#3085d6',  // Màu của nút
                        background: '#f8f9fa',  // Màu nền của thông báo
                        backdrop: true,  // Hiển thị nền mờ
                        timer: 3000,  // Thời gian tự động đóng thông báo (3 giây)
                        timerProgressBar: true  // Hiển thị thanh tiến trình
                    });
                })
                .catch(function (error) {
                    console.error("Lỗi khi thêm vào giỏ hàng:", error);
                    Swal.fire({
                        title: 'Yêu cầu đăng nhập!',
                        text: 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.',
                        icon: 'warning', // Biểu tượng cảnh báo
                        confirmButtonText: 'Đăng nhập',
                        confirmButtonColor: '#3085d6', // Màu của nút
                        background: '#f8f9fa', // Màu nền của thông báo
                        backdrop: true, // Hiển thị nền mờ
                        showCancelButton: true, // Hiển thị nút hủy
                        cancelButtonText: 'Đóng', // Văn bản nút hủy
                        cancelButtonColor: '#d33' // Màu của nút hủy
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Điều hướng người dùng đến trang đăng nhập
                            window.location.href = '/user/html/login'; // Thay bằng đường dẫn tới trang đăng nhập của bạn
                        }
                    });

                });
        };

        // Api thêm sản phẩm vào trang yêu thích
        $scope.addProductToFavorites = function (maSanPham) {
            // Lấy token từ localStorage hoặc từ nơi bạn lưu trữ token (có thể là sessionStorage, cookie, v.v.)
            // Thay đổi theo cách bạn lưu trữ token
            const token = localStorage.getItem('token');
            if (!token) {
                Swal.fire({
                    title: 'Yêu cầu đăng nhập!',
                    text: 'Vui lòng đăng nhập để thêm sản phẩm vào Yêu thích',
                    icon: 'warning', // Biểu tượng cảnh báo
                    confirmButtonText: 'Đăng nhập',
                    confirmButtonColor: '#3085d6', // Màu của nút
                    background: '#f8f9fa', // Màu nền của thông báo
                    backdrop: true, // Hiển thị nền mờ
                    showCancelButton: true, // Hiển thị nút hủy
                    cancelButtonText: 'Đóng', // Văn bản nút hủy
                    cancelButtonColor: '#d33' // Màu của nút hủy
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Điều hướng người dùng đến trang đăng nhập
                        window.location.href = '/login'; // Thay bằng đường dẫn tới trang đăng nhập của bạn
                    }
                });

                return;
            }

            $http({
                method: 'POST',
                url: 'http://localhost:9999/api/yeuthich/add',
                headers: {
                    'Authorization': 'Bearer ' + token // Gửi token trong header
                },
                params: {  // Truyền tham số qua URL thay vì body
                    maSanPham: maSanPham
                }
            })
                .then(function (response) {
                    if (response.status === 200) {
                        console.log("Dữ liệu trả về:", response.data);
                        Swal.fire({
                            title: 'Thành công!',
                            text: 'Sản phẩm đã được thêm vào yêu thích',
                            icon: 'success',  // Biểu tượng thành công
                            confirmButtonText: 'Đóng',  // Nút xác nhận
                            confirmButtonColor: '#3085d6',  // Màu của nút
                            background: '#f8f9fa',  // Màu nền của thông báo
                            backdrop: true,  // Hiển thị nền mờ
                            timer: 3000,  // Thời gian tự động đóng thông báo (3 giây)
                            timerProgressBar: true  // Hiển thị thanh tiến trình
                        });
                        $scope.getFavoriteProducts();
                    } else {
                        alert("Không thể thêm sản phẩm");
                    }
                })
                .catch(function (error) {
                    // Xử lý lỗi
                    if (error.status === 401) {
                        alert("Token không hợp lệ. Vui lòng đăng nhập lại.");
                    } else if (error.status === 403) {
                        alert("Tài khoản không tồn tại.");
                    } else if (error.status === 404) {
                        alert("Sản phẩm không tồn tại.");
                    }
                });
        };

        app.filter('momentFormat', function () {
            return function (input) {
                return moment(input).fromNow();  // Tính thời gian đã trôi qua (ví dụ: "5 phút trước")
            };
        });


        $scope.reviews = []; // Danh sách đánh giá
        $scope.review = { rating: 5, comment: '' }; // Mặc định số sao và nhận xét

        // Lấy thông tin sản phẩm
        $http.get(`http://localhost:9999/api/products/${productId}`)
            .then(function (response) {
                $scope.product = response.data;
            })
            .catch(function (error) {
                console.error("Error loading product details:", error);
                alert("Không thể tải thông tin sản phẩm. Vui lòng thử lại.");
            });

        // Lấy danh sách đánh giá
        $scope.loadReviews = function () {
            $http.get(`http://localhost:9999/api/danhgia/sanpham/${productId}`)
                .then(function (response) {
                    $scope.reviews = response.data;
                    console.log("Danh sách đánh giá:", $scope.reviews);
                })
                .catch(function (error) {
                    console.error("Error loading reviews:", error);

                });
        };
        $scope.loadReviews(); // Gọi khi khởi tạo

        // Gửi đánh giá mới
        $scope.submitReview = function () {
            if (!$scope.review.comment || !$scope.review.rating) {
                alert("Vui lòng nhập đầy đủ thông tin đánh giá.");
                return;
            }

            // Prepare the review data to match the expected structure
            const reviewData = {
                maSanPham: productId,     // ID of the product
                DiemDanhGia: $scope.review.rating, // Rating (soSao)
                NoiDungDanhGia: $scope.review.comment  // Comment (nhanXet)
            };

            console.log("Review Data:", reviewData);

            // Get the Authorization token (for example, from local storage or the user's session)
            const token = localStorage.getItem('token');  // Adjust based on your actual token storage

            // Set the Authorization header in the config
            const config = {
                headers: {
                    'Authorization': `Bearer ` + localStorage.getItem('token')  // Pass the token in the Authorization header
                }
            };

            // Make the POST request to submit the review
            $http.post(`http://localhost:9999/api/danhgia/add/${productId}`, reviewData, config

            )
                .then(function (response) {
                    Swal.fire({
                        title: 'Thành công!',
                        text: 'Đánh giá của bạn đã được gửi. Cảm ơn bạn đã phản hồi!',
                        icon: 'success', // Biểu tượng thành công
                        confirmButtonText: 'Đóng', // Nút xác nhận
                        confirmButtonColor: '#3085d6', // Màu của nút xác nhận
                        background: '#f8f9fa', // Màu nền của thông báo
                        backdrop: true, // Hiển thị nền mờ
                        timer: 3000, // Thời gian tự động đóng thông báo (3 giây)
                        timerProgressBar: true // Hiển thị thanh tiến trình
                    });

                    $scope.review = { rating: 5, comment: '' }; // Reset form
                    $scope.loadReviews(); // Reload reviews (or call your reviews fetching function)
                })
                .catch(function (error) {
                    console.error("Error submitting review:", error);
                    Swal.fire({
                        title: 'Yêu cầu đăng nhập!',
                        text: 'Vui lòng đăng nhập để có thể đánh giá sản phẩm',
                        icon: 'warning', // Biểu tượng cảnh báo
                        confirmButtonText: 'Đăng nhập',
                        confirmButtonColor: '#3085d6', // Màu của nút
                        background: '#f8f9fa', // Màu nền của thông báo
                        backdrop: true, // Hiển thị nền mờ
                        showCancelButton: true, // Hiển thị nút hủy
                        cancelButtonText: 'Đóng', // Văn bản nút hủy
                        cancelButtonColor: '#d33' // Màu của nút hủy
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Điều hướng người dùng đến trang đăng nhập
                            window.location.href = '/login'; // Thay bằng đường dẫn tới trang đăng nhập của bạn
                        }
                    });

                });
        };


        app.filter('range', function () {
            return function (input, total) {
                total = parseInt(total); // Convert total to an integer
                for (var i = 0; i < total; i++) {
                    input.push(i); // Push values into the array up to the 'total' value
                }
                return input;
            };
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