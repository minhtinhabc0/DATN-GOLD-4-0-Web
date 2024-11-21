(() => {
    "use strict";
    const forms = document.querySelectorAll(".needs-validation");
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
app.controller("MainController", function ($scope, $location, $window) {
    const distributorInfo = localStorage.getItem('distributorInfo');
    $scope.distributorInfo = distributorInfo ? JSON.parse(distributorInfo) : null;


    // If adminInfo is null, redirect to login page
    if (!$scope.distributorInfo) {
        $window.location.href = '/distributor/html/login.html';
    }
    $scope.changeRoute = function (route) {
        $location.path(route);
    };


    $scope.logout1 = function () {
        Swal.fire({
            title: 'Bạn muốn đăng xuất?',
            text: 'Nếu bạn đăng xuất, bạn sẽ phải đăng nhập lại để tiếp tục.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '<i class="fa fa-check"></i> Có, đăng xuất',
            cancelButtonText: '<i class="fa fa-times"></i> Không, quay lại',
            confirmButtonColor: '#d4af37', // Nền vàng ánh kim
            cancelButtonColor: '#f44336', // Nền đỏ tươi
            reverseButtons: true,
            customClass: {
                title: 'swal-title', // Tùy chỉnh tiêu đề thông báo
                text: 'swal-text', // Tùy chỉnh nội dung thông báo
                cancelButton: 'swal-btn-cancel', // Tùy chỉnh nút hủy
                confirmButton: 'swal-btn-confirm' // Tùy chỉnh nút xác nhận
            }
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('distributorInfo');
                localStorage.removeItem('token1');
                window.location.href = '/distributor/html/login.html'; // Redirect to login page
            }
        });
    };

});

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/distributor/bangdieukhien', {
            templateUrl: '/distributor/html/bangdieukhien.html',
            controller: 'bangdieukhienCtrl'
        })
        .when('/distributor/quanlysanpham', {
            templateUrl: '/distributor/html/quanlysanpham.html',
            controller: 'quanlysanphamCtrl'
        })
        .when('/distributor/quanlydonhang', {
            templateUrl: '/distributor/html/quanlydonhang.html',
            controller: 'quanlydonhangCtrl'
        })
        .when('/distributor/baocao', {
            templateUrl: '/distributor/html/baocao.html',
            controller: 'baocaoCtrl'
        })
        .otherwise({
            redirectTo: '/distributor/bangdieukhien'
        });
}]);

