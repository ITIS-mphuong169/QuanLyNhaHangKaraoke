# Backend Documentation

## Tổng Quan

Backend được xây dựng bằng Node.js và Express.js, sử dụng MySQL làm database. Backend tuân theo kiến trúc 3 lớp: Routes → Controller → Service → DAO.

## Cấu Trúc Thư Mục

```
BE/src/
├── app.js                 # Entry point của ứng dụng
├── config/
│   └── database.js        # Cấu hình kết nối database
├── entities/              # Entity classes
├── dao/                   # Data Access Objects
├── services/              # Business logic services
├── controllers/           # HTTP controllers
├── routes/                # API routes
└── middleware/            # Express middleware
```

## Entry Point: app.js

File chính khởi tạo Express server và cấu hình các routes.

**Chức năng**:
- Khởi tạo Express app
- Cấu hình middleware (CORS, JSON parser)
- Đăng ký các routes
- Xử lý lỗi và 404
- Khởi động server

**Port mặc định**: 3001

## Config: database.js

Cấu hình kết nối MySQL database.

**Tính năng**:
- Sử dụng connection pool
- Tự động test connection khi khởi động
- Wrapper function `query()` tương thích với PostgreSQL syntax
- Chuyển đổi PostgreSQL placeholders ($1, $2) sang MySQL placeholders (?)

**Cấu hình từ .env**:
- `DB_HOST`: Database host
- `DB_PORT`: Database port
- `DB_USER`: Database user
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name

## Entities

Entities là các class đại diện cho các thực thể trong hệ thống.

### Danh Sách Entities

1. **Phong** - Phòng karaoke
2. **KhachHang** - Khách hàng
3. **NhanVien** - Nhân viên
4. **MatHang** - Mặt hàng bán kèm
5. **NhaCungCap** - Nhà cung cấp
6. **DatPhong** - Đặt phòng
7. **PhieuDat** - Phiếu đặt phòng
8. **HoaDon** - Hóa đơn
9. **ChiTietHoaDon** - Chi tiết hóa đơn
10. **NhapHang** - Nhập hàng
11. **ChiTietNhapHang** - Chi tiết nhập hàng
12. **ChiTietPhieuDat** - Chi tiết phiếu đặt
13. **MatHangSD** - Mặt hàng sử dụng
14. **MatHangCungcap** - Mặt hàng cung cấp
15. **Phongdat** - Phòng đặt
16. **ThongkechitietMH** - Thống kê chi tiết mặt hàng

### Cấu Trúc Entity

Mỗi Entity class có:
- Constructor nhận data object
- Các properties đại diện cho các trường trong database
- Method `toJSON()` để chuyển đổi sang JSON

**Ví dụ: Phong Entity**

```javascript
class Phong {
  constructor(data = {}) {
    this.maPhong = data.maPhong || null;
    this.tenPhong = data.tenPhong || '';
    this.loaiPhong = data.loaiPhong || '';
    this.sucChua = data.sucChua || 0;
    this.giaGio = data.giaGio || 0;
    this.trangThai = data.trangThai || 'TRONG';
    this.moTa = data.moTa || '';
    this.ngayTao = data.ngayTao || new Date();
    this.ngayCapNhat = data.ngayCapNhat || new Date();
  }

  toJSON() {
    return { /* ... */ };
  }
}
```

## DAO (Data Access Object)

DAO layer chịu trách nhiệm tương tác trực tiếp với database.

### Chức Năng

- Thực hiện các thao tác CRUD (Create, Read, Update, Delete)
- Xây dựng và thực thi SQL queries
- Xử lý kết quả từ database
- Chuyển đổi database rows thành Entity objects

### Danh Sách DAO

1. **PhongDAO** - Truy cập dữ liệu phòng
2. **KhachHangDAO** - Truy cập dữ liệu khách hàng
3. **MatHangDAO** - Truy cập dữ liệu mặt hàng
4. **DatPhongDAO** - Truy cập dữ liệu đặt phòng
5. **PhieuDatDAO** - Truy cập dữ liệu phiếu đặt
6. **HoaDonDAO** - Truy cập dữ liệu hóa đơn
7. **ChiTietHoaDonDAO** - Truy cập dữ liệu chi tiết hóa đơn
8. **NhapHangDAO** - Truy cập dữ liệu nhập hàng
9. **ChiTietNhapHangDAO** - Truy cập dữ liệu chi tiết nhập hàng
10. **NhaCungCapDAO** - Truy cập dữ liệu nhà cung cấp
11. Và các DAO khác...

### Cấu Trúc DAO

Mỗi DAO class thường có các methods:
- `getAll()` - Lấy tất cả records
- `getById(id)` - Lấy record theo ID
- `create(entity)` - Tạo record mới
- `update(id, entity)` - Cập nhật record
- `delete(id)` - Xóa record
- Các methods đặc biệt khác tùy theo entity

## Services

Service layer xử lý business logic và validation.

### Chức Năng

- Validation dữ liệu đầu vào
- Xử lý business rules
- Chuyển đổi dữ liệu
- Gọi DAO để truy cập database
- Xử lý lỗi và throw business exceptions

### Danh Sách Services

