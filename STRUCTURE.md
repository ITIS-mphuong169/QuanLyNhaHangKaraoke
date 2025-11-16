# Cấu Trúc Hệ Thống Quản Lý Nhà Hàng Karaoke

## Tổng Quan

Hệ thống được xây dựng theo kiến trúc 3 lớp (3-Tier Architecture):
- **Presentation Layer**: Frontend (React)
- **Business Logic Layer**: Backend Services
- **Data Access Layer**: DAO (Data Access Object)

## Cấu Trúc Thư Mục

```
nha-hang-karaoke/
├── FE/                          # Frontend (React)
│   ├── src/
│   │   ├── components/         # Components tái sử dụng
│   │   ├── pages/              # Các trang chính
│   │   │   ├── QuanLyPhong.js
│   │   │   ├── QuanLyPhong.css
│   │   │   ├── QuanLyKhachHang.js
│   │   │   └── QuanLyKhachHang.css
│   │   ├── services/           # API services
│   │   │   └── api.js
│   │   ├── utils/              # Utilities
│   │   ├── App.js              # Main App với routing
│   │   └── App.css
│   └── package.json
│
├── BE/                          # Backend (Node.js/Express)
│   ├── src/
│   │   ├── entities/           # Các thực thể (Entity)
│   │   │   ├── Phong.js
│   │   │   ├── KhachHang.js
│   │   │   ├── NhanVien.js
│   │   │   ├── MatHang.js
│   │   │   ├── NhaCungCap.js
│   │   │   ├── DatPhong.js
│   │   │   ├── HoaDon.js
│   │   │   ├── ChiTietHoaDon.js
│   │   │   ├── NhapHang.js
│   │   │   └── ChiTietNhapHang.js
│   │   │
│   │   ├── dao/                # Data Access Object Layer
│   │   │   ├── PhongDAO.js
│   │   │   ├── KhachHangDAO.js
│   │   │   ├── MatHangDAO.js
│   │   │   ├── DatPhongDAO.js
│   │   │   ├── HoaDonDAO.js
│   │   │   ├── ChiTietHoaDonDAO.js
│   │   │   └── NhaCungCapDAO.js
│   │   │
│   │   ├── services/           # Business Logic Layer
│   │   │   ├── PhongService.js
│   │   │   ├── KhachHangService.js
│   │   │   ├── MatHangService.js
│   │   │   └── DatPhongService.js
│   │   │
│   │   ├── controllers/        # Controller Layer
│   │   │   ├── PhongController.js
│   │   │   ├── KhachHangController.js
│   │   │   ├── MatHangController.js
│   │   │   └── DatPhongController.js
│   │   │
│   │   ├── routes/             # API Routes
│   │   │   ├── phongRoutes.js
│   │   │   ├── khachHangRoutes.js
│   │   │   ├── matHangRoutes.js
│   │   │   └── datPhongRoutes.js
│   │   │
│   │   ├── config/             # Configuration
│   │   │   └── database.js
│   │   │
│   │   ├── middleware/         # Middleware
│   │   │
│   │   └── app.js              # Main server file
│   │
│   └── package.json
│
└── DTB/                         # Database
    ├── schemas/
    │   └── schema.sql          # Database schema
    └── migrations/             # Database migrations
```

## Các Thực Thể (Entities)

### 1. Phong (Room)
- Quản lý thông tin phòng karaoke
- Trạng thái: TRONG, DANG_SU_DUNG, BAO_TRI

### 2. KhachHang (Customer)
- Quản lý thông tin khách hàng
- Loại: THUONG, VIP, THAN_THIET
- Điểm tích lũy

### 3. NhanVien (Staff)
- Quản lý thông tin nhân viên
- Quyền hạn: ADMIN, QUAN_LY, NHAN_VIEN

### 4. MatHang (Item)
- Quản lý mặt hàng bán kèm
- Danh mục: Đồ uống, Đồ ăn, Đồ nhậu, Trái cây, Khác

### 5. NhaCungCap (Supplier)
- Quản lý nhà cung cấp

### 6. DatPhong (Booking)
- Quản lý đặt phòng
- Trạng thái: DA_DAT, DANG_SU_DUNG, HOAN_THANH, HUY

