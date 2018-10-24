/**
 * @name admin_info用户账户密码数据表操作
 * @author 骆顺旺
 * @version 1.0
 * @requires BaseService
 */

const BaseService = require("./BaseService");

class Admin_infoService extends BaseService {
    constructor() {
        super("admin_info");
    }
    checkLogin({ userName, userPwd, userType }) {
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let selectStr = `SELECT * FROM ${this.tableName} WHERE userName=? AND userPwd=? AND userType=?`;
            conn.query(selectStr, [userName, userPwd, userType], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    let flag = result.length == 1 ? true : false;
                    resolve(flag);
                }
                conn.end();
            })
        })
    }
}

module.exports = Admin_infoService;