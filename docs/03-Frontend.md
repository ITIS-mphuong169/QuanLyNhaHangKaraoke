# Frontend Documentation

## Tổng Quan

Frontend được xây dựng bằng React với React Router để điều hướng. Frontend giao tiếp với backend qua REST API.

## Cấu Trúc Thư Mục

```
FE/src/
├── App.js              # Component chính với routing
├── App.css             # Styles cho App component
├── index.js            # Entry point
├── index.css           # Global styles
├── components/         # Các component tái sử dụng
│   └── FetchAPI.js     # Component để fetch API
├── pages/              # Các trang/giao diện chính
└── services/           # API services
    └── api.js          # API service class
```

## Entry Point: index.js

File khởi tạo React app và render App component vào DOM.

## App Component: App.js

Component chính của ứng dụng, chứa routing và navigation.

### Routing

Sử dụng React Router để điều hướng giữa các trang:

- `/` - Redirect đến `/dang-nhap`
- `/dang-nhap` - Trang đăng nhập
- `/quan-ly` - Trang quản lý chính
- `/phong` - Quản lý phòng
- `/dat-phong` - Quản lý đặt phòng
- `/tao-phieu-dat` - Tạo phiếu đặt
- `/thanh-toan/:id` - Thanh toán
- `/khach-hang` - Quản lý khách hàng
- `/mat-hang` - Quản lý mặt hàng
- `/sua-mat-hang/:id` - Sửa mặt hàng
- `/thong-ke-mh` - Thống kê mặt hàng
- `/tao-phieu-nhap` - Tạo phiếu nhập
- `/phieu-nhap/:id` - Chi tiết phiếu nhập
- `/danh-sach-hoa-don` - Danh sách hóa đơn
- `/chi-tiet-hoa-don/:id` - Chi tiết hóa đơn

### Navigation

Navigation bar chứa các link đến các trang chính:
- Trang Chủ
- Quản Lý Phòng
- Quản Lý Đặt Phòng
- Quản Lý Khách Hàng
- Quản Lý Mặt Hàng
- Nhập Hàng
- Thống Kê Mặt Hàng
- Hóa Đơn

## Components

### FetchAPI.js

Component tái sử dụng để fetch dữ liệu từ API.

**Props**:
- `url`: API endpoint
- `method`: HTTP method (GET, POST, PUT, DELETE)
- `data`: Request body (cho POST/PUT)
- `onSuccess`: Callback khi thành công
- `onError`: Callback khi có lỗi

## Pages

### 1. GDDangNhap.js
**Mô tả**: Trang đăng nhập

**Chức năng**:
- Form đăng nhập
- Xác thực người dùng
- Chuyển hướng sau khi đăng nhập thành công

### 2. GDQuanLY.js
**Mô tả**: Trang quản lý chính (Dashboard)

**Chức năng**:
- Hiển thị tổng quan hệ thống
- Các thống kê nhanh
- Link đến các module chính

### 3. QuanLyPhong.js
**Mô tả**: Quản lý phòng karaoke

**Chức năng**:
- Hiển thị danh sách phòng
- Tạo phòng mới
- Sửa thông tin phòng
- Xóa phòng
- Cập nhật trạng thái phòng
- Tìm kiếm và lọc phòng

**API sử dụng**:
- `GET /api/phong` - Lấy danh sách phòng
- `POST /api/phong` - Tạo phòng mới
- `PUT /api/phong/:id` - Cập nhật phòng
- `DELETE /api/phong/:id` - Xóa phòng
- `PATCH /api/phong/:id/trang-thai` - Cập nhật trạng thái

### 4. QuanLyDatPhong.js
**Mô tả**: Quản lý đặt phòng

**Chức năng**:
- Hiển thị danh sách đặt phòng
- Xem chi tiết đặt phòng
- Cập nhật trạng thái đặt phòng
- Xóa đặt phòng

### 5. TaoPhieuDat.js
**Mô tả**: Tạo phiếu đặt phòng mới

**Chức năng**:
- Form tạo phiếu đặt
- Chọn khách hàng
- Chọn phòng
- Chọn mặt hàng bán kèm
- Tính toán tổng tiền
- Lưu phiếu đặt

### 6. ThanhToan.js
**Mô tả**: Thanh toán phiếu đặt

**Chức năng**:
- Hiển thị thông tin phiếu đặt
- Tính toán tổng tiền
- Xử lý thanh toán
- Tạo hóa đơn

### 7. QuanLyKhachHang.js
**Mô tả**: Quản lý khách hàng

**Chức năng**:
- Hiển thị danh sách khách hàng
- Tạo khách hàng mới
- Sửa thông tin khách hàng
- Xóa khách hàng
- Tìm kiếm khách hàng

**API sử dụng**:
- `GET /api/khach-hang` - Lấy danh sách khách hàng
- `GET /api/khach-hang/search?keyword=...` - Tìm kiếm khách hàng
- `POST /api/khach-hang` - Tạo khách hàng mới
- `PUT /api/khach-hang/:id` - Cập nhật khách hàng
- `DELETE /api/khach-hang/:id` - Xóa khách hàng

### 8. GDQLTTMHbankem.js
**Mô tả**: Quản lý thông tin mặt hàng bán kèm

**Chức năng**:
- Hiển thị danh sách mặt hàng
- Tạo mặt hàng mới
- Sửa mặt hàng
- Xóa mặt hàng
- Tìm kiếm mặt hàng

### 9. GDSuaTTMHBankem.js
**Mô tả**: Sửa thông tin mặt hàng bán kèm