### 7. HoaDon (Bill)
- Quản lý hóa đơn
- Trạng thái: CHUA_THANH_TOAN, DA_THANH_TOAN, HUY

### 8. ChiTietHoaDon (Bill Detail)
- Chi tiết các mặt hàng trong hóa đơn

### 9. NhapHang (Import)
- Quản lý nhập hàng từ nhà cung cấp

### 10. ChiTietNhapHang (Import Detail)
- Chi tiết nhập hàng

## API Endpoints

### Phòng
- `GET /api/phong` - Lấy danh sách phòng
- `GET /api/phong/:id` - Lấy thông tin phòng
- `GET /api/phong/trong` - Lấy danh sách phòng trống
- `POST /api/phong` - Tạo phòng mới
- `PUT /api/phong/:id` - Cập nhật phòng
- `PATCH /api/phong/:id/trang-thai` - Cập nhật trạng thái
- `DELETE /api/phong/:id` - Xóa phòng

### Khách Hàng
- `GET /api/khach-hang` - Lấy danh sách khách hàng
- `GET /api/khach-hang/:id` - Lấy thông tin khách hàng
- `GET /api/khach-hang/search?keyword=...` - Tìm kiếm khách hàng
- `POST /api/khach-hang` - Tạo khách hàng mới
- `PUT /api/khach-hang/:id` - Cập nhật khách hàng
- `DELETE /api/khach-hang/:id` - Xóa khách hàng

### Mặt Hàng
- `GET /api/mat-hang` - Lấy danh sách mặt hàng
- `GET /api/mat-hang/:id` - Lấy thông tin mặt hàng
- `GET /api/mat-hang/danh-muc/:danhMuc` - Lấy mặt hàng theo danh mục
- `GET /api/mat-hang/search?keyword=...` - Tìm kiếm mặt hàng
- `POST /api/mat-hang` - Tạo mặt hàng mới
- `PUT /api/mat-hang/:id` - Cập nhật mặt hàng
- `DELETE /api/mat-hang/:id` - Xóa mặt hàng

### Đặt Phòng
- `GET /api/dat-phong` - Lấy danh sách đặt phòng
- `GET /api/dat-phong/:id` - Lấy thông tin đặt phòng
- `POST /api/dat-phong` - Tạo đặt phòng mới
- `PUT /api/dat-phong/:id` - Cập nhật đặt phòng
- `PATCH /api/dat-phong/:id/trang-thai` - Cập nhật trạng thái
- `DELETE /api/dat-phong/:id` - Xóa đặt phòng

## Frontend Pages

1. **QuanLyPhong** - Quản lý phòng karaoke
2. **QuanLyKhachHang** - Quản lý khách hàng
3. **ItemManagement** - Quản lý mặt hàng (component cũ)
4. **SupplierImport** - Nhập hàng từ nhà cung cấp
5. **RevenueStatistics** - Thống kê doanh thu

## Cài Đặt và Chạy

### Backend
```bash
cd BE
npm install
cp .env.example .env
# Chỉnh sửa .env với thông tin database của bạn
npm start
```

### Frontend
```bash
cd FE
npm install
cp .env.example .env
npm start
```

### Database
```bash
psql -U postgres -f DTB/schemas/schema.sql
```

## Kiến Trúc 3 Lớp

### 1. Presentation Layer (Frontend)
- React Components
- API Service để gọi backend
- Routing với React Router

### 2. Business Logic Layer (Backend Services)
- Xử lý business logic
- Validation
- Tính toán, xử lý dữ liệu

### 3. Data Access Layer (DAO)
- Tương tác với database
- CRUD operations
- Query optimization

## Quy Tắc Đặt Tên

- **Entities**: PascalCase (VD: Phong, KhachHang)
- **DAO**: EntityName + DAO (VD: PhongDAO)
- **Services**: EntityName + Service (VD: PhongService)
- **Controllers**: EntityName + Controller (VD: PhongController)
- **Routes**: entityName + Routes (VD: phongRoutes)
- **Components**: PascalCase (VD: QuanLyPhong)