app.controller('bangdieukhienCtrl', function ($scope) {
    // Vẽ biểu đồ doanh thu trên bảng điều khiển
    const ctx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(ctx, {
        type: 'bar', // Hoặc loại biểu đồ bạn muốn
        data: {
            labels: ['January', 'February', 'March', 'April'],
            datasets: [{
                label: 'Doanh thu',
                data: [3000, 2000, 5000, 4000],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

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
})
app.controller('quanlysanphamCtrl', function ($scope, $http) {
    

 // Định nghĩa danh sách sản phẩm và thông tin nhà phân phối
 $scope.products = [];
 $scope.selectedProduct = null;
 $scope.newProduct = {};
 $scope.filteredProducts = []; // Danh sách sản phẩm đã được lọc
 $scope.selectedFilter = '3'; // Mặc định là "Tất cả"
 $scope.searchQuery = '';
 



 // Hàm lấy danh sách sản phẩm từ API
 $scope.loadProducts = function() {
    $http.get('http://localhost:9999/api/nppctrl/getsp', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(function(response) {
        $scope.products = response.data;
        $scope.filterProducts(); // Sau khi tải sản phẩm, thực hiện lọc
    }, function(error) {
        console.log('Lỗi khi lấy sản phẩm:', error);
    });
};

// Hàm lọc sản phẩm dựa trên trạng thái và tìm kiếm
$scope.filterProducts = function() {
    $scope.filteredProducts = $scope.products.filter(function(product) {
        let matchesStatus = false;
        if ($scope.selectedFilter == '1') {
            matchesStatus = product.trangThai == true; // Giả sử trạng thái duyệt là 'duyet'
        } else if ($scope.selectedFilter == '2') {
            matchesStatus = product.trangThai == false; // Giả sử trạng thái chưa duyệt là 'chuaDuyet'
        } else {
            matchesStatus = true; // Tất cả sản phẩm
        }

        // Lọc theo tên sản phẩm
        let matchesSearch = product.tenSanPham.toLowerCase().includes($scope.searchQuery.toLowerCase());

        return matchesStatus && matchesSearch;
    });
};

 // Hàm hiển thị chi tiết sản phẩm
 $scope.viewProductDetails = function(product) {
     $scope.selectedProduct = angular.copy(product);
     // Mở modal chi tiết sản phẩm
     $('#productDetailsModal').modal('show');
 };
 // Thêm trạng thái chỉnh sửa
$scope.isEditing = false;

// Hàm bật/tắt chế độ chỉnh sửa
$scope.toggleEdit = function() {
    $scope.isEditing = !$scope.isEditing;
};

// Hàm lưu thay đổi sản phẩm
$scope.saveProductChanges = function() {
    console.log($scope.selectedProduct);
    if ($scope.selectedProduct) {
        $http.put('http://localhost:9999/api/nppctrl/update-product/' + $scope.selectedProduct.maSanPham, $scope.selectedProduct, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token1')
            }
        }).then(function(response) {
            console.log('Cập nhật sản phẩm thành công.');
            // Tải lại danh sách sản phẩm
            $scope.loadProducts();
            // Tắt chế độ chỉnh sửa
            $scope.isEditing = false;
            $('#productDetailsModal').modal('hide');
        }, function(error) {
            console.error('Lỗi khi cập nhật sản phẩm:', error);
            alert('Cập nhật sản phẩm không thành công.');
        });
    }
};



$scope.uploadAvatar = function() {
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
        // Kiểm tra xem đang cập nhật cho newProduct hay selectedProduct
        if (true) {
            // Cập nhật avatar URL trong newProduct
            $scope.newProduct.hinhAnh = response.data.secure_url;
            console.log("new product");
        }  
            // Cập nhật avatar URL trong selectedProduct
            $scope.selectedProduct.hinhAnh = response.data.secure_url;
        

        // Hiển thị thành công
        console.log("Cập nhật hình ảnh thành công:", response.data.secure_url);
    }).catch(function(error) {
        console.error('Lỗi khi tải lên avatar:', error);
        alert('Tải lên không thành công: ' + (error.data && error.data.message ? error.data.message : ''));
    });
};

 $scope.addProduct = function() {
    const newProduct ={
        tenSanPham: $scope.newProduct.tenSanPham, //
        gia: $scope.newProduct.gia,//
        chiTiet: $scope.newProduct.chiTiet,//
        loai: $scope.newProduct.loai,//
        hinhAnh: $scope.newProduct.hinhAnh,//
        kichCo: $scope.newProduct.kichCo,//
        loaiVang: $scope.newProduct.loaiVang,//
        trongLuong: $scope.newProduct.trongLuong,//
        loaiDa: $scope.newProduct.loaiDa,//
        soLuong: $scope.newProduct.soLuong,
        tienCong: $scope.newProduct.tienCong,

    }
    console.log(newProduct);
    console.log(localStorage.getItem('distributorInfo'));
        $http.post('http://localhost:9999/api/nppctrl/add-product',newProduct, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token1')
            }
        }).then(function(response) {
             // Sau khi thêm thành công, tải lại danh sách sản phẩm
             $scope.loadProducts();
             // Đóng modal thêm sản phẩm
             $('#addProductModal').modal('hide');
         }, function(error) {
             console.log('Lỗi khi thêm sản phẩm:', error);
         });
     
 };
 $scope.deleteProduct = function() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Vui lòng đăng nhập');
        return;
    }

    // Gọi API xóa sản phẩm
    $http.delete(`http://localhost:9999/api/nppctrl/delete-product/${$scope.selectedProduct.maSanPham}`, {
        headers: {
            'Authorization': 'Bearer '  + localStorage.getItem('token1')
        }
    }).then(function(response) {
        console.log('Xóa sản phẩm thành công.');
        
        $scope.loadProducts();
    }, function(error) {
        console.log('Lỗi khi xóa sản phẩm:', error);
        $scope.loadProducts();
    });
};

 // Gọi hàm loadProducts và loadDistributors khi trang được tải
 $scope.loadProducts();
