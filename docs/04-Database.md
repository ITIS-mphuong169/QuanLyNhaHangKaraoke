# Database Documentation

## Tổng Quan

Hệ thống sử dụng **MySQL** làm database. Database được thiết kế với các bảng và quan hệ rõ ràng để quản lý toàn bộ hoạt động của nhà hàng karaoke.

## Thông Tin Database

- **Database Name**: `NhaHangKaraoke`
- **Character Set**: `utf8mb4`
- **Collation**: `utf8mb4_unicode_ci`
- **Engine**: InnoDB

## Cấu Trúc Thư Mục

```
DTB/
├── schemas/
│   └── schema.sql        # File SQL tạo database và tables
└── migrations/           # Database migrations (nếu có)
```

## Các Bảng (Tables)

### 1. Phong (Phòng Karaoke)

**Mô tả**: Lưu trữ thông tin các phòng karaoke

**Các cột**:
- `maPhong` (PK) - Mã phòng (Primary Key)
- `tenPhong` - Tên phòng
- `loaiPhong` - Loại phòng (VIP, Thường, Đặc biệt)
- `sucChua` - Sức chứa (số người tối đa)
- `giaGio` - Giá theo giờ
- `trangThai` - Trạng thái (TRONG, DANG_SU_DUNG, BAO_TRI)
- `moTa` - Mô tả
- `ngayTao` - Ngày tạo
- `ngayCapNhat` - Ngày cập nhật

### 2. KhachHang (Khách Hàng)

**Mô tả**: Lưu trữ thông tin khách hàng

**Các cột**:
- `maKhachHang` (PK) - Mã khách hàng
- `hoTen` - Họ tên
- `soDienThoai` - Số điện thoại
- `email` - Email
- `diaChi` - Địa chỉ
- `ngayTao` - Ngày tạo
- `ngayCapNhat` - Ngày cập nhật

### 3. NhanVien (Nhân Viên)

**Mô tả**: Lưu trữ thông tin nhân viên

**Các cột**:
- `maNhanVien` (PK) - Mã nhân viên
- `hoTen` - Họ tên
- `soDienThoai` - Số điện thoại
- `email` - Email
- `chucVu` - Chức vụ
- `ngayTao` - Ngày tạo

### 4. MatHang (Mặt Hàng)

**Mô tả**: Lưu trữ thông tin mặt hàng bán kèm

**Các cột**:
- `maMatHang` (PK) - Mã mặt hàng
- `tenMatHang` - Tên mặt hàng
- `donViTinh` - Đơn vị tính
- `giaBan` - Giá bán
- `soLuongTon` - Số lượng tồn kho
- `moTa` - Mô tả
- `ngayTao` - Ngày tạo
- `ngayCapNhat` - Ngày cập nhật

### 5. NhaCungCap (Nhà Cung Cấp)

**Mô tả**: Lưu trữ thông tin nhà cung cấp

**Các cột**:
- `maNhaCungCap` (PK) - Mã nhà cung cấp
- `tenNhaCungCap` - Tên nhà cung cấp
- `soDienThoai` - Số điện thoại
- `email` - Email
- `diaChi` - Địa chỉ
- `ngayTao` - Ngày tạo

### 6. DatPhong (Đặt Phòng)

**Mô tả**: Lưu trữ thông tin đặt phòng

**Các cột**:
- `maDatPhong` (PK) - Mã đặt phòng
- `maPhong` (FK) - Mã phòng (Foreign Key → Phong)
- `maKhachHang` (FK) - Mã khách hàng (Foreign Key → KhachHang)
- `ngayDat` - Ngày đặt
- `gioBatDau` - Giờ bắt đầu
- `gioKetThuc` - Giờ kết thúc
- `trangThai` - Trạng thái
- `ngayTao` - Ngày tạo

### 7. PhieuDat (Phiếu Đặt)

**Mô tả**: Lưu trữ thông tin phiếu đặt phòng

**Các cột**:
- `maPhieuDat` (PK) - Mã phiếu đặt
- `maKhachHang` (FK) - Mã khách hàng
- `maNhanVien` (FK) - Mã nhân viên
- `ngayDat` - Ngày đặt
- `tongTien` - Tổng tiền
- `trangThai` - Trạng thái (CHUA_THANH_TOAN, DA_THANH_TOAN, HUY)
- `ngayTao` - Ngày tạo
- `ngayCapNhat` - Ngày cập nhật

