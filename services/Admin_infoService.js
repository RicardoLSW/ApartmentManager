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
            userType = userType || "超级管理员";
            let selectStr = `SELECT * FROM ${this.tableName} WHERE userName=? AND userPwd=? AND userType=?`;
            conn.query(selectStr, [userName, userPwd, userType], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
                conn.end();
            })
        })
    }
    checkOpenid(openid) {
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let selectStr = `SELECT * FROM ${this.tableName} WHERE isDel=0 AND openid=?`;
            conn.query(selectStr, [openid], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
                conn.end();
            })
        })
    }
    bindOldUser(model) {
        return super.updateData(model);
    }
    rejester(model) {
        return super.insertData(model);
    }
}
module.exports = Admin_infoService;