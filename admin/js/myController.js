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

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/admin/bangdieukhien', {
            templateUrl: 'html/bangdieukhien.html',
            controller: 'bangdieukhienCtrl'
        })
        .when('/admin/quanlysanpham', {
            templateUrl: 'html/quanlysanpham.html',
            controller: 'quanlysanphamCtrl'
        })
        .when('/admin/quanlysanphamthem', {
            templateUrl: 'html/quanlysanphamthem.html',
            controller: 'quanlysanphamthemCtrl'
        })
        .when('/admin/quanlysanphamsua/:id', {
            templateUrl: 'html/quanlysanphamsua.html',
            controller: 'quanlysanphamsuaCtrl'
        })
        .when('/admin/quanlytaikhoan', {
            templateUrl: 'html/quanlytaikhoan.html',
            controller: 'quanlytaikhoanCtrl'
        })
        .when('/admin/quanlydonhang', {
            templateUrl: 'html/quanlydonhang.html',
            controller: 'quanlydonhangCtrl'
        })
        .when('/admin/khachhang', {
            templateUrl: 'html/khachhang.html',
            controller: 'khachhangCtrl'
        })
        .when('/admin/chitietkh', {
            templateUrl: 'html/chitietkh.html',
            controller: 'chitietkhCtrl'
        })
        .when('/admin/nhaphanphoi', {
            templateUrl: 'html/nhaphanphoi.html',
            controller: 'nhaphanphoiCtrl'
        })
        .when('/admin/chitietnpp', {
            templateUrl: 'html/chitietnpp.html',
            controller: 'chitietnppCtrl'
        })
        .when('/admin/baocao', {
            templateUrl: 'html/baocao.html',
            controller: 'baocaoCtrl'
        })
        .when('/admin/uudai', {
            templateUrl: 'html/uudai.html',
            controller: 'uudaiCtrl'
        })
        .when('/admin/uudaithem', {
            templateUrl: 'html/uudaithem.html',
            controller: 'uudaithemCtrl'
        })
        .otherwise({
            redirectTo: '/admin/bangdieukhien'
        });
}]);

app.controller('MainController', function ($scope, $location, $window) {
    const adminInfo = localStorage.getItem('adminInfo');
    $scope.adminInfo = adminInfo ? JSON.parse(adminInfo) : null;

    // If adminInfo is null, redirect to login page
    if (!$scope.adminInfo) {
        $window.location.href = '/admin/loginhome.html';
    }

    // Logout function
    $scope.logout = function () {
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
                title: 'swal-title', // Bạn có thể thêm kiểu tùy chỉnh cho tiêu đề
                text: 'swal-text', // Tùy chỉnh nội dung thông báo
                cancelButton: 'swal-btn-cancel',
                confirmButton: 'swal-btn-confirm'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');
                localStorage.removeItem('adminInfo');
                $window.location.href = '/admin/loginhome.html'; // Redirect to login page
            }
        });
    };


    // Function to change route
    $scope.changeRoute = function (route) {
        $location.path(route);
    };
});