### 8. ChiTietPhieuDat (Chi Tiết Phiếu Đặt)

**Mô tả**: Lưu trữ chi tiết các phòng và mặt hàng trong phiếu đặt

**Các cột**:
- `maChiTiet` (PK) - Mã chi tiết
- `maPhieuDat` (FK) - Mã phiếu đặt (Foreign Key → PhieuDat)
- `maPhong` (FK) - Mã phòng (Foreign Key → Phong)
- `maMatHang` (FK) - Mã mặt hàng (Foreign Key → MatHang, nullable)
- `soLuong` - Số lượng
- `donGia` - Đơn giá
- `thanhTien` - Thành tiền

### 9. HoaDon (Hóa Đơn)

**Mô tả**: Lưu trữ thông tin hóa đơn

**Các cột**:
- `maHoaDon` (PK) - Mã hóa đơn
- `maPhieuDat` (FK) - Mã phiếu đặt (Foreign Key → PhieuDat)
- `maNhanVien` (FK) - Mã nhân viên (Foreign Key → NhanVien)
- `ngayLap` - Ngày lập
- `tongTien` - Tổng tiền
- `trangThai` - Trạng thái
- `ngayTao` - Ngày tạo

### 10. ChiTietHoaDon (Chi Tiết Hóa Đơn)

**Mô tả**: Lưu trữ chi tiết các mặt hàng trong hóa đơn

**Các cột**:
- `maChiTiet` (PK) - Mã chi tiết
- `maHoaDon` (FK) - Mã hóa đơn (Foreign Key → HoaDon)
- `maMatHang` (FK) - Mã mặt hàng (Foreign Key → MatHang)
- `soLuong` - Số lượng
- `donGia` - Đơn giá
- `thanhTien` - Thành tiền

### 11. NhapHang (Nhập Hàng)

**Mô tả**: Lưu trữ thông tin phiếu nhập hàng

**Các cột**:
- `maNhapHang` (PK) - Mã nhập hàng
- `maNhaCungCap` (FK) - Mã nhà cung cấp (Foreign Key → NhaCungCap)
- `maNhanVien` (FK) - Mã nhân viên (Foreign Key → NhanVien)
- `ngayNhap` - Ngày nhập
- `tongTien` - Tổng tiền
- `trangThai` - Trạng thái
- `ngayTao` - Ngày tạo

### 12. ChiTietNhapHang (Chi Tiết Nhập Hàng)

**Mô tả**: Lưu trữ chi tiết các mặt hàng nhập

**Các cột**:
- `maChiTiet` (PK) - Mã chi tiết
- `maNhapHang` (FK) - Mã nhập hàng (Foreign Key → NhapHang)
- `maMatHang` (FK) - Mã mặt hàng (Foreign Key → MatHang)
- `soLuong` - Số lượng
- `donGia` - Đơn giá nhập
- `thanhTien` - Thành tiền

### 13. MatHangCungcap (Mặt Hàng Cung Cấp)

**Mô tả**: Quan hệ nhiều-nhiều giữa Mặt Hàng và Nhà Cung Cấp

**Các cột**:
- `maMatHang` (FK) - Mã mặt hàng (Foreign Key → MatHang)
- `maNhaCungCap` (FK) - Mã nhà cung cấp (Foreign Key → NhaCungCap)
- `giaNhap` - Giá nhập từ nhà cung cấp này

### 14. MatHangSD (Mặt Hàng Sử Dụng)

**Mô tả**: Lưu trữ thông tin mặt hàng đã sử dụng trong phiếu đặt

**Các cột**:
- `maChiTiet` (PK) - Mã chi tiết
- `maPhieuDat` (FK) - Mã phiếu đặt (Foreign Key → PhieuDat)
- `maMatHang` (FK) - Mã mặt hàng (Foreign Key → MatHang)
- `soLuong` - Số lượng sử dụng

### 15. Phongdat (Phòng Đặt)

**Mô tả**: Lưu trữ thông tin phòng trong phiếu đặt

