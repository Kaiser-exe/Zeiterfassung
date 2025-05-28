import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: 'localhost',     // or your MySQL host
    user: 'root',
    password: 'root',
    database: 'zeiterfassung',
    waitForConnections: true,
    connectionLimit: 10,
});

export default db;