app.controller('bangdieukhienCtrl', function ($scope, $http) {
    // Hàm lấy danh sách người dùng
    $scope.UserAccount = function () {
        $http.get('http://localhost:9999/api/adctrl/ngdung', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            $scope.users = response.data; // Lưu dữ liệu người dùng vào scope
            console.log("Số lượng người dùng:", $scope.users.length);
        }, function (error) {
            console.error("Lỗi khi lấy danh sách người dùng:", error);
        });
    };

    $scope.UserAccountband = function () {
        $http.get('http://localhost:9999/api/adctrl/ngdungband', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            $scope.users1 = response.data;
            console.log($scope.users1.length);
        }, function (error) {
            console.log("Error fetching approved distributors:", error);
        });
    };

    $scope.DonhangAccount = function () {
        $http.get('http://localhost:9999/api/adctrl/donhangall', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            $scope.orders = response.data; // Lưu dữ liệu người dùng vào scope
        }, function (error) {
            console.log("Error fetching orders:", error);
        });
    };

    $scope.SpBanchay = function () {
        $http.get('http://localhost:9999/api/adctrl/spbanchay', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            $scope.SpBanchay = response.data;
            console.log($scope.SpBanchay);
        }, function (error) {
            console.log("Error fetching best-selling products:", error);
        });
    };

    $scope.SpDoiDuyet = function () {
        $http.get('http://localhost:9999/api/adctrl/doiduyet', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            $scope.SpDoiDuyet = response.data;
            console.log($scope.SpDoiDuyet);
        }, function (error) {
            console.log("Error fetching pending products:", error);
        });
    };

    // Hàm xem chi tiết sản phẩm đợi duyệt
    $scope.viewProductDetail = function (product) {
        // Gọi API để lấy chi tiết sản phẩm dựa vào mã sản phẩm
        $http.get(`http://localhost:9999/api/adctrl/sanpham/${product.maSanPham}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            // Lưu chi tiết sản phẩm vào scope
            $scope.productDetail = response.data; 
            console.log("Chi tiết sản phẩm:", $scope.productDetail);
    
            // Cập nhật thêm thông tin nhà phân phối từ productDetail nếu cần
            $scope.productDetail.tenNhaPhanPhoi = $scope.productDetail.nhaPhanPhoi ? $scope.productDetail.nhaPhanPhoi.tenNhaPhanPhoi : "Chưa có thông tin nhà phân phối";
            $scope.productDetail.diaChiNhaPhanPhoi = $scope.productDetail.nhaPhanPhoi ? $scope.productDetail.nhaPhanPhoi.diaChi : "Chưa có địa chỉ";
    
            // Hiển thị modal chi tiết sản phẩm
            $('#productDetailModal').modal('show');
        }, function (error) {
            console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
        });
    };
    

    // Gọi các hàm để tải dữ liệu ngay khi khởi động controller
    $scope.UserAccount();
    $scope.UserAccountband();
    $scope.DonhangAccount();
    $scope.SpBanchay();
    $scope.SpDoiDuyet();
});



app.controller('quanlysanphamCtrl', function ($scope, $http, $location) {
    


    $scope.products = [];
    $scope.filteredProducts = [];
    $scope.paginatedProducts = [];
    $scope.currentPage = 1;
    $scope.itemsPerPage = 5; // Số sản phẩm trên mỗi trang
    $scope.totalPages = 0;
    $scope.selectedFilter = '3';
    $scope.searchQuery = '';

     // Tải dữ liệu sản phẩm
     $scope.loadProducts = function () {
        $http.get('http://localhost:9999/api/adctrl/productsall', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            $scope.products = response.data;
            console.log($scope.products);
            $scope.filterProducts(); 
        }, function (error) {
            console.log('Lỗi khi lấy sản phẩm:', error);
        });
    };

      // Lọc sản phẩm
      $scope.filterProducts = function () {
        $scope.filteredProducts = $scope.products.filter(function (product) {
            let matchesStatus = false;
            if ($scope.selectedFilter == '1') {
                matchesStatus = product.trangThai == true;
            } else if ($scope.selectedFilter == '2') {
                matchesStatus = product.trangThai == false;
            } else {
                matchesStatus = true;
            }

            let matchesSearch = product.tenSanPham.toLowerCase().includes($scope.searchQuery.toLowerCase());
            return matchesStatus && matchesSearch;
        });
        $scope.currentPage = 1; // Reset về trang đầu tiên khi lọc
        $scope.updatePagination();
    };

    // Cập nhật phân trang
    $scope.updatePagination = function () {
        $scope.totalPages = Math.ceil($scope.filteredProducts.length / $scope.itemsPerPage);
        const startIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
        const endIndex = startIndex + $scope.itemsPerPage;
        $scope.paginatedProducts = $scope.filteredProducts.slice(startIndex, endIndex);
    };

    // Chuyển trang
    $scope.goToPage = function (pageNumber) {
        if (pageNumber >= 1 && pageNumber <= $scope.totalPages) {
            $scope.currentPage = pageNumber;
            $scope.updatePagination();
        }
    };

    // Tải dữ liệu ban đầu
    
    $scope.goToDetail = function (product) {
        if (!product || !product.maSanPham) {
            console.error("Product ID is undefined:", product);
            alert("Sản phẩm không có mã hợp lệ.");
            return;
        }
        console.log("Navigating to product detail:", product);
        $location.path('/admin/quanlysanphamsua/' + product.maSanPham);
    };

    $scope.loadProducts();

});
app.controller('quanlysanphamthemCtrl', function ($scope) { });
app.controller('quanlysanphamsuaCtrl', function ($scope,$routeParams, $http) {
$scope.loadProducts = function () {
    

         const productId = $routeParams.id; // Lấy maSanPham từ URL
        console.log("Product ID from URL:", productId);

        const apiUrl = `http://localhost:9999/api/adctrl/products/${productId}`;
        const token = localStorage.getItem('token');

        const config = token ? { headers: { 'Authorization': 'Bearer ' + token } } : {};

        $http.get(apiUrl, config)
            .then(function (response) {
                console.log("API Response:", response.data);
                $scope.product = response.data;
            })
            .catch(function (error) {
                console.error("Error loading product details:", error);
             
            });

        }
        $scope.loadProducts();

            $scope.duyetsp = function (id) {
                Swal.fire({
                    title: 'Bạn muốn duyệt sản phẩm này?',
                    text: 'Sau khi duyệt, sản phẩm sẽ được công nhận.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Duyệt',
                    cancelButtonText: 'Hủy',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                }).then((result) => {
                    if (result.isConfirmed) {
                        $http.put('http://localhost:9999/api/adctrl/duyetsp/' + id, {
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        }).then(function (response) {
                            console.log("API Response:", response.data);
                            Swal.fire(
                                'Thành công!',
                                'Sản phẩm đã được duyệt.',
                                'success'
                            );
                            $scope.loadProducts();
                        }, function (error) {
                            console.log("Error:", error);
                            Swal.fire(
                                'Thành công!',
                                'Sản phẩm đã được duyệt.',
                                'success'
                            );
                            $scope.loadProducts();
                        });
                    }
                });
            };
            
            $scope.kduyetsp = function (id) {
                Swal.fire({
                    title: 'Bạn muốn khóa sản phẩm này?',
                    text: 'Sản phẩm sẽ bị khóa và không thể hiển thị.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Khóa',
                    cancelButtonText: 'Hủy',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                }).then((result) => {
                    if (result.isConfirmed) {
                        $http.put('http://localhost:9999/api/adctrl/kduyetsp/' + id, {
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        }).then(function (response) {
                            console.log("API Response:", response.data);
                            Swal.fire(
                                'Thành công!',
                                'Sản phẩm đã bị khóa.',
                                'success'
                            );
                            $scope.loadProducts();
                        }, function (error) {
                            console.log("Error:", error);
                            Swal.fire(
                                'Thành công!',
                                'Sản phẩm đã bị khóa.',
                                'success'
                            );
                            $scope.loadProducts();
                        });
                    }
                });
            };
            
            $scope.xoasp = function (id) {
                Swal.fire({
                    title: 'Bạn muốn xóa sản phẩm này?',
                    text: 'Hành động này sẽ không thể khôi phục lại dữ liệu.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Xóa',
                    cancelButtonText: 'Hủy',
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                }).then((result) => {
                    if (result.isConfirmed) {
                        $http.delete('http://localhost:9999/api/adctrl/delete-product/' + id, {
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        }).then(function (response) {
                            console.log("API Response:", response.data);
                            Swal.fire(
                                'Thành công!',
                                'Sản phẩm đã bị xóa.',
                                'success'
                            );
                            $scope.loadProducts();
                        }, function (error) {
                            console.log("Error:", error);
                            Swal.fire(
                                'Thành công!',
                                'Sản phẩm đã bị xóa.',
                                'success'
                            );
                            $scope.loadProducts();
                        });
                    }
                });
            };
            

 });
 app.controller('quanlydonhangCtrl', function ($scope, $http) {
    $scope.orders = [];  // Mảng lưu danh sách đơn hàng
    $scope.filteredOrders = [];  // Mảng lưu danh sách đơn hàng đã lọc
    $scope.currentPage = 1;  // Trang hiện tại
    $scope.itemsPerPage = 5;  // Số lượng đơn hàng mỗi trang
    $scope.searchText = '';  // Tìm kiếm theo mã đơn hàng
    $scope.selectedStatus = '';  // Lọc theo trạng thái
    $scope.selectedSort = '';  // Sắp xếp theo thời gian hoặc giá trị
    $scope.hoanThanhCount = 0;  // Số lượng đơn hoàn thành
    $scope.dangXuLyCount = 0;   // Số lượng đơn đang xử lý


    // Hàm gọi API để lấy số lượng đơn hàng theo trạng thái
    $scope.getDonHangCounts = function () {
        $http.get('http://localhost:9999/api/adctrl/donhangcounts', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            $scope.hoanThanhCount = response.data.hoanThanh;
            $scope.dangXuLyCount = response.data.dangXuLy;
        }, function (error) {
            console.error('Lỗi khi lấy số lượng đơn hàng:', error);
        });
    };

    // Hàm gọi API để lấy danh sách đơn hàng
    $scope.DonhangAccount = function () {
        $http.get('http://localhost:9999/api/adctrl/donhangall', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            $scope.orders = response.data;  // Lưu dữ liệu đơn hàng vào scope
            $scope.filteredOrders = angular.copy($scope.orders);  // Sao chép dữ liệu cho lọc
        }, function (error) {
            console.error('Lỗi khi lấy danh sách đơn hàng:', error);
        });
    };

    // Hàm để lấy dữ liệu của trang hiện tại
    $scope.getPaginatedOrders = function () {
        const start = ($scope.currentPage - 1) * $scope.itemsPerPage;
        const end = start + $scope.itemsPerPage;
        return $scope.filteredOrders.slice(start, end);  // Lấy dữ liệu cho trang hiện tại
    };

    // Hàm tìm kiếm và lọc đơn hàng
    $scope.filterOrders = function () {
        let filtered = $scope.orders;

        // Tìm kiếm theo mã đơn hàng
        if ($scope.searchText) {
            filtered = filtered.filter(order =>
                order.maDonHang.toLowerCase().includes($scope.searchText.toLowerCase())
            );
        }

        // Lọc theo trạng thái
        if ($scope.selectedStatus) {
            filtered = filtered.filter(order => order.trangThai === $scope.selectedStatus);
        }

        $scope.filteredOrders = filtered;  // Lưu lại danh sách đã lọc
        $scope.currentPage = 1;  // Đặt lại trang về trang đầu
        $scope.sortOrders();  // Sắp xếp sau khi lọc
    };

    // Hàm sắp xếp đơn hàng
    $scope.sortOrders = function () {
        if ($scope.selectedSort === 'time') {
            // Sắp xếp theo thời gian (mới nhất lên trước)
            $scope.filteredOrders.sort((a, b) => new Date(b.thoiGian) - new Date(a.thoiGian));
        } else if ($scope.selectedSort === 'value') {
            // Sắp xếp theo giá trị đơn hàng (giảm dần)
            $scope.filteredOrders.sort((a, b) => b.tongTien - a.tongTien);
        }
    };

    // Hàm chuyển đến một trang cụ thể
    $scope.goToPage = function (page) {
        if (page >= 1 && page <= $scope.totalPages()) {
            $scope.currentPage = page;
        }
    };

    // Tính tổng số trang
    $scope.totalPages = function () {
        return Math.ceil($scope.filteredOrders.length / $scope.itemsPerPage);
    };

    // Hàm xem chi tiết đơn hàng