1. **PhongService** - Business logic cho phòng
2. **KhachHangService** - Business logic cho khách hàng
3. **MatHangService** - Business logic cho mặt hàng
4. **DatPhongService** - Business logic cho đặt phòng
5. **PhieuDatService** - Business logic cho phiếu đặt
6. **NhapHangService** - Business logic cho nhập hàng
7. **ThongKeMHBanKemService** - Business logic cho thống kê
8. **NhaCungCapService** - Business logic cho nhà cung cấp

### Ví dụ: PhongService

**Các methods**:
- `getAllPhong()` - Lấy tất cả phòng
- `getPhongById(maPhong)` - Lấy phòng theo ID
- `getPhongTrong()` - Lấy danh sách phòng trống
- `createPhong(phongData)` - Tạo phòng mới (có validation)
- `updatePhong(maPhong, phongData)` - Cập nhật phòng
- `updateTrangThaiPhong(maPhong, trangThai)` - Cập nhật trạng thái
- `deletePhong(maPhong)` - Xóa phòng
- `validatePhongData(phongData, isUpdate)` - Validate dữ liệu

**Validation rules**:
- Tên phòng: Bắt buộc, không được để trống
- Loại phòng: Bắt buộc, phải là VIP/Thường/Đặc biệt
- Sức chứa: Bắt buộc, phải là số nguyên dương
- Giá giờ: Bắt buộc, phải là số không âm
- Trạng thái: Phải là TRONG/DANG_SU_DUNG/BAO_TRI

## Controllers

Controller layer xử lý HTTP requests và responses.

### Chức Năng

- Nhận HTTP requests từ routes
- Gọi service để xử lý business logic
- Xử lý HTTP status codes
- Trả về JSON responses
- Xử lý errors và trả về error messages

### Danh Sách Controllers

1. **PhongController** - Xử lý requests liên quan đến phòng
2. **KhachHangController** - Xử lý requests liên quan đến khách hàng
3. **MatHangController** - Xử lý requests liên quan đến mặt hàng
4. **DatPhongController** - Xử lý requests liên quan đến đặt phòng
5. **PhieuDatController** - Xử lý requests liên quan đến phiếu đặt
6. **NhapHangController** - Xử lý requests liên quan đến nhập hàng
7. **ThongKeMHBanKemController** - Xử lý requests liên quan đến thống kê
8. **NhaCungCapController** - Xử lý requests liên quan đến nhà cung cấp

### Cấu Trúc Controller

Mỗi controller có các methods tương ứng với HTTP methods:
- `getAllXxx(req, res)` - GET /api/xxx
- `getXxxById(req, res)` - GET /api/xxx/:id
- `createXxx(req, res)` - POST /api/xxx
- `updateXxx(req, res)` - PUT /api/xxx/:id
- `deleteXxx(req, res)` - DELETE /api/xxx/:id
- Các methods đặc biệt khác

### Response Format

**Success Response**:
```json
{
  "success": true,
  "data": { /* ... */ }
}
```

**Error Response**:
```json
{
  "success": false,
  "message": "Error message"
}
```

## Routes

Routes định nghĩa các API endpoints.

### Chức Năng

- Định nghĩa URL paths
- Map HTTP methods đến controller methods
- Inject database connection vào controller

### Danh Sách Routes

1. **phongRoutes** - `/api/phong`
2. **khachHangRoutes** - `/api/khach-hang`
3. **matHangRoutes** - `/api/mat-hang`
4. **datPhongRoutes** - `/api/dat-phong`
5. **phieuDatRoutes** - `/api/phieu-dat`
6. **nhapHangRoutes** - `/api/nhap-hang`
7. **thongKeRoutes** - `/api/thong-ke`
8. **nhaCungCapRoutes** - `/api/nha-cung-cap`

### Cấu Trúc Route

```javascript
function createXxxRoutes(db) {
  const controller = new XxxController(db);
  
  router.get('/', (req, res) => controller.getAllXxx(req, res));
  router.get('/:id', (req, res) => controller.getXxxById(req, res));
  router.post('/', (req, res) => controller.createXxx(req, res));
  router.put('/:id', (req, res) => controller.updateXxx(req, res));
  router.delete('/:id', (req, res) => controller.deleteXxx(req, res));
  
  return router;
}
```

## Middleware

Hiện tại middleware folder còn trống, có thể thêm:
- Authentication middleware
- Authorization middleware
- Logging middleware
- Error handling middleware
- Request validation middleware

## Error Handling

### Service Layer
- Throw business errors với message rõ ràng
- Validation errors được throw với message cụ thể

### Controller Layer
- Catch errors từ service
- Trả về HTTP status codes phù hợp:
  - 200: Success
  - 201: Created
  - 400: Bad Request (validation errors)
  - 404: Not Found
  - 500: Internal Server Error

### Global Error Handler
- Xử lý các lỗi không được catch
- Trả về error response chuẩn

## Dependencies

```json
{
  "express": "^4.18.2",
  "mysql2": "^3.6.5",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

## Environment Variables

Tạo file `.env` trong thư mục `BE/`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=NhaHangKaraoke
DB_USER=root
DB_PASSWORD=your_password
PORT=3001
NODE_ENV=development
```

