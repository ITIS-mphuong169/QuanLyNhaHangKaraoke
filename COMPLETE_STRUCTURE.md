# Cấu Trúc Hoàn Chỉnh Hệ Thống Quản Lý Nhà Hàng Karaoke

## Tổng Quan

Hệ thống được xây dựng theo đúng diagram thiết kế với 3 lớp: **View**, **DAO**, và **Model**.

## Cấu Trúc Đầy Đủ

### 📁 FE/ - Frontend (View Layer)

#### Pages (Giao Diện)
1. **GDDangNhap.js** - Giao diện đăng nhập
2. **GDQuanLY.js** - Giao diện quản lý tổng quan
3. **QuanLyPhong.js** - Quản lý phòng karaoke
4. **QuanLyKhachHang.js** - Quản lý khách hàng
5. **GDQLTTMHbankem.js** - Quản lý thông tin mặt hàng bán kèm
6. **GDSuaTTMHBankem.js** - Sửa thông tin mặt hàng bán kèm
7. **GDTaophieunhap.js** - Tạo phiếu nhập hàng
8. **GDChonNCC.js** - Chọn nhà cung cấp
9. **GDChonMH.js** - Chọn mặt hàng
10. **GDNhapSL.js** - Nhập số lượng
11. **GDPhieuNhap.js** - Xem phiếu nhập
12. **GDThongKeMH.js** - Thống kê mặt hàng
13. **GDDanhSachHD.js** - Danh sách hóa đơn
14. **GDChiTietHD.js** - Chi tiết hóa đơn

#### Components
- **FetchAPI.js** - Component xử lý API calls
- **api.js** - API Service

### 📁 BE/ - Backend

#### Entities (Model Layer)
1. **Phong.js** - Phòng karaoke
2. **KhachHang.js** - Khách hàng
3. **NhanVien.js** - Nhân viên
4. **Nguoi.js** - Người (lớp cha)
5. **MatHang.js** - Mặt hàng bán kèm
6. **NhaCungCap.js** - Nhà cung cấp
7. **DatPhong.js** - Đặt phòng
8. **Phongdat.js** - Phòng đã đặt
9. **HoaDon.js** - Hóa đơn
10. **ChiTietHoaDon.js** - Chi tiết hóa đơn
11. **NhapHang.js** - Nhập hàng
12. **ChiTietNhapHang.js** - Chi tiết nhập hàng
13. **MatHangCungcap.js** - Mặt hàng cung cấp
14. **MatHangSD.js** - Mặt hàng sử dụng
15. **ThongkechitietMH.js** - Thống kê chi tiết mặt hàng
16. **Nhahang.js** - Nhà hàng

#### DAO Layer
1. **PhongDAO.js**
2. **KhachHangDAO.js**
3. **NhanVienDAO.js**
4. **NguoiDAO.js**
5. **MatHangDAO.js**
6. **NhaCungCapDAO.js**
7. **DatPhongDAO.js**
8. **PhongdatDAO.js**
9. **HoaDonDAO.js**
10. **ChiTietHoaDonDAO.js**
11. **NhapHangDAO.js**
12. **ChiTietNhapHangDAO.js**
13. **MHCungcapDAO.js**
14. **MatHangSDDAO.js**
15. **ThongKeMHBanKemDAO.js**

#### Service Layer
1. **PhongService.js**
2. **KhachHangService.js**
3. **MatHangService.js**
4. **DatPhongService.js**
5. **NhaCungCapService.js**
6. **NhapHangService.js**
7. **ThongKeMHBanKemService.js**

#### Controller Layer
1. **PhongController.js**
2. **KhachHangController.js**
3. **MatHangController.js**
4. **DatPhongController.js**
5. **NhaCungCapController.js**
6. **NhapHangController.js**
7. **ThongKeMHBanKemController.js**

#### Routes
1. **phongRoutes.js**
2. **khachHangRoutes.js**
3. **matHangRoutes.js**
4. **datPhongRoutes.js**
5. **nhaCungCapRoutes.js**
6. **nhapHangRoutes.js**
7. **thongKeRoutes.js**

### 📁 DTB/ - Database

#### Schema
- **schema.sql** - Database schema đầy đủ với tất cả các bảng:
  - Phong
  - KhachHang
  - NhanVien
  - Nguoi
  - MatHang
  - NhaCungCap
  - DatPhong
  - Phongdat
  - HoaDon
  - ChiTietHoaDon
  - NhapHang
  - ChiTietNhapHang
  - MatHangCungcap
  - MatHangSD
  - ThongkechitietMH
  - Nhahang