$scope.viewOrderDetail = function (orderId) {
    $http.get('http://localhost:9999/api/adctrl/order/' + orderId, {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).then(function (response) {
        $scope.orderDetail = response.data; // Lưu chi tiết đơn hàng vào scope
        $('#orderDetailModal').modal('show'); // Hiển thị modal
    }).catch(function (error) {
        console.error('Không thể tải chi tiết đơn hàng:', error);
        alert(error.data?.message || 'Đã xảy ra lỗi khi tải chi tiết đơn hàng.');
    });
};

    // Gọi API để tải dữ liệu khi trang được load
    $scope.DonhangAccount();
    // Gọi API khi tải trang
    $scope.getDonHangCounts();
});
app.controller('baocaoCtrl', function ($scope) { });
app.controller('quanlytaikhoanCtrl', function ($scope) { });
app.controller('khachhangCtrl', function ($scope, $http, $window) {
    $scope.viewUserDetail = function (user) {

        $scope.useris = user;
    };
    $scope.UserAccount = function () {

        $http.get('http://localhost:9999/api/adctrl/ngdung', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            $scope.users = response.data;
            console.log($scope.users);

        }, function (error) {
            console.log("Error fetching approved distributors:", error);
        });
    };
    $scope.UserAccountband = function () {
        $http.get('http://localhost:9999/api/adctrl/ngdungband', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            $scope.users1 = response.data;
            console.log($scope.users1);

        }, function (error) {
            console.log("Error fetching approved distributors:", error);
        });
    }

    $scope.UserbandAccount = function (id) {
        $http.post('http://localhost:9999/api/adctrl/ngdungband/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            alert(response.data);
            $scope.UserAccount();
        }, function (error) {
            console.log("Error locking account:", error);
        });
    }
    $scope.Userunbandaccount = function (id) {
        $http.post('http://localhost:9999/api/adctrl/ngdungunband/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            alert(response.data);
            $scope.UserAccount();
        }, function (error) {
            console.log("Error unlocking account:", error);
        });
    }
    $scope.UserAccount();
    $scope.UserAccountband();
});

