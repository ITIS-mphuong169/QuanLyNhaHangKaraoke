# Hướng Dẫn Cài Đặt

## Yêu Cầu Hệ Thống

- **Node.js**: >= 14.x
- **npm**: >= 6.x (hoặc yarn)
- **MySQL**: >= 5.7 (hoặc >= 8.0)
- **Git**: Để clone repository

## Cài Đặt Node.js

### macOS
```bash
# Sử dụng Homebrew
brew install node

# Hoặc tải từ https://nodejs.org/
```

### Windows
Tải và cài đặt từ: https://nodejs.org/

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install nodejs npm
```

## Cài Đặt MySQL

### macOS
```bash
# Sử dụng Homebrew
brew install mysql
brew services start mysql
```

### Windows
Tải và cài đặt từ: https://dev.mysql.com/downloads/mysql/

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql
```

## Cài Đặt Dự Án

### 1. Clone Repository

```bash
git clone <repository-url>
cd nha-hang-karaoke
```

### 2. Cài Đặt Backend Dependencies

```bash
cd BE
npm install
```

### 3. Cài Đặt Frontend Dependencies

```bash
cd ../FE
npm install
```

## Cấu Hình Database

### 1. Tạo Database

Kết nối MySQL:
```bash
mysql -u root -p
```

Trong MySQL shell:
```sql
CREATE DATABASE IF NOT EXISTS NhaHangKaraoke 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE NhaHangKaraoke;
exit;
```

### 2. Chạy Schema SQL

Từ thư mục project:
```bash
mysql -u root -p NhaHangKaraoke < DTB/schemas/schema.sql
```

Hoặc trong MySQL shell:
```sql
USE NhaHangKaraoke;
source DTB/schemas/schema.sql;
```

### 3. Tạo File .env cho Backend

Tạo file `.env` trong thư mục `BE/`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=NhaHangKaraoke
DB_USER=root
DB_PASSWORD=your_password_here
PORT=3001
NODE_ENV=development
```

**Lưu ý**: Thay `your_password_here` bằng mật khẩu MySQL của bạn.

### 4. Test Database Connection

```bash
cd BE
node test-db.js
```

Nếu kết nối thành công, bạn sẽ thấy:
```
✅ Đã kết nối MySQL database thành công!
   Database: NhaHangKaraoke
   Host: localhost:3306
```

## Chạy Ứng Dụng

### 1. Chạy Backend

Mở terminal 1:
```bash
cd BE
npm start
```

Backend sẽ chạy tại: `http://localhost:3001`

Bạn sẽ thấy:
```
Server đang chạy tại http://localhost:3001
   Đã kết nối MySQL database thành công!
   Database: NhaHangKaraoke
   Host: localhost:3306
```

### 2. Chạy Frontend

Mở terminal 2:
```bash
cd FE
npm start
```

Frontend sẽ tự động mở tại: `http://localhost:3000`

## Kiểm Tra Cài Đặt

### 1. Kiểm Tra Backend

Mở browser và truy cập:
```
http://localhost:3001/api/health
```

Bạn sẽ thấy:
```json
{
  "status": "OK",
  "message": "Server đang hoạt động"
}
```

### 2. Kiểm Tra Frontend

Mở browser và truy cập:
```
http://localhost:3000
```

Bạn sẽ thấy trang đăng nhập hoặc trang chủ của ứng dụng.

### 3. Kiểm Tra Database

Kết nối MySQL và kiểm tra:
```sql
USE NhaHangKaraoke;
SHOW TABLES;
```

Bạn sẽ thấy danh sách các bảng đã được tạo.

## Troubleshooting

### Lỗi: Cannot connect to MySQL

**Nguyên nhân**:
- MySQL chưa được khởi động
- Thông tin kết nối trong `.env` sai
- MySQL không cho phép kết nối từ localhost

**Giải pháp**:
1. Kiểm tra MySQL đang chạy:
   ```bash
   # macOS
   brew services list
   
   # Linux
   sudo systemctl status mysql
   ```

2. Kiểm tra file `.env` có đúng thông tin không

3. Kiểm tra MySQL user có quyền truy cập:
   ```sql
   GRANT ALL PRIVILEGES ON NhaHangKaraoke.* TO 'root'@'localhost';
   FLUSH PRIVILEGES;
   ```

### Lỗi: Port already in use

**Nguyên nhân**: Port 3001 hoặc 3000 đã được sử dụng

**Giải pháp**:
1. Tìm process đang sử dụng port:
   ```bash
   # macOS/Linux
   lsof -i :3001
   ```

2. Kill process:
   ```bash
   kill -9 <PID>
   ```

3. Hoặc đổi port trong `.env` (backend) hoặc `package.json` (frontend)

### Lỗi: Module not found

**Nguyên nhân**: Dependencies chưa được cài đặt

**Giải pháp**:
```bash
# Backend
cd BE
rm -rf node_modules
npm install

# Frontend
cd FE
rm -rf node_modules
npm install
```

### Lỗi: Database schema not found

**Nguyên nhân**: File schema.sql không tồn tại hoặc đường dẫn sai

**Giải pháp**:
1. Kiểm tra file `DTB/schemas/schema.sql` có tồn tại không
2. Kiểm tra đường dẫn khi chạy lệnh

## Cấu Hình Môi Trường

### Development

File `.env` trong `BE/`:
```env
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_NAME=NhaHangKaraoke
DB_USER=root
DB_PASSWORD=your_password
PORT=3001
```

### Production

File `.env` trong `BE/`:
```env
NODE_ENV=production
DB_HOST=your_production_db_host
DB_PORT=3306
DB_NAME=NhaHangKaraoke
DB_USER=your_production_user
DB_PASSWORD=your_production_password
PORT=3001
```

## Cài Đặt Bổ Sung

### Nodemon (Development)

Để tự động restart server khi code thay đổi:

```bash
cd BE
npm install --save-dev nodemon
```

Sau đó chạy:
```bash
npm run dev
```

### React DevTools

Cài đặt extension React DevTools cho browser để debug React app.

## Next Steps

Sau khi cài đặt thành công:

1. Đọc [Tổng Quan Dự Án](./00-TongQuan.md)
2. Đọc [Kiến Trúc Hệ Thống](./01-KienTruc.md)
3. Đọc [API Documentation](./05-API.md)
4. Bắt đầu phát triển!

## Hỗ Trợ

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra lại các bước cài đặt
2. Xem phần Troubleshooting
3. Kiểm tra logs trong console
4. Liên hệ tác giả: Mai Thị Phượng - B22DCCN641

