/**
 * @name 数据库操作帮助类
 * @author 骆顺旺
 * @version 1.0
 * @requires mysql
 */
const mysql = require("mysql");
class DBHelper {
    getConn() {
        let conn = mysql.createConnection({
            host: "127.0.0.1",
            port: 3306,
            user: "root",
            password: "123456",
            database: "apartmentmanager",
            multipleStatements:true
        });
        conn.connect();
        return conn;
    }
}

module.exports = DBHelper;