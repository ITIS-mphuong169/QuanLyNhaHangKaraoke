# API Documentation

## Tổng Quan

Backend cung cấp REST API để frontend giao tiếp. Tất cả API endpoints bắt đầu với prefix `/api`.

## Base URL

```
http://localhost:3001/api
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { /* ... */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message"
}
```

## HTTP Status Codes

- `200` - OK (Success)
- `201` - Created (Resource created successfully)
- `400` - Bad Request (Validation error, invalid input)
- `404` - Not Found (Resource not found)
- `500` - Internal Server Error (Server error)

## API Endpoints

### 1. Phòng (Phong)

#### GET /api/phong
Lấy danh sách tất cả phòng

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "maPhong": "P001",
      "tenPhong": "Phòng VIP 1",
      "loaiPhong": "VIP",
      "sucChua": 10,
      "giaGio": 200000,
      "trangThai": "TRONG",
      "moTa": "Phòng VIP sang trọng",
      "ngayTao": "2024-01-01T00:00:00.000Z",
      "ngayCapNhat": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### GET /api/phong/:id
Lấy thông tin phòng theo ID

**Parameters**:
- `id` (path) - Mã phòng

**Response**:
```json
{
  "success": true,
  "data": {
    "maPhong": "P001",
    "tenPhong": "Phòng VIP 1",
    ...
  }
}
```

#### GET /api/phong/trong
Lấy danh sách phòng trống

**Response**: Tương tự GET /api/phong

#### POST /api/phong
Tạo phòng mới

**Request Body**:
```json
{
  "tenPhong": "Phòng VIP 2",
  "loaiPhong": "VIP",
  "sucChua": 12,
  "giaGio": 250000,
  "trangThai": "TRONG",
  "moTa": "Phòng VIP mới"
}
```

**Validation**:
- `tenPhong`: Bắt buộc, không được để trống
- `loaiPhong`: Bắt buộc, phải là "VIP", "Thường", hoặc "Đặc biệt"
- `sucChua`: Bắt buộc, phải là số nguyên dương
- `giaGio`: Bắt buộc, phải là số không âm
- `trangThai`: Tùy chọn, mặc định "TRONG"

**Response**:
```json
{
  "success": true,
  "data": {
    "maPhong": "P002",
    ...
  }
}
```

#### PUT /api/phong/:id
Cập nhật thông tin phòng

**Parameters**:
- `id` (path) - Mã phòng

**Request Body**: Tương tự POST, nhưng tất cả fields đều optional

**Response**: Tương tự POST

#### PATCH /api/phong/:id/trang-thai
Cập nhật trạng thái phòng

**Parameters**:
- `id` (path) - Mã phòng

**Request Body**:
```json
{
  "trangThai": "DANG_SU_DUNG"
}
```

**Response**: Tương tự GET /api/phong/:id

#### DELETE /api/phong/:id
Xóa phòng

**Parameters**:
- `id` (path) - Mã phòng

**Response**:
```json
{
  "success": true,
  "message": "Xóa phòng thành công"
}
```

---

### 2. Khách Hàng (KhachHang)

#### GET /api/khach-hang
Lấy danh sách tất cả khách hàng

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "maKhachHang": "KH001",
      "hoTen": "Nguyễn Văn A",
      "soDienThoai": "0123456789",
      "email": "nguyenvana@email.com",
      "diaChi": "123 Đường ABC",
      "ngayTao": "2024-01-01T00:00:00.000Z",
      "ngayCapNhat": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### GET /api/khach-hang/:id
Lấy thông tin khách hàng theo ID

**Parameters**:
- `id` (path) - Mã khách hàng

#### GET /api/khach-hang/search?keyword=...
Tìm kiếm khách hàng

**Query Parameters**:
- `keyword` - Từ khóa tìm kiếm (tên, số điện thoại, email)

**Response**: Tương tự GET /api/khach-hang

#### POST /api/khach-hang
Tạo khách hàng mới

**Request Body**:
```json
{
  "hoTen": "Nguyễn Văn B",
  "soDienThoai": "0987654321",
  "email": "nguyenvanb@email.com",
  "diaChi": "456 Đường XYZ"
}
```

#### PUT /api/khach-hang/:id
Cập nhật thông tin khách hàng

#### DELETE /api/khach-hang/:id
Xóa khách hàng

---

### 3. Mặt Hàng (MatHang)

#### GET /api/mat-hang
Lấy danh sách tất cả mặt hàng

#### GET /api/mat-hang/:id
Lấy thông tin mặt hàng theo ID

#### GET /api/mat-hang/nha-cung-cap/:maNhaCungCap
Lấy danh sách mặt hàng theo nhà cung cấp

**Parameters**:
- `maNhaCungCap` (path) - Mã nhà cung cấp

#### POST /api/mat-hang
Tạo mặt hàng mới

**Request Body**:
```json
{
  "tenMatHang": "Bia Tiger",
  "donViTinh": "Thùng",
  "giaBan": 500000,
  "soLuongTon": 100,
  "moTa": "Bia Tiger 24 lon"
}
```

#### PUT /api/mat-hang/:id
Cập nhật mặt hàng

#### DELETE /api/mat-hang/:id
Xóa mặt hàng

---

### 4. Đặt Phòng (DatPhong)

#### GET /api/dat-phong
Lấy danh sách tất cả đặt phòng

#### GET /api/dat-phong/:id
Lấy thông tin đặt phòng theo ID

#### POST /api/dat-phong
Tạo đặt phòng mới

