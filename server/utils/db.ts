import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',     // or your MySQL host
    user: 'root',
    password: 'root',
    database: 'zeiterfassung',
    waitForConnections: true,
    connectionLimit: 10,
});

export default pool;