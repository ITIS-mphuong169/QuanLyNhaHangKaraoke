# Tổng Quan Dự Án

## Giới Thiệu

Hệ thống Quản Lý Nhà Hàng Karaoke là một ứng dụng web toàn diện được xây dựng để quản lý các hoạt động của nhà hàng karaoke, bao gồm:

- Quản lý phòng karaoke
- Quản lý đặt phòng và phiếu đặt
- Quản lý khách hàng
- Quản lý mặt hàng bán kèm
- Quản lý nhập hàng và nhà cung cấp
- Quản lý hóa đơn và thanh toán
- Thống kê doanh thu và mặt hàng

## Công Nghệ Sử Dụng

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **mysql2** - MySQL driver

### Frontend
- **React** - UI framework
- **React Router** - Routing
- **CSS** - Styling

## Cấu Trúc Dự Án

```
nha-hang-karaoke/
├── BE/                    # Backend (Node.js/Express)
│   └── src/
│       ├── entities/      # Các thực thể (Entity)
│       ├── dao/           # Data Access Object layer
│       ├── services/      # Business logic layer
│       ├── controllers/   # Controller layer
│       ├── routes/        # API routes
│       ├── middleware/    # Middleware
│       └── config/        # Cấu hình
│
├── FE/                    # Frontend (React)
│   └── src/
│       ├── components/    # Các component tái sử dụng
│       ├── pages/         # Các trang/giao diện chính
│       ├── services/      # API services
│       └── utils/         # Utilities
│
├── DTB/                   # Database
│   ├── schemas/           # Database schemas
│   └── migrations/        # Database migrations
│
└── docs/                  # Tài liệu dự án
```

## Kiến Trúc Hệ Thống

Hệ thống được xây dựng theo **kiến trúc 3 lớp** (3-Tier Architecture):

1. **Presentation Layer (Frontend)**
   - React components và pages
   - Xử lý giao diện người dùng
   - Giao tiếp với backend qua REST API

2. **Business Logic Layer (Backend Services)**
   - Xử lý business logic
   - Validation dữ liệu
   - Xử lý nghiệp vụ

3. **Data Access Layer (DAO)**
   - Tương tác trực tiếp với database
   - Thực hiện các thao tác CRUD

## Luồng Xử Lý Request

```
Client (Frontend)
    ↓
Routes (API Endpoints)
    ↓
Controller (Xử lý HTTP request/response)
    ↓
Service (Business logic & Validation)
    ↓
DAO (Data Access)
    ↓
Database (MySQL)
```

## Các Module Chính

1. **Quản Lý Phòng** - Quản lý thông tin phòng karaoke
2. **Quản Lý Đặt Phòng** - Xử lý đặt phòng và phiếu đặt
3. **Quản Lý Khách Hàng** - Quản lý thông tin khách hàng
4. **Quản Lý Mặt Hàng** - Quản lý mặt hàng bán kèm
5. **Quản Lý Nhập Hàng** - Xử lý nhập hàng từ nhà cung cấp
6. **Quản Lý Hóa Đơn** - Xử lý hóa đơn và thanh toán
7. **Thống Kê** - Báo cáo và thống kê

## Tài Liệu Chi Tiết

- [Kiến Trúc Hệ Thống](./01-KienTruc.md)
- [Backend Documentation](./02-Backend.md)
- [Frontend Documentation](./03-Frontend.md)
- [Database Documentation](./04-Database.md)
- [API Documentation](./05-API.md)
- [Hướng Dẫn Cài Đặt](./06-CaiDat.md)
- [Hướng Dẫn Phát Triển](./07-PhatTrien.md)

## Tác Giả

**Mai Thị Phượng** - B22DCCN641

