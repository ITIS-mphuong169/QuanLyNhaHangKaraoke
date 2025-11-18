# Kiến Trúc Hệ Thống

## Tổng Quan Kiến Trúc

Hệ thống được xây dựng theo mô hình **3-Tier Architecture** (Kiến trúc 3 lớp), đảm bảo tính tách biệt giữa các lớp và dễ dàng bảo trì, mở rộng.

## Sơ Đồ Kiến Trúc

```
┌─────────────────────────────────────────────────────────┐
│                  PRESENTATION LAYER                      │
│                    (Frontend - React)                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  Pages   │  │Components│  │ Services │              │
│  └──────────┘  └──────────┘  └──────────┘              │
└──────────────────────┬───────────────────────────────────┘
                       │ HTTP/REST API
                       │
┌──────────────────────▼───────────────────────────────────┐
│                  APPLICATION LAYER                        │
│                   (Backend - Express)                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  Routes  │  │Controller │  │ Services │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│                                                           │
│  ┌─────────────────────────────────────────┐            │
│  │         Business Logic Layer             │            │
│  │  - Validation                           │            │
│  │  - Business Rules                       │            │
│  │  - Data Transformation                  │            │
│  └─────────────────────────────────────────┘            │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   DATA ACCESS LAYER                       │
│                      (DAO Layer)                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │   DAO    │  │ Entities  │  │ Database │              │
│  └──────────┘  └──────────┘  └──────────┘              │
└───────────────────────────────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                    DATABASE LAYER                         │
│                      (MySQL)                             │
└───────────────────────────────────────────────────────────┘
```

## Chi Tiết Các Lớp

### 1. Presentation Layer (Frontend)

**Vai trò**: Giao diện người dùng, hiển thị dữ liệu và xử lý tương tác

**Thành phần**:
- **Pages**: Các trang chính của ứng dụng
- **Components**: Các component tái sử dụng
- **Services**: API service để giao tiếp với backend

**Công nghệ**: React, React Router

### 2. Application Layer (Backend)

#### 2.1. Routes Layer
- Định nghĩa các API endpoints
- Xử lý HTTP methods (GET, POST, PUT, DELETE, PATCH)
- Điều hướng request đến controller tương ứng

#### 2.2. Controller Layer
- Nhận request từ routes
- Xử lý HTTP request/response
- Gọi service để xử lý business logic
- Trả về response cho client

#### 2.3. Service Layer (Business Logic)
- Xử lý business logic
- Validation dữ liệu đầu vào
- Xử lý các quy tắc nghiệp vụ
- Chuyển đổi dữ liệu
- Gọi DAO để truy cập database

### 3. Data Access Layer (DAO)

**Vai trò**: Tương tác trực tiếp với database

**Thành phần**:
- **DAO Classes**: Các lớp truy cập dữ liệu
- **Entities**: Các lớp đại diện cho dữ liệu

**Chức năng**:
- Thực hiện các thao tác CRUD
- Xây dựng và thực thi SQL queries
- Xử lý kết quả từ database

### 4. Database Layer

**Vai trò**: Lưu trữ dữ liệu

**Công nghệ**: MySQL

**Cấu trúc**:
- Tables: Các bảng dữ liệu
- Relationships: Quan hệ giữa các bảng
- Constraints: Ràng buộc dữ liệu

## Luồng Xử Lý Request

### Ví dụ: Tạo phòng mới

```
1. User nhập thông tin phòng trên Frontend
   ↓
2. Frontend gọi API: POST /api/phong
   ↓
3. Routes nhận request và điều hướng đến PhongController
   ↓
4. Controller gọi PhongService.createPhong()
   ↓
5. Service thực hiện:
   - Validate dữ liệu
   - Tạo Entity object
   - Gọi PhongDAO.create()
   ↓
6. DAO thực hiện SQL INSERT
   ↓
7. Database lưu dữ liệu
   ↓
8. Kết quả trả về ngược lại qua các lớp
   ↓
9. Frontend nhận response và cập nhật UI
```

## Nguyên Tắc Thiết Kế

### 1. Separation of Concerns (SoC)
- Mỗi lớp có trách nhiệm riêng biệt
- Không có sự phụ thuộc chéo giữa các lớp

### 2. Single Responsibility Principle (SRP)
- Mỗi class/function chỉ có một trách nhiệm
- Controller chỉ xử lý HTTP
- Service chỉ xử lý business logic
- DAO chỉ truy cập database

### 3. Dependency Injection
- Database connection được inject vào các lớp
- Dễ dàng test và thay đổi implementation

### 4. Error Handling
- Mỗi lớp xử lý lỗi phù hợp với trách nhiệm của nó
- Service throw business errors
- Controller catch và trả về HTTP status codes phù hợp

## Cấu Trúc Thư Mục

### Backend
```
BE/src/
├── config/          # Cấu hình (database, environment)
├── entities/        # Entity classes
├── dao/             # Data Access Objects
├── services/        # Business logic services
├── controllers/     # HTTP controllers
├── routes/          # API routes
└── middleware/      # Express middleware
```

### Frontend
```
FE/src/
├── components/      # Reusable components
├── pages/           # Page components
├── services/        # API services
└── utils/           # Utility functions
```

## Lợi Ích Của Kiến Trúc Này

1. **Dễ bảo trì**: Code được tổ chức rõ ràng, dễ tìm và sửa
2. **Dễ mở rộng**: Thêm tính năng mới không ảnh hưởng đến code cũ
3. **Dễ test**: Có thể test từng lớp độc lập
4. **Tái sử dụng**: Các component/service có thể tái sử dụng
5. **Tách biệt**: Frontend và Backend độc lập, có thể phát triển song song