**Chức năng**:
- Form sửa mặt hàng
- Load dữ liệu mặt hàng hiện tại
- Cập nhật thông tin mặt hàng

### 10. GDThongKeMH.js
**Mô tả**: Thống kê mặt hàng

**Chức năng**:
- Hiển thị thống kê mặt hàng bán kèm
- Lọc theo khoảng thời gian
- Hiển thị biểu đồ và bảng thống kê

### 11. GDTaophieunhap.js
**Mô tả**: Tạo phiếu nhập hàng

**Chức năng**:
- Form tạo phiếu nhập
- Chọn nhà cung cấp
- Thêm mặt hàng nhập
- Tính toán tổng tiền
- Lưu phiếu nhập

### 12. GDPhieuNhap.js
**Mô tả**: Chi tiết phiếu nhập hàng

**Chức năng**:
- Hiển thị thông tin phiếu nhập
- Hiển thị danh sách mặt hàng nhập
- Xem chi tiết từng mặt hàng

### 13. GDDanhSachHD.js
**Mô tả**: Danh sách hóa đơn

**Chức năng**:
- Hiển thị danh sách hóa đơn
- Tìm kiếm hóa đơn
- Lọc hóa đơn theo ngày
- Xem chi tiết hóa đơn

### 14. GDChiTietHD.js
**Mô tả**: Chi tiết hóa đơn

**Chức năng**:
- Hiển thị thông tin hóa đơn
- Hiển thị danh sách mặt hàng
- Tính toán tổng tiền
- In hóa đơn (nếu có)

### 15. GDChonMH.js
**Mô tả**: Chọn mặt hàng

**Chức năng**:
- Hiển thị danh sách mặt hàng để chọn
- Tìm kiếm mặt hàng
- Chọn mặt hàng và trả về

### 16. GDChonNCC.js
**Mô tả**: Chọn nhà cung cấp

**Chức năng**:
- Hiển thị danh sách nhà cung cấp
- Tìm kiếm nhà cung cấp
- Chọn nhà cung cấp và trả về

### 17. GDNhapSL.js
**Mô tả**: Nhập số lượng

**Chức năng**:
- Form nhập số lượng
- Validation số lượng
- Trả về số lượng đã nhập

## Services

### api.js

Service class để gọi API từ backend.

**Cấu trúc**:
- Sử dụng `fetch` API
- Base URL: `http://localhost:3001/api` (có thể config qua env)
- Các methods tương ứng với các API endpoints

**Các nhóm methods**:

1. **Phòng**:
   - `getPhongList()`
   - `getPhongById(id)`
   - `getPhongTrong()`
   - `createPhong(phongData)`
   - `updatePhong(id, phongData)`
   - `deletePhong(id)`
   - `updatePhongTrangThai(id, trangThai)`

2. **Khách hàng**:
   - `getKhachHangList()`
   - `getKhachHangById(id)`
   - `searchKhachHang(keyword)`
   - `createKhachHang(khachHangData)`
   - `updateKhachHang(id, khachHangData)`
   - `deleteKhachHang(id)`

3. **Mặt hàng**:
   - `getMatHangList()`
   - `getMatHangById(id)`
   - `getMatHangByNhaCungCap(maNhaCungCap)`
   - `createMatHang(matHangData)`
   - `updateMatHang(id, matHangData)`
   - `deleteMatHang(id)`

4. **Đặt phòng**:
   - `getDatPhongList()`
   - `getDatPhongById(id)`
   - `createDatPhong(datPhongData)`
   - `updateDatPhong(id, datPhongData)`
   - `updateTrangThaiDatPhong(id, trangThai)`
   - `deleteDatPhong(id)`

5. **Phiếu đặt**:
   - `getPhieuDatList()`
   - `getPhieuDatById(id)`
   - `getPhieuDatByTrangThai(trangThai)`
   - `createPhieuDat(phieuDatData)`
   - `updatePhieuDat(id, phieuDatData)`
   - `thanhToanPhieuDat(id, phieuDatData)`
   - `deletePhieuDat(id)`

6. **Hóa đơn**:
   - `getHoaDonList()`
   - `getHoaDonById(id)`
   - `createHoaDon(hoaDonData)`

7. **Thống kê**:
   - `getThongKeTongHop()`
   - `getThongKeByDateRange(startDate, endDate)`
   - `getThongKeByMatHang(maMatHang, startDate, endDate)`

8. **Nhập hàng**:
   - `getNhapHangList()`
   - `getNhapHangById(id)`
   - `createNhapHang(nhapHangData)`

9. **Nhà cung cấp**:
   - `getNhaCungCapList()`
   - `createNhaCungCap(nccData)`

## Styling

Mỗi page component có file CSS riêng để styling:
- `QuanLyPhong.css`
- `QuanLyKhachHang.css`
- `GDQuanLY.css`
- Và các file CSS khác...

## State Management

Hiện tại sử dụng React local state (useState) và props để quản lý state. Có thể nâng cấp lên Context API hoặc Redux nếu cần.

## Error Handling

- Try-catch blocks trong các async functions
- Hiển thị error messages cho người dùng
- Log errors để debug

## Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.30.2",
  "react-scripts": "5.0.1"
}
```

## Environment Variables

Có thể tạo file `.env` trong thư mục `FE/`:

```env
REACT_APP_API_URL=http://localhost:3001/api
```

## Build và Deploy

### Development
```bash
npm start
```
Chạy development server tại `http://localhost:3000`

### Production Build
```bash
npm run build
```
Tạo production build trong thư mục `build/`

