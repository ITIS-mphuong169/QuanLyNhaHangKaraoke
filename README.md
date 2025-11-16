# Hệ Thống Quản Lý Nhà Hàng Karaoke

Hệ thống quản lý toàn diện cho nhà hàng karaoke, được xây dựng theo kiến trúc 3 lớp rõ ràng.

## Cấu Trúc Dự Án

```
nha-hang-karaoke/
├── FE/                    # Frontend (React)
│   └── src/
│       ├── components/    # Các component tái sử dụng
│       ├── pages/         # Các trang/giao diện chính
│       ├── services/      # API services
│       └── utils/         # Utilities
│
├── BE/                    # Backend (Node.js/Express)
│   └── src/
│       ├── entities/      # Các thực thể (Entity)
│       ├── dao/           # Data Access Object layer
│       ├── services/      # Business logic layer
│       ├── controllers/   # Controller layer
│       ├── routes/        # API routes
│       ├── middleware/     # Middleware
│       └── config/        # Cấu hình
│
└── DTB/                   # Database
    ├── schemas/           # Database schemas
    └── migrations/        # Database migrations
```

## Các Thực Thể (Entities)

1. **Phong** - Phòng karaoke
2. **KhachHang** - Khách hàng
3. **NhanVien** - Nhân viên
4. **MatHang** - Mặt hàng bán kèm
5. **NhaCungCap** - Nhà cung cấp
6. **DatPhong** - Đặt phòng
7. **HoaDon** - Hóa đơn
8. **ChiTietHoaDon** - Chi tiết hóa đơn
9. **NhapHang** - Nhập hàng
10. **ChiTietNhapHang** - Chi tiết nhập hàng

## Cài Đặt

### Backend

```bash
cd BE
npm install
npm start
```

Backend sẽ chạy tại `http://localhost:3001`

### Frontend

```bash
cd FE
npm install
npm start
```

Frontend sẽ chạy tại `http://localhost:3000`

### Database (MySQL)

#### Bước 1: Cài đặt MySQL

**macOS:**
```bash
brew install mysql
brew services start mysql
```

**Windows/Linux:** Tải từ https://dev.mysql.com/downloads/mysql/

#### Bước 2: Tạo Database

```bash
# Kết nối MySQL
mysql -u root -p

# Trong MySQL shell:
CREATE DATABASE IF NOT EXISTS NhaHangKaraoke CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE NhaHangKaraoke;
exit;
```

#### Bước 3: Chạy Schema SQL

```bash
# Từ thư mục project
cd DTB/schemas
mysql -u root -p NhaHangKaraoke < schema.sql

# Hoặc trong MySQL shell:
mysql -u root -p
USE NhaHangKaraoke;
source schema.sql;
```

#### Bước 4: Tạo File .env

Tạo file `.env` trong thư mục `BE/`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=NhaHangKaraoke
DB_USER=root
DB_PASSWORD=Phuong.chechoww1
PORT=3001
NODE_ENV=development
```

#### Bước 5: Cài Đặt Dependencies và Test

```bash
cd BE
npm install
node test-db.js
```

Xem chi tiết tại: [BE/ENV_SETUP.md](./BE/ENV_SETUP.md)

## Cấu Hình

Tạo file `.env` trong thư mục BE:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=NhaHangKaraoke
DB_USER=root
DB_PASSWORD=Phuong.chechoww1
PORT=3001
NODE_ENV=development
```

Xem chi tiết tại: [BE/ENV_SETUP.md](./BE/ENV_SETUP.md)

## API Endpoints

### Phòng
- `GET /api/phong` - Lấy danh sách phòng
- `GET /api/phong/:id` - Lấy thông tin phòng
- `GET /api/phong/trong` - Lấy danh sách phòng trống
- `POST /api/phong` - Tạo phòng mới
- `PUT /api/phong/:id` - Cập nhật phòng
- `PATCH /api/phong/:id/trang-thai` - Cập nhật trạng thái
- `DELETE /api/phong/:id` - Xóa phòng

## Kiến Trúc

Hệ thống được xây dựng theo kiến trúc 3 lớp:

1. **Presentation Layer (Frontend)**: React components
2. **Business Logic Layer (Backend Services)**: Xử lý business logic
3. **Data Access Layer (DAO)**: Tương tác với database

Mỗi thực thể có đầy đủ:
- Entity class
- DAO class
- Service class
- Controller class
- Routes
- Frontend components

## Tác Giả

Mai Thị Phượng - B22DCCN641