## Luồng Hoạt Động

### View → DAO → Model

1. **View Layer**: Người dùng tương tác với giao diện
2. **Router**: Điều hướng request đến Controller
3. **Controller**: Xử lý request, gọi Service
4. **Service**: Xử lý business logic, gọi DAO
5. **DAO**: Tương tác với database
6. **Model**: Trả về dữ liệu dưới dạng Entity

## API Endpoints Đầy Đủ

### Phòng
- `GET /api/phong` - Danh sách phòng
- `GET /api/phong/:id` - Chi tiết phòng
- `GET /api/phong/trong` - Phòng trống
- `POST /api/phong` - Tạo phòng
- `PUT /api/phong/:id` - Cập nhật phòng
- `PATCH /api/phong/:id/trang-thai` - Cập nhật trạng thái
- `DELETE /api/phong/:id` - Xóa phòng

### Khách Hàng
- `GET /api/khach-hang` - Danh sách khách hàng
- `GET /api/khach-hang/:id` - Chi tiết khách hàng
- `GET /api/khach-hang/search?keyword=...` - Tìm kiếm
- `POST /api/khach-hang` - Tạo khách hàng
- `PUT /api/khach-hang/:id` - Cập nhật
- `DELETE /api/khach-hang/:id` - Xóa

### Mặt Hàng
- `GET /api/mat-hang` - Danh sách mặt hàng
- `GET /api/mat-hang/:id` - Chi tiết
- `GET /api/mat-hang/danh-muc/:danhMuc` - Theo danh mục
- `GET /api/mat-hang/search?keyword=...` - Tìm kiếm
- `POST /api/mat-hang` - Tạo mới
- `PUT /api/mat-hang/:id` - Cập nhật
- `DELETE /api/mat-hang/:id` - Xóa

### Đặt Phòng
- `GET /api/dat-phong` - Danh sách đặt phòng
- `GET /api/dat-phong/:id` - Chi tiết
- `POST /api/dat-phong` - Tạo đặt phòng
- `PUT /api/dat-phong/:id` - Cập nhật
- `PATCH /api/dat-phong/:id/trang-thai` - Cập nhật trạng thái
- `DELETE /api/dat-phong/:id` - Xóa

### Nhà Cung Cấp
- `GET /api/nha-cung-cap` - Danh sách
- `GET /api/nha-cung-cap/:id` - Chi tiết
- `POST /api/nha-cung-cap` - Tạo mới
- `PUT /api/nha-cung-cap/:id` - Cập nhật
- `DELETE /api/nha-cung-cap/:id` - Xóa

### Nhập Hàng
- `GET /api/nhap-hang` - Danh sách phiếu nhập
- `GET /api/nhap-hang/:id` - Chi tiết phiếu nhập
- `POST /api/nhap-hang` - Tạo phiếu nhập
- `DELETE /api/nhap-hang/:id` - Xóa

### Thống Kê
- `GET /api/thong-ke/tong-hop` - Thống kê tổng hợp
- `GET /api/thong-ke/khoang-thoi-gian?startDate=...&endDate=...` - Theo khoảng thời gian
- `GET /api/thong-ke/mat-hang/:maMatHang?startDate=...&endDate=...` - Theo mặt hàng

## Frontend Routes

- `/dang-nhap` - Đăng nhập
- `/quan-ly` - Trang quản lý
- `/phong` - Quản lý phòng
- `/khach-hang` - Quản lý khách hàng
- `/mat-hang` - Quản lý mặt hàng
- `/sua-mat-hang/:id?` - Sửa mặt hàng
- `/nha-cung-cap` - Nhà cung cấp
- `/tao-phieu-nhap` - Tạo phiếu nhập
- `/phieu-nhap/:id` - Xem phiếu nhập
- `/thong-ke-mh` - Thống kê mặt hàng
- `/danh-sach-hoa-don` - Danh sách hóa đơn
- `/chi-tiet-hoa-don/:id` - Chi tiết hóa đơn

## Tổng Kết

Hệ thống đã được xây dựng đầy đủ theo diagram với:
- ✅ 16 Entities (Model)
- ✅ 15 DAO classes
- ✅ 7 Service classes
- ✅ 7 Controller classes
- ✅ 7 Route definitions
- ✅ 14 Frontend Pages/Components
- ✅ Database schema đầy đủ

Tất cả đã được tổ chức rõ ràng theo từng lớp, từng thực thể, và từng giao diện như yêu cầu!

