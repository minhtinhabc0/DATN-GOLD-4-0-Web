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
                localStorage.removeItem('token');
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
    $scope.loadProducts = function () {
        $http.get('http://localhost:9999/api/nppctrl/getsp', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            $scope.products = response.data;
            $scope.filterProducts(); // Sau khi tải sản phẩm, thực hiện lọc
        }, function (error) {
            console.log('Lỗi khi lấy sản phẩm:', error);
        });
    };

    // Hàm lọc sản phẩm dựa trên trạng thái và tìm kiếm
    $scope.filterProducts = function () {
        $scope.filteredProducts = $scope.products.filter(function (product) {
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
    $scope.viewProductDetails = function (product) {
        $scope.selectedProduct = angular.copy(product);
        // Mở modal chi tiết sản phẩm
        $('#productDetailsModal').modal('show');
    };
    // Thêm trạng thái chỉnh sửa
    $scope.isEditing = false;

    // Hàm bật/tắt chế độ chỉnh sửa
    $scope.toggleEdit = function () {
        $scope.isEditing = !$scope.isEditing;
    };

    // Hàm lưu thay đổi sản phẩm
    $scope.saveProductChanges = function () {
        console.log($scope.selectedProduct);
        if ($scope.selectedProduct) {
            $http.put('http://localhost:9999/api/nppctrl/update-product/' + $scope.selectedProduct.maSanPham, $scope.selectedProduct, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(function (response) {
                console.log('Cập nhật sản phẩm thành công.');
                // Tải lại danh sách sản phẩm
                $scope.loadProducts();
                // Tắt chế độ chỉnh sửa
                $scope.isEditing = false;
                $('#productDetailsModal').modal('hide');
            }, function (error) {
                console.error('Lỗi khi cập nhật sản phẩm:', error);
                alert('Cập nhật sản phẩm không thành công.');
            });
        }
    };



    $scope.uploadAvatar = function () {
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
        }).catch(function (error) {
            console.error('Lỗi khi tải lên avatar:', error);
            alert('Tải lên không thành công: ' + (error.data && error.data.message ? error.data.message : ''));
        });
    };

    $scope.addProduct = function () {
        const newProduct = {
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
        $http.post('http://localhost:9999/api/nppctrl/add-product', newProduct, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            // Sau khi thêm thành công, tải lại danh sách sản phẩm
            $scope.loadProducts();
            // Đóng modal thêm sản phẩm
            $('#addProductModal').modal('hide');
        }, function (error) {
            console.log('Lỗi khi thêm sản phẩm:', error);
        });

    };
    $scope.deleteProduct = function () {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Vui lòng đăng nhập');
            return;
        }

        // Gọi API xóa sản phẩm
        $http.delete(`http://localhost:9999/api/nppctrl/delete-product/${$scope.selectedProduct.maSanPham}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function (response) {
            console.log('Xóa sản phẩm thành công.');

            $scope.loadProducts();
        }, function (error) {
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
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
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
        const token = localStorage.getItem("token");  // Hoặc sử dụng sessionStorage nếu bạn lưu token ở đó

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




app.controller('baocaoCtrl', function ($scope, $http) {
    // Khai báo dữ liệu báo cáo
    $scope.reportData = {}; // Dữ liệu tổng hợp
    $scope.productDetails = []; // Dữ liệu chi tiết sản phẩm
    $scope.chart = null; // Biểu đồ
    $scope.selectedYear = ""; // Năm được chọn (mặc định là tất cả)

    // Hàm tính tổng doanh thu và lợi nhuận
    $scope.calculateTotalRevenueAndProfit = function () {
        let totalRevenue = 0;
        let totalProfit = 0;

        // Kiểm tra dữ liệu đã nhận được từ backend (totalRevenue và totalProfit là các map)
        if ($scope.reportData.totalRevenue && $scope.reportData.totalProfit) {
            // Tính tổng doanh thu và lợi nhuận từ các map
            for (let productName in $scope.reportData.totalRevenue) {
                totalRevenue += $scope.reportData.totalRevenue[productName];
                totalProfit += $scope.reportData.totalProfit[productName];
            }
        }

        // Cập nhật tổng doanh thu và lợi nhuận vào $scope.reportData
        $scope.reportData.totalRevenue = totalRevenue;
        $scope.reportData.totalProfit = totalProfit;

        // Cập nhật biểu đồ sau khi tính toán
        $scope.updateChart();
    };

    // Hàm lấy dữ liệu báo cáo từ API (có lọc theo năm nếu cần)
    $scope.getBaoCaoTongHop = function () {
        let params = {};
        if ($scope.selectedYear) {
            params.year = $scope.selectedYear; // Thêm tham số năm nếu người dùng đã chọn
        }

        $http.get('http://localhost:9999/api/baocaonpp', {
            params: params,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
            .then(function (response) {
                console.log('Dữ liệu trả về từ API:', response.data);

                // Kiểm tra xem dữ liệu có đúng không và cập nhật $scope
                if (response.data) {
                    $scope.reportData.totalRevenue = response.data.totalRevenue;
                    $scope.reportData.totalProfit = response.data.totalProfit;
                    $scope.productDetails = response.data.products;

                    $scope.calculateTotalRevenueAndProfit();
                    $scope.updateChart();
                } else {
                    console.error('Không có dữ liệu từ API');
                }
            })
            .catch(function (error) {
                console.error('Lỗi khi gọi API báo cáo:', error);
            });
    };
    $scope.getYear = function (thoiGian) {
        return thoiGian ? thoiGian.substring(0, 4) : ''; // Lấy 4 ký tự đầu tiên nếu thoiGian tồn tại
    };
    $scope.updateChart = function () {
        console.log('Dữ liệu để vẽ biểu đồ:', $scope.reportData);

        // Kiểm tra nếu có biểu đồ cũ, hủy bỏ
        if ($scope.chart) {
            $scope.chart.dispose(); // Hủy biểu đồ cũ nếu có
        }

        // Khởi tạo lại biểu đồ mới
        var chartDom = document.getElementById('myChart');
        $scope.chart = echarts.init(chartDom);

        var option = {
            title: {
                text: 'Tổng Doanh Thu và Lợi Nhuận',
                left: 'center',
                textStyle: {
                    fontWeight: 'bold',
                    fontSize: 12, // Giảm kích thước chữ tiêu đề xuống 18px
                    color: '#333'
                },
                subtextStyle: {
                    fontSize: 12, // Kích thước chữ phụ
                    color: '#777'
                }
            },
            tooltip: {
                trigger: 'axis', // Đổi từ 'item' sang 'axis'
                formatter: function (params) {
                    return params[0].seriesName + '<br/>' + params[0].name + ': ' + params[0].value + ' VND';
                },
                textStyle: {
                    fontSize: 10 // Giảm kích thước chữ tooltip
                },
                backgroundColor: '#fff', // Màu nền tooltip
                borderColor: '#ccc', // Màu viền tooltip
                borderWidth: 1, // Độ dày viền tooltip
                padding: [5, 10], // Padding của tooltip
                borderRadius: 5 // Làm tròn các góc tooltip
            },
            legend: {
                data: ['Tổng Doanh Thu (VND)', 'Tổng Lợi Nhuận (VND)'],
                top: '10%',
                textStyle: {
                    fontSize: 10, // Chỉnh lại kích thước chữ của legend xuống 10px
                    color: '#333'
                }
            },
            grid: {
                left: '8%',
                right: '8%',
                bottom: '10%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['Tổng Doanh Thu và Lợi Nhuận'],
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: {
                        fontSize: 10, // Giảm kích thước chữ trục X xuống 10px
                        color: '#333' // Màu sắc trục X
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    nameLocation: 'middle',
                    nameGap: 25,
                    axisLabel: {
                        fontSize: 10, // Giảm kích thước chữ trục Y xuống 10px
                        formatter: '{value} VND',
                        color: '#333' // Màu sắc trục Y
                    },
                    splitLine: {
                        show: true, // Hiện các đường chia trục Y
                        lineStyle: {
                            color: '#ddd', // Màu các đường chia trục Y
                            type: 'dashed'
                        }
                    }
                }
            ],
            series: [
                {
                    name: 'Tổng Doanh Thu (VND)',
                    type: 'bar',
                    data: [$scope.reportData.totalRevenue],
                    color: '#4CAF50', // Màu xanh lá cây
                    itemStyle: {
                        barBorderRadius: [5, 5, 0, 0]
                    },
                    emphasis: {
                        itemStyle: {
                            color: '#388E3C'
                        }
                    }
                },
                {
                    name: 'Tổng Lợi Nhuận (VND)',
                    type: 'bar',
                    data: [$scope.reportData.totalProfit],
                    color: '#FF9800', // Màu cam
                    itemStyle: {
                        barBorderRadius: [5, 5, 0, 0]
                    },
                    emphasis: {
                        itemStyle: {
                            color: '#F57C00'
                        }
                    }
                }
            ]
        };

        // Cập nhật biểu đồ với dữ liệu mới
        $scope.chart.setOption(option);
    };


    $scope.exportToPDF = function () {
        let filteredData = [];

        // Kiểm tra nếu có chọn năm, lọc dữ liệu theo năm đó
        if ($scope.selectedYear) {
            filteredData = $scope.productDetails.filter(function (item) {
                return item.thoiGian && item.thoiGian.includes($scope.selectedYear);
            });
        } else {
            // Nếu không chọn năm, xuất tất cả dữ liệu và sắp xếp theo thời gian mới nhất
            filteredData = [...$scope.productDetails].sort(function (a, b) {
                return new Date(b.thoiGian) - new Date(a.thoiGian); // Sắp xếp giảm dần theo thời gian
            });
        }

        // Kiểm tra nếu không có dữ liệu sau khi lọc
        if (filteredData.length === 0) {
            alert('Không có dữ liệu để xuất!');
            return;
        }
        console.log(filteredData[0].manhaPhanphoi);

        // Tạo bảng hoặc phần tử HTML cần xuất ra PDF
        let tableHTML = '<div id="report-content" style="font-family: Arial, sans-serif; color: #333; padding: 30px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">';

        // Thêm thông tin nhà phân phối
        tableHTML += '<div style="text-align: center; margin-bottom: 20px;">';

        // Thiết kế phần tiêu đề "GOLD 4.0" hoành tráng
        tableHTML += ' <h2 class="text-center" style="font-family: Montserrat, sans-serif; margin-top: 20px; color: #d4af37; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); letter-spacing: 2px; ">BÁO CÁO WEBSITE GOLD - 4.0</h2>';
        tableHTML += ` 
        <div style="font-size: 16px; color: black;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span>Cửa Hàng: ${filteredData[0].manhaPhanphoi ? filteredData[0].manhaPhanphoi.tenCuaHang : 'Chưa có thông tin'}</span>
                <span>Mã Cửa Hàng: ${filteredData[0].manhaPhanphoi ? filteredData[0].manhaPhanphoi.maNhaPhanPhoi : 'Chưa có thông tin'}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
                <span>Địa Chỉ: ${filteredData[0].manhaPhanphoi ? filteredData[0].manhaPhanphoi.diaChi : 'Chưa có thông tin'}</span>
                <span>Số Điện Thoại: ${filteredData[0].manhaPhanphoi ? filteredData[0].manhaPhanphoi.sdt : 'Chưa có thông tin'}</span>
            </div>
        </div>
        `;

        // Thêm phần tiêu đề "Doanh Thu và Lợi Nhuận"
        let headerText = 'Doanh Thu và Lợi Nhuận Năm ';
        if ($scope.selectedYear) {
            headerText += `${$scope.selectedYear}`; // Thêm năm nếu đã chọn
        } else {
            headerText = 'Tất Cả Doanh Thu và Lợi Nhuận'; // Thêm chữ "Tất Cả" nếu không chọn năm
        }
        tableHTML += `<p style="font-size: 26px; color: #d4af37;">${headerText} ${filteredData[0].manhaPhanphoi ? filteredData[0].manhaPhanphoi.tenCuaHang : 'Chưa có thông tin'}</p>`;
        tableHTML += '</div>';

        // Thêm tiêu đề bảng
        tableHTML += '<table style="width: 100%; border-collapse: collapse; margin-top: 30px; border-radius: 8px;">';
        tableHTML += '<thead style="background-color: #a88206; color: black; text-align: left;">';
        tableHTML += '<tr>';
        tableHTML += '<th style="padding: 12px 20px; border: 1px solid #ddd; font-size: 16px;text-align: center; color:#fff8dd;">STT</th>';
        tableHTML += '<th style="padding: 12px 20px; border: 1px solid #ddd; font-size: 16px;text-align: center;color:#fff8dd;">Tên Sản Phẩm</th>';
        tableHTML += '<th style="padding: 12px 20px; border: 1px solid #ddd; font-size: 16px;color:#fff8dd;">Số Lượng</th>';
        tableHTML += '<th style="padding: 12px 20px; border: 1px solid #ddd; font-size: 16px;text-align: center;color:#fff8dd;">Doanh Thu (VND)</th>';
        tableHTML += '<th style="padding: 12px 20px; border: 1px solid #ddd; font-size: 16px;text-align: center;color:#fff8dd;">Lợi Nhuận (VND)</th>';
        tableHTML += '<th style="padding: 12px 20px; border: 1px solid #ddd; font-size: 16px;text-align: center;color:#fff8dd;">Thời Gian</th>';
        tableHTML += '</tr>';
        tableHTML += '</thead>';
        tableHTML += '<tbody>';

        // Duyệt qua dữ liệu và thêm vào bảng
        filteredData.forEach(function (item, index) {
            tableHTML += '<tr style="background-color: #fff8dd;">';
            tableHTML += `<td style="padding: 6px 10px; border: 1px solid #ddd; text-align: center;">${index + 1}</td>`;
            tableHTML += `<td style="padding: 6px 10px; border: 1px solid #ddd;text-align: center;">${item.masanPham ? item.masanPham.tenSanPham : ''}</td>`;
            tableHTML += `<td style="padding: 6px 10px; border: 1px solid #ddd; text-align: center;">${item.soLuong}</td>`;
            tableHTML += `<td style="padding: 6px 10px; border: 1px solid #ddd; text-align: center;">${item.doanhThu.toLocaleString('vi-VN')} </td>`;
            tableHTML += `<td style="padding: 6px 10px; border: 1px solid #ddd; text-align: center;">${item.loiNhuan.toLocaleString('vi-VN')} </td>`;
            tableHTML += `<td style="padding: 6px 10px; border: 1px solid #ddd; text-align: center;">${$scope.getYear(item.thoiGian)}</td>`;
            tableHTML += '</tr>';
        });

        tableHTML += '</tbody></table>';
        tableHTML += '</div>';

        // Thêm phần tử vào DOM
        let contentDiv = document.createElement('div');
        contentDiv.innerHTML = tableHTML;
        document.body.appendChild(contentDiv);

        // Xuất HTML ra PDF
        html2pdf()
            .from(contentDiv)
            .save(`${headerText} Của ${filteredData[0].manhaPhanphoi ? filteredData[0].manhaPhanphoi.tenCuaHang : 'Chưa có thông tin'}.pdf`)
            .then(() => {
                // Xóa phần tử HTML sau khi xuất
                document.body.removeChild(contentDiv);
            })
            .catch((err) => {
                console.error('Lỗi khi xuất PDF:', err);
                alert('Có lỗi xảy ra khi xuất file PDF.');
            });
    };

    $scope.exportToExcel = function () {
        let filteredData = [];

        // Kiểm tra nếu có chọn năm, lọc dữ liệu theo năm đó
        if ($scope.selectedYear) {
            filteredData = $scope.productDetails.filter(function (item) {
                return item.thoiGian && item.thoiGian.includes($scope.selectedYear);
            });
        } else {
            // Nếu không chọn năm, xuất tất cả dữ liệu và sắp xếp theo thời gian mới nhất
            filteredData = [...$scope.productDetails].sort(function (a, b) {
                return new Date(b.thoiGian) - new Date(a.thoiGian); // Sắp xếp giảm dần theo thời gian
            });
        }

        // Kiểm tra nếu không có dữ liệu sau khi lọc
        if (filteredData.length === 0) {
            alert('Không có dữ liệu để xuất!');
            return;
        }

        // Tạo file Excel mới
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Doanh Thu và Lợi Nhuận');

        // Thêm thông tin nhà phân phối vào dòng thứ 1
        const distributorText = `
            Mã Cửa Hàng: ${filteredData[0].manhaPhanphoi ? filteredData[0].manhaPhanphoi.maNhaPhanPhoi : 'Chưa có thông tin'},
            Tên Cửa Hàng: ${filteredData[0].manhaPhanphoi ? filteredData[0].manhaPhanphoi.tenCuaHang : 'Chưa có thông tin'},
            Địa Chỉ: ${filteredData[0].manhaPhanphoi ? filteredData[0].manhaPhanphoi.diaChi : 'Chưa có thông tin'},
            Số Điện Thoại: ${filteredData[0].manhaPhanphoi ? filteredData[0].manhaPhanphoi.sdt : 'Chưa có thông tin'}
        `;

        // Định dạng thông tin nhà phân phối
        worksheet.mergeCells('A1:F2');
        worksheet.getCell('A1').value = distributorText;// Thêm thông tin nhà phân phối vào ô A1:F2
        worksheet.getCell('A1').font = { size: 12, color: { argb: 'black' }, bold: true }; // Màu đen và chữ nghiêng
        worksheet.getCell('A1').alignment = { horizontal: 'center' }; // Căn giữa và ngắt dòng
        worksheet.getCell('A1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'E5E5E5' } }; // Nền sáng xám

        // Thêm chữ "GOLD 4.0" làm logo văn bản và căn giữa
        worksheet.mergeCells('A3:F3'); // Kéo dài ô để chứa chữ "GOLD 4.0"
        worksheet.getCell('A3').value = 'BÁO CÁO WEBSITE GOLD 4.0';
        worksheet.getCell('A3').font = { size: 24, bold: true, color: { argb: 'FFD700' } }; // Màu vàng GOLD
        worksheet.getCell('A3').alignment = { horizontal: 'center', vertical: 'middle' }; // Căn giữa
        worksheet.getCell('A3').fill = { type: 'pattern', pattern: 'solid' }; // Nền đen

        // Tạo phần tiêu đề
        let headerText = 'Doanh Thu và Lợi Nhuận Năm ';
        if ($scope.selectedYear) {
            headerText += `${$scope.selectedYear}`;
        } else {
            headerText = 'Tất Cả Doanh Thu và Lợi Nhuận';
        }

        // Định dạng tiêu đề và thêm vào sheet
        worksheet.mergeCells('A4:F4');
        worksheet.getCell('A4').value = `${headerText} Của ${filteredData[0].manhaPhanphoi ? filteredData[0].manhaPhanphoi.tenCuaHang : 'Chưa có thông tin'}`;
        worksheet.getCell('A4').font = { size: 14, bold: true, color: { argb: 'black' } };
        worksheet.getCell('A4').alignment = { horizontal: 'center', vertical: 'middle' };
        worksheet.getCell('A4').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'A88206' } };

        // Định nghĩa tiêu đề cột
        const header = ["STT", "Tên Sản Phẩm", "Số Lượng", "Doanh Thu (VND)", "Lợi Nhuận (VND)", "Thời Gian"];
        worksheet.addRow(header);

        // Định dạng cho tiêu đề cột
        worksheet.getRow(5).font = { bold: true, color: { argb: 'black' } };
        worksheet.getRow(5).fill = { type: 'pattern', pattern: 'solid' };
        worksheet.getRow(5).alignment = { horizontal: 'center', vertical: 'middle' };

        // Duyệt qua dữ liệu và thêm vào bảng
        filteredData.forEach(function (item, index) {
            const row = worksheet.addRow([
                index + 1,
                item.masanPham ? item.masanPham.tenSanPham : '',
                item.soLuong,
                item.doanhThu.toLocaleString('vi-VN'),
                item.loiNhuan.toLocaleString('vi-VN'),
                $scope.getYear(item.thoiGian)
            ]);

            // Định dạng cho các dòng dữ liệu
            row.font = { size: 12, color: { argb: 'black' } };

            // Thêm định dạng căn giữa cho các cột
            row.alignment = { horizontal: 'center', vertical: 'middle' };

            // Thêm đường viền cho các ô dữ liệu
            row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
                cell.border = {
                    top: { style: 'thin', color: { argb: '000000' } },
                    left: { style: 'thin', color: { argb: '000000' } },
                    right: { style: 'thin', color: { argb: '000000' } },
                    bottom: { style: 'thin', color: { argb: '000000' } }
                };
            });
        });

        // Áp dụng định dạng cho tất cả các dòng (dòng 5 trở đi)
        worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
            row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
                if (rowNumber > 4) { // Đảm bảo chỉ định dạng dòng dữ liệu (từ dòng 5 trở đi)
                    cell.alignment = { horizontal: 'center', vertical: 'middle' };
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8DD' } }; // Màu nền sáng vàng
                    cell.border = {
                        top: { style: 'thin', color: { argb: '000000' } },
                        left: { style: 'thin', color: { argb: '000000' } },
                        right: { style: 'thin', color: { argb: '000000' } },
                        bottom: { style: 'thin', color: { argb: '000000' } }
                    };
                }
            });
        });

        // Tự động điều chỉnh chiều rộng của các cột (cải thiện chiều rộng hợp lý)
        worksheet.columns.forEach(function (column, index) {
            let maxLength = 0;
            column.eachCell({ includeEmpty: true }, function (cell) {
                const cellValue = cell.value ? cell.value.toString() : '';
                maxLength = Math.max(maxLength, cellValue.length);
            });
            // Giới hạn chiều rộng cột nếu cần thiết
            const minWidth = 12; // Chiều rộng tối thiểu
            const maxWidth = 25; // Chiều rộng tối đa
            column.width = Math.min(Math.max(maxLength + 2, minWidth), maxWidth);
        });

        // Xuất file Excel
        workbook.xlsx.writeBuffer().then(function (buffer) {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${headerText} Của ${filteredData[0].manhaPhanphoi ? filteredData[0].manhaPhanphoi.tenCuaHang : 'Chưa có thông tin'}, .xlsx`;
            link.click();
        });
    };
































    // Hàm xử lý khi người dùng chọn năm
    $scope.onYearChange = function () {
        console.log('Năm đã chọn:', $scope.selectedYear); // Kiểm tra xem năm có thay đổi hay không
        $scope.getBaoCaoTongHop(); // Gọi lại API để lấy dữ liệu theo năm
    };

    // Gọi hàm để lấy dữ liệu báo cáo khi controller được khởi tạo
    $scope.getBaoCaoTongHop();
});




















function goBack() {
    window.history.back();
}
