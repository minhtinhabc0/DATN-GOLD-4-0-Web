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
app.controller("MainController", function ($scope, $location) {
    $scope.changeRoute = function (route) {
        $location.path(route);
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

app.controller('quanlysanphamCtrl', function ($scope) { });

app.controller('quanlydonhangCtrl', function ($scope, $http) {
    // Khai báo danh sách đơn hàng
    $scope.donHangs = [];
    $scope.donHangsFiltered = []; // Dữ liệu đã lọc
    $scope.pageSize = 1; // Số lượng đơn hàng trên mỗi trang
    $scope.currentPage = 1; // Trang hiện tại
    $scope.searchKeyword = ""; // Từ khóa tìm kiếm
    $scope.selectedStatus = ""; // Trạng thái đã chọn
    $scope.sortCriteria = ""; // Tiêu chí sắp xếp

    // Hàm lấy danh sách đơn hàng từ API và phân trang
    $scope.getDanhSachDonHang = function () {
        $http.get('http://localhost:8080/api/donhang')
            .then(function (response) {
                // Gán dữ liệu nhận được vào danh sách đơn hàng
                $scope.donHangs = response.data;
                $scope.donHangsFiltered = angular.copy($scope.donHangs); // Khởi tạo danh sách đã lọc
                $scope.totalPages = Math.ceil($scope.donHangs.length / $scope.pageSize);
                $scope.paginateData(); // Phân trang dữ liệu
            })
            .catch(function (error) {
                console.error('Có lỗi xảy ra khi lấy danh sách đơn hàng:', error);
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

    // Hàm lọc đơn hàng theo tìm kiếm và trạng thái
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

    // Gọi hàm để lấy danh sách đơn hàng khi controller được khởi tạo
    $scope.getDanhSachDonHang();
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
