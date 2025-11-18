/**
 * Database Configuration
 * Mô tả: Cấu hình kết nối database MySQL
 */
require('dotenv').config();
const mysql = require('mysql2/promise');

// Cấu hình database - Kết nối với database mySQL trên DataGrip
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Phuong.chechoww1',
  database: process.env.DB_NAME || 'NhaHangKaraoke', // Database name: NhaHangKaraoke
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  charset: 'utf8mb4'
});

// Test connection khi khởi động
pool.getConnection()
  .then(connection => {
    console.log('   Đã kết nối MySQL database thành công!');
    console.log(`   Database: ${connection.config.database}`);
    console.log(`   Host: ${connection.config.host}:${connection.config.port}`);
    connection.release();
  })
  .catch(err => {
    console.error('❌ Lỗi kết nối database:', err.message);
    console.error('   Kiểm tra lại thông tin trong file .env');
  });

// Wrapper để sử dụng với async/await (tương thích với PostgreSQL syntax)
const query = async (text, params) => {
  const start = Date.now();
  try {
    // MySQL sử dụng ? thay vì $1, $2...
    // Chuyển đổi PostgreSQL placeholders sang MySQL
    let mysqlQuery = text;
    if (params && params.length > 0) {
      // Thay thế $1, $2, $3... thành ?
      mysqlQuery = text.replace(/\$(\d+)/g, '?');
    }
    
    const [rows, fields] = await pool.execute(mysqlQuery, params || []);
    const duration = Date.now() - start;
    
    // Trả về format tương tự PostgreSQL để tương thích với code hiện tại
    const result = {
      rows: rows,
      rowCount: rows.length,
      fields: fields
    };
    
    console.log('Query executed', { 
      text: mysqlQuery.substring(0, 100), 
      duration, 
      rows: result.rowCount 
    });
    
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

module.exports = { pool, query };

