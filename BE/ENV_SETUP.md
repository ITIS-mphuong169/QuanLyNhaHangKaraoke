# Hướng Dẫn Tạo File .env cho MySQL

## Bước 1: Tạo file .env

Trong thư mục `BE/`, tạo file `.env`:

```bash
cd BE
touch .env
```

## Bước 2: Copy nội dung sau vào file .env

```env
# Database Configuration (MySQL)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=NhaHangKaraoke
DB_USER=root
DB_PASSWORD=Phuong.chechoww1

# Server Configuration
PORT=3001
NODE_ENV=development
```

## Lưu ý

- File `.env` đã được thêm vào `.gitignore` nên sẽ không bị commit lên git
- Không chia sẻ file `.env` với người khác vì chứa thông tin nhạy cảm
- Đảm bảo database `NhaHangKaraoke` đã được tạo trước khi chạy
- Đảm bảo đã chạy file `schema.sql` để tạo các bảng

## Test Kết Nối

Sau khi tạo file `.env`, chạy:

```bash
cd BE
npm install
node test-db.js
```

Nếu thấy thông báo "✅ Kết nối database thành công!" → Đã kết nối thành công!