//  $scope.loadDistributors();

});

app.controller('quanlydonhangCtrl', function ($scope, $http) {
    // Khai báo danh sách đơn hàng
    $scope.donHangs = [];
    $scope.pageSize = 1; // Số lượng đơn hàng trên mỗi trang
    $scope.currentPage = 1; // Trang hiện tại
    $scope.donHangsFiltered = []; // Dữ liệu đã lọc
    $scope.searchKeyword = ""; // Từ khóa tìm kiếm
    $scope.selectedStatus = ""; // Trạng thái đã chọn
    $scope.sortCriteria = ""; // Tiêu chí sắp xếp

    // Khai báo chi tiết đơn hàng
    $scope.donHangChiTiet = {};

    // Khai báo số lượng đơn hàng hoàn thành
    $scope.soluongHoanThanh = 0;

    // khai báo chi tiết hóa đơn
    $scope.hoaDonChiTiet = {};

    // Hàm lấy danh sách đơn hàng từ API và phân trang
    $scope.getDanhSachDonHang = function () {
        $http.get('http://localhost:9999/api/donhang', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token1') }
        })
            .then(function (response) {
                // console.log('Kết quả API:', response.data);
                $scope.donHangs = response.data;
                $scope.donHangsFiltered = angular.copy($scope.donHangs);
                $scope.totalPages = Math.ceil($scope.donHangs.length / $scope.pageSize);
                $scope.paginateData();
            })
            .catch(function (error) {
                console.error('Lỗi khi gọi API:', error);
            });
    };


    // Hàm phân trang dữ liệu
    $scope.paginateData = function () {
        const start = ($scope.currentPage - 1) * $scope.pageSize;
        const end = start + $scope.pageSize;
        $scope.donHangsPage = $scope.donHangsFiltered.slice(start, end); // Hiển thị dữ liệu đã lọc cho trang hiện tại
    };

    // Chuyển trang
    $scope.goToPage = function (pageNumber) {
        if (pageNumber < 1 || pageNumber > $scope.totalPages) return; // Kiểm tra xem trang có hợp lệ không
        $scope.currentPage = pageNumber;
        $scope.paginateData(); // Cập nhật dữ liệu cho trang mới
    };

    // Hàm lấy chi tiết đơn hàng theo mã đơn hàng
    $scope.getChiTietDonHang = function (maDonHang) {
        $http.get('http://localhost:9999/api/donhang/' + maDonHang) // API để lấy chi tiết đơn hàng theo mã
            .then(function (response) {
                // Gán dữ liệu chi tiết vào biến donHangChiTiet
                $scope.donHangChiTiet = response.data;
                // Hiển thị chi tiết trong một modal hoặc vùng khác
                $('#orderDetailModal').modal('show'); // Mở modal để hiển thị chi tiết
            })
            .catch(function (error) {
                console.error('Có lỗi xảy ra khi lấy chi tiết đơn hàng:', error);
            });
    };

    // hàm lấy số lượng đơn hoàn thành
    $scope.getSoluongHoanThanh = function () {
        // Lấy token từ localStorage (hoặc sessionStorage) nếu đã lưu sau khi đăng nhập
        const token = localStorage.getItem("token1");  // Hoặc sử dụng sessionStorage nếu bạn lưu token ở đó

        if (token) {
            $http.get('http://localhost:9999/api/donhang/demsl/hoanthanh', {
                headers: {
                    'Authorization': 'Bearer ' + token  // Thêm token vào header Authorization
                }
            })
                .then(function (response) {
                    // Gán số lượng đơn hàng hoàn thành vào biến soluongHoanThanh
                    // console.log('Kết quả Đơn Hàng Thành Công:', response.data);
                    $scope.soluongHoanThanh = response.data;
                })
                .catch(function (error) {
                    console.error('Có lỗi xảy ra khi lấy số lượng đơn hàng đã hoàn thành:', error);
                });
        } else {
            console.log("Token không có trong localStorage.");
            // Bạn có thể xử lý trường hợp này nếu cần
        }
    };


    // Hàm lấy chi tiết hóa đơn từ API
    $scope.getChiTietHoaDon = function (maHoaDon) {
        $http.get('http://localhost:9999/api/hoadon/' + maHoaDon) // API để lấy chi tiết hóa đơn theo mã
            .then(function (response) {
                // Gán dữ liệu chi tiết vào biến hoaDonChiTiet
                $scope.hoaDonChiTiet = response.data;
                // Hiển thị chi tiết trong modal
                $('#invoiceDetailModal').modal('show'); // Mở modal để hiển thị chi tiết
            })
            .catch(function (error) {
                console.error('Có lỗi xảy ra khi lấy chi tiết hóa đơn:', error);
            });
    };

    $scope.filterOrders = function () {
        $scope.donHangsFiltered = $scope.donHangs.filter(function (donHang) {
            // Lọc theo mã đơn hàng (tìm kiếm)
            var matchesKeyword = donHang.maDonHang.toLowerCase().includes($scope.searchKeyword.toLowerCase());
            // Lọc theo trạng thái
            var matchesStatus = $scope.selectedStatus ? donHang.trangThai == $scope.selectedStatus : true;
            return matchesKeyword && matchesStatus;
        });
        $scope.totalPages = Math.ceil($scope.donHangsFiltered.length / $scope.pageSize);
        $scope.currentPage = 1; // Reset lại trang hiện tại khi tìm kiếm hoặc lọc
        $scope.paginateData(); // Cập nhật dữ liệu sau khi lọc
    };

    // Hàm sắp xếp đơn hàng
    $scope.sortOrders = function () {
        if ($scope.sortCriteria === "1") {
            $scope.donHangsFiltered.sort((a, b) => new Date(b.thoiGian) - new Date(a.thoiGian)); // Mới nhất
        } else if ($scope.sortCriteria === "2") {
            $scope.donHangsFiltered.sort((a, b) => new Date(a.thoiGian) - new Date(b.thoiGian)); // Cũ nhất
        } else if ($scope.sortCriteria === "3") {
            $scope.donHangsFiltered.sort((a, b) => b.tongTien - a.tongTien); // Giá trị cao nhất
        }
        $scope.totalPages = Math.ceil($scope.donHangsFiltered.length / $scope.pageSize);
        $scope.currentPage = 1; // Reset lại trang hiện tại khi sắp xếp
        $scope.paginateData(); // Cập nhật dữ liệu sau khi sắp xếp
    };
    // Gọi hàm để lấy danh sách đơn hàng và số lượng đơn hàng hoàn thành khi controller được khởi tạo
    $scope.getDanhSachDonHang();
    $scope.getSoluongHoanThanh();
});




app.controller('baocaoCtrl', function ($scope) {
    // Vẽ biểu đồ doanh thu trong báo cáo
    const ctx1 = document.getElementById('revenueChart1').getContext('2d');
    const revenueChart1 = new Chart(ctx1, {
        type: 'line', // Hoặc loại biểu đồ bạn muốn
        data: {
            labels: ['May', 'June', 'July', 'August'],
            datasets: [{
                label: 'Doanh thu',
                data: [5000, 7000, 6000, 8000],
                fill: false,
                borderColor: 'rgba(153, 102, 255, 1)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

function goBack() {
    window.history.back();
}