**Request Body**:
```json
{
  "maPhong": "P001",
  "maKhachHang": "KH001",
  "ngayDat": "2024-01-15",
  "gioBatDau": "18:00",
  "gioKetThuc": "22:00",
  "trangThai": "DA_DAT"
}
```

#### PUT /api/dat-phong/:id
Cập nhật đặt phòng

#### PATCH /api/dat-phong/:id/trang-thai
Cập nhật trạng thái đặt phòng

**Request Body**:
```json
{
  "trangThai": "DA_HUY"
}
```

#### DELETE /api/dat-phong/:id
Xóa đặt phòng

---

### 5. Phiếu Đặt (PhieuDat)

#### GET /api/phieu-dat
Lấy danh sách tất cả phiếu đặt

#### GET /api/phieu-dat/:id
Lấy thông tin phiếu đặt theo ID

#### GET /api/phieu-dat/trang-thai/:trangThai
Lấy danh sách phiếu đặt theo trạng thái

**Parameters**:
- `trangThai` (path) - Trạng thái (CHUA_THANH_TOAN, DA_THANH_TOAN, HUY)

#### POST /api/phieu-dat
Tạo phiếu đặt mới

**Request Body**:
```json
{
  "maKhachHang": "KH001",
  "maNhanVien": "NV001",
  "ngayDat": "2024-01-15",
  "chiTietPhong": [
    {
      "maPhong": "P001",
      "gioBatDau": "18:00",
      "gioKetThuc": "22:00"
    }
  ],
  "chiTietMatHang": [
    {
      "maMatHang": "MH001",
      "soLuong": 2
    }
  ]
}
```

#### PUT /api/phieu-dat/:id
Cập nhật phiếu đặt

#### POST /api/phieu-dat/:id/thanh-toan
Thanh toán phiếu đặt

**Request Body**:
```json
{
  "maNhanVien": "NV001",
  "tongTien": 1500000
}
```

#### DELETE /api/phieu-dat/:id
Xóa phiếu đặt

---

### 6. Nhập Hàng (NhapHang)

#### GET /api/nhap-hang
Lấy danh sách tất cả nhập hàng

#### GET /api/nhap-hang/:id
Lấy thông tin nhập hàng theo ID

#### POST /api/nhap-hang
Tạo phiếu nhập hàng mới

**Request Body**:
```json
{
  "maNhaCungCap": "NCC001",
  "maNhanVien": "NV001",
  "ngayNhap": "2024-01-15",
  "chiTiet": [
    {
      "maMatHang": "MH001",
      "soLuong": 50,
      "donGia": 400000
    }
  ]
}
```

---

### 7. Nhà Cung Cấp (NhaCungCap)

#### GET /api/nha-cung-cap
Lấy danh sách tất cả nhà cung cấp

#### POST /api/nha-cung-cap
Tạo nhà cung cấp mới

**Request Body**:
```json
{
  "tenNhaCungCap": "Công ty ABC",
  "soDienThoai": "0123456789",
  "email": "contact@abc.com",
  "diaChi": "123 Đường XYZ"
}
```

---

### 8. Thống Kê (ThongKe)

#### GET /api/thong-ke/tong-hop
Lấy thống kê tổng hợp

**Response**:
```json
{
  "success": true,
  "data": {
    "tongDoanhThu": 50000000,
    "tongSoHoaDon": 100,
    "tongSoPhieuDat": 120
  }
}
```

#### GET /api/thong-ke/khoang-thoi-gian?startDate=...&endDate=...
Lấy thống kê theo khoảng thời gian

**Query Parameters**:
- `startDate` - Ngày bắt đầu (YYYY-MM-DD)
- `endDate` - Ngày kết thúc (YYYY-MM-DD)

#### GET /api/thong-ke/mat-hang/:maMatHang?startDate=...&endDate=...
Lấy thống kê theo mặt hàng

**Parameters**:
- `maMatHang` (path) - Mã mặt hàng

**Query Parameters**:
- `startDate` - Ngày bắt đầu
- `endDate` - Ngày kết thúc

---

### 9. Health Check

#### GET /api/health
Kiểm tra trạng thái server

**Response**:
```json
{
  "status": "OK",
  "message": "Server đang hoạt động"
}
```

## Error Handling

### Validation Errors (400)
```json
{
  "success": false,
  "message": "Tên phòng không được để trống. Loại phòng không hợp lệ."
}
```

### Not Found Errors (404)
```json
{
  "success": false,
  "message": "Không tìm thấy phòng"
}
```

### Server Errors (500)
```json
{
  "success": false,
  "message": "Có lỗi xảy ra trên server",
  "error": "Detailed error message (chỉ trong development mode)"
}
```

## Authentication

Hiện tại hệ thống chưa có authentication. Có thể thêm:
- JWT tokens
- Session-based authentication
- API keys

## Rate Limiting

Hiện tại chưa có rate limiting. Có thể thêm middleware để giới hạn số request.

## CORS

Backend đã cấu hình CORS để cho phép frontend gọi API từ `http://localhost:3000`.

## Testing API

### Sử dụng cURL

```bash
# GET request
curl http://localhost:3001/api/phong

# POST request
curl -X POST http://localhost:3001/api/phong \
  -H "Content-Type: application/json" \
  -d '{"tenPhong":"Phòng VIP 1","loaiPhong":"VIP","sucChua":10,"giaGio":200000}'
```

### Sử dụng Postman

1. Import collection (nếu có)
2. Set base URL: `http://localhost:3001/api`
3. Test các endpoints

### Sử dụng Browser

Mở browser và truy cập:
```
http://localhost:3001/api/phong
```