**Các cột**:
- `maChiTiet` (PK) - Mã chi tiết
- `maPhieuDat` (FK) - Mã phiếu đặt (Foreign Key → PhieuDat)
- `maPhong` (FK) - Mã phòng (Foreign Key → Phong)
- `gioBatDau` - Giờ bắt đầu
- `gioKetThuc` - Giờ kết thúc
- `thanhTien` - Thành tiền

### 16. ThongkechitietMH (Thống Kê Chi Tiết Mặt Hàng)

**Mô tả**: Bảng thống kê doanh số mặt hàng

**Các cột**:
- `maThongKe` (PK) - Mã thống kê
- `maMatHang` (FK) - Mã mặt hàng (Foreign Key → MatHang)
- `ngay` - Ngày
- `soLuongBan` - Số lượng bán
- `doanhThu` - Doanh thu

## Quan Hệ Giữa Các Bảng (Relationships)

### 1. Phong
- Một phòng có nhiều đặt phòng (DatPhong)
- Một phòng có nhiều chi tiết phiếu đặt (ChiTietPhieuDat)
- Một phòng có nhiều phòng đặt (Phongdat)

### 2. KhachHang
- Một khách hàng có nhiều đặt phòng (DatPhong)
- Một khách hàng có nhiều phiếu đặt (PhieuDat)

### 3. MatHang
- Một mặt hàng có nhiều chi tiết hóa đơn (ChiTietHoaDon)
- Một mặt hàng có nhiều chi tiết nhập hàng (ChiTietNhapHang)
- Một mặt hàng có nhiều mặt hàng cung cấp (MatHangCungcap)
- Một mặt hàng có nhiều mặt hàng sử dụng (MatHangSD)
- Một mặt hàng có nhiều thống kê (ThongkechitietMH)

### 4. NhaCungCap
- Một nhà cung cấp có nhiều nhập hàng (NhapHang)
- Một nhà cung cấp có nhiều mặt hàng cung cấp (MatHangCungcap)

### 5. PhieuDat
- Một phiếu đặt có nhiều chi tiết phiếu đặt (ChiTietPhieuDat)
- Một phiếu đặt có một hóa đơn (HoaDon) - 1:1
- Một phiếu đặt có nhiều mặt hàng sử dụng (MatHangSD)
- Một phiếu đặt có nhiều phòng đặt (Phongdat)

### 6. HoaDon
- Một hóa đơn có nhiều chi tiết hóa đơn (ChiTietHoaDon)

### 7. NhapHang
- Một nhập hàng có nhiều chi tiết nhập hàng (ChiTietNhapHang)

## Indexes

Các indexes được tạo trên:
- Primary Keys (tự động)
- Foreign Keys (nếu cần)
- Các cột thường xuyên được tìm kiếm (tenPhong, hoTen, soDienThoai, ...)

## Constraints

### Primary Key Constraints
- Mỗi bảng có một Primary Key duy nhất

### Foreign Key Constraints
- Đảm bảo tính toàn vẹn dữ liệu
- CASCADE hoặc RESTRICT tùy theo nghiệp vụ

### Check Constraints
- Trạng thái phải nằm trong danh sách giá trị cho phép
- Số lượng, giá tiền phải >= 0

## Backup và Restore

### Backup
```bash
mysqldump -u root -p NhaHangKaraoke > backup.sql
```

### Restore
```bash
mysql -u root -p NhaHangKaraoke < backup.sql
```

## Migration

File schema SQL nằm tại: `DTB/schemas/schema.sql`

Để tạo database và tables:
```bash
mysql -u root -p < DTB/schemas/schema.sql
```

## Kết Nối Database

Backend kết nối database qua file `BE/src/config/database.js`:
- Sử dụng connection pool
- Cấu hình từ file `.env`
- Tự động test connection khi khởi động

## Performance Optimization

### Indexes
- Tạo indexes trên các cột thường xuyên được query
- Indexes trên Foreign Keys

### Query Optimization
- Sử dụng JOIN thay vì multiple queries
- Sử dụng LIMIT cho pagination
- Tránh SELECT * khi không cần thiết

### Connection Pooling
- Sử dụng connection pool để tối ưu performance
- Giới hạn số connection đồng thời