app.controller('nhaphanphoiCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {

    $scope.viewDistributorDetail = function (npp) {
        // Store the selected distributor's data in the distributorDetail variable
        $scope.distributorDetail = npp;
    };

    // Fetch approved distributors
    $scope.getApprovedDistributors = function () {

        $http.get('http://localhost:9999/api/adctrl/approved', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            $scope.approvedDistributors = response.data;
            console.log($scope.approvedDistributors);

        }, function (error) {
            console.log("Error fetching approved distributors:", error);
        });
    };

    // Fetch pending distributors
    $scope.getPendingDistributors = function () {
        $http.get('http://localhost:9999/api/adctrl/pending', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            $scope.pendingDistributors = response.data;
            console.log($scope.pendingDistributors);
        }, function (error) {
            console.log("Error fetching pending distributors:", error);
        });
    };
    $scope.Deletenpp = function (id) {
        $http.post('http://localhost:9999/api/adctrl/delete/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            alert(response.data);
            $scope.getLockedDistributors();
            $scope.getApprovedDistributors();
            $scope.getPendingDistributors();
        }, function (error) {
            console.log("Error deleting distributor:", error);
            $scope.getLockedDistributors();
            $scope.getApprovedDistributors();
            $scope.getPendingDistributors();
        })
    }



    $scope.getLockedDistributors = function () {
        $http.get('http://localhost:9999/api/adctrl/locked', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            $scope.lockedDistributors = response.data;
            console.log($scope.lockedDistributors);
        }, function (error) {
            console.log("Error fetching locked distributors:", error);
            
        });
    };


    // Lock distributor account (change role to 5)
    $scope.lockAccount = function (id) {
        $http.post('http://localhost:9999/api/adctrl/lock/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }

        }).then(function (response) {
            alert(response.data);
            $scope.getLockedDistributors();
            $scope.getApprovedDistributors();
            $scope.getPendingDistributors();
        }, function (error) {
            console.log("Error locking account:", error);
            $scope.getLockedDistributors();
            $scope.getApprovedDistributors();
            $scope.getPendingDistributors();
        });
    };

    // Approve distributor account (change role to 2)
    $scope.approveAccount = function (id) {
        $http.post('http://localhost:9999/api/adctrl/approve/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }

        }).then(function (response) {
            alert(response.data);
            $scope.getLockedDistributors();
            $scope.getApprovedDistributors();
            $scope.getPendingDistributors();
        }, function (error) {
            console.log("Error approving account:", error);
            $scope.getLockedDistributors();
            $scope.getApprovedDistributors();
            $scope.getPendingDistributors();
        });
    };

    // Reject distributor account (delete account)
    $scope.rejectAccount = function (id) {
        $http.post('http://localhost:9999/api/adctrl/reject/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            alert(response.data);
            $scope.getLockedDistributors();
            $scope.getApprovedDistributors();
            $scope.getPendingDistributors();
        }, function (error) {
            console.log("Error rejecting account:", error);
            $scope.getLockedDistributors();
            $scope.getApprovedDistributors();
            $scope.getPendingDistributors();
        });
    };
    $scope.unlockDistributorAccount = function (id) {
        $http.post('http://localhost:9999/api/adctrl/unlock/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            alert(response.data);
            $scope.getLockedDistributors();
            $scope.getApprovedDistributors();
            $scope.getPendingDistributors();
        }, function (error) {
            console.log("Error unlocking account:", error);
            $scope.getLockedDistributors();
            $scope.getApprovedDistributors();
            $scope.getPendingDistributors();
        });
    }

    // Initial data fetch
    $scope.getApprovedDistributors();
    $scope.getPendingDistributors();
    $scope.getLockedDistributors();
}]);

app.controller('uudaiCtrl', function ($scope) { });
app.controller('chitietkhCtrl', function ($scope) { });
app.controller('chitietnppCtrl', function ($scope) { });
app.controller('uudaithemCtrl', function ($scope) { });

// Go back function
function goBack() {
    window.history.back();
}
