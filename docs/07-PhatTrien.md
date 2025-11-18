# Hướng Dẫn Phát Triển

## Quy Trình Phát Triển

### 1. Tạo Feature Mới

#### Backend
1. Tạo Entity class trong `BE/src/entities/`
2. Tạo DAO class trong `BE/src/dao/`
3. Tạo Service class trong `BE/src/services/`
4. Tạo Controller class trong `BE/src/controllers/`
5. Tạo Routes trong `BE/src/routes/`
6. Đăng ký routes trong `BE/src/app.js`

#### Frontend
1. Tạo Page component trong `FE/src/pages/`
2. Tạo CSS file cho page
3. Thêm API methods trong `FE/src/services/api.js`
4. Thêm route trong `FE/src/App.js`

### 2. Coding Standards

#### Naming Conventions
- **Files**: PascalCase cho components (PhongController.js)
- **Classes**: PascalCase (PhongService)
- **Functions**: camelCase (getAllPhong)
- **Variables**: camelCase (phongData)
- **Constants**: UPPER_SNAKE_CASE (DB_HOST)

#### Code Structure
- Mỗi file một class/component
- Comment rõ ràng cho các functions
- Sử dụng async/await thay vì callbacks
- Error handling đầy đủ

### 3. Testing

#### Manual Testing
1. Test từng API endpoint
2. Test các tính năng trên frontend
3. Test các edge cases

#### Database Testing
```sql
-- Test queries
SELECT * FROM Phong WHERE trangThai = 'TRONG';
```

### 4. Git Workflow

```bash
# Tạo branch mới
git checkout -b feature/new-feature

# Commit changes
git add .
git commit -m "Add new feature"

# Push to remote
git push origin feature/new-feature
```

## Best Practices

### Backend

1. **Validation**: Luôn validate dữ liệu đầu vào trong Service layer
2. **Error Handling**: Throw errors với message rõ ràng
3. **Database**: Sử dụng prepared statements để tránh SQL injection
4. **Logging**: Log các operations quan trọng
5. **Code Reuse**: Tái sử dụng code khi có thể

### Frontend

1. **Components**: Tách components nhỏ, dễ tái sử dụng
2. **State Management**: Quản lý state hợp lý
3. **Error Handling**: Hiển thị error messages cho user
4. **Loading States**: Hiển thị loading khi fetch data
5. **Responsive**: Đảm bảo UI responsive

## Debugging

### Backend
- Sử dụng `console.log()` để debug
- Check logs trong terminal
- Sử dụng debugger trong IDE

### Frontend
- Sử dụng React DevTools
- Check Console trong browser
- Check Network tab để xem API calls

## Performance Optimization

### Database
- Tạo indexes cho các cột thường query
- Sử dụng JOIN thay vì multiple queries
- Sử dụng LIMIT cho pagination

### Backend
- Sử dụng connection pooling
- Cache dữ liệu thường dùng
- Optimize queries

### Frontend
- Lazy load components
- Optimize images
- Minimize re-renders

## Security

1. **SQL Injection**: Sử dụng prepared statements
2. **XSS**: Sanitize user input
3. **CORS**: Cấu hình CORS đúng
4. **Authentication**: Thêm authentication (chưa có)
5. **Validation**: Validate cả frontend và backend

## Deployment

### Backend
1. Set `NODE_ENV=production`
2. Build và start server
3. Sử dụng PM2 hoặc similar để quản lý process

### Frontend
1. Build production: `npm run build`
2. Deploy folder `build/` lên web server
3. Cấu hình reverse proxy nếu cần

## Tài Liệu Tham Khảo

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Node.js Documentation](https://nodejs.org/docs/)

## Liên Hệ

Mai Thị Phượng - B22DCCN641

