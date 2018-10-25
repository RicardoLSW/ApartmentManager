/**
 * @name dormadmin_info数据表操作对象
 * @author 骆顺旺
 * @version 1.0
 */

const BaseService = require("./BaseService");

class Dormadmin_infoService extends BaseService {
    constructor() {
        super("dormadmin_info");
    }
    /**
     * @name 新增宿管
     * @param {Object} model 宿管信息对象
     */
    doAddDormadmin(model) {
        return new Promise((resolve, reject) => {
            let values = Object.values(model);
            let conn = super.getConn();
            let insertSql = super.createInsertSql(model);
            conn.query(insertSql, values, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    let flag = result.affectedRows > 0 ? true : false;
                    resolve(flag);
                }
                conn.end();
            })
        })
    }
    /**
     * @name 宿管列表查询
     */
    dormadmin_list() {
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let selectStr = `SELECT * FROM ${this.tableName} WHERE isDel=0`;
            conn.query(selectStr, [], (err, result) => {
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
    /**
     * @name 删除宿管
     * @param {*} param0 宿管id
     */
    delDormadmin({ da_id }) {
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let delStr = `UPDATE ${this.tableName} SET isDel=1 WHERE da_id=?`;
            conn.query(delStr, [da_id], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    let flag = result.affectedRows > 0 ? true : false;
                    resolve(flag);
                }
                conn.end();
            })
        })
    }
    delAllDormadmin(da_idArr) {
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let delStr = `UPDATE ${this.tableName} SET isDel=1 WHERE da_id IN (${new Array(da_idArr.length).fill("?").toString()})`;
            conn.query(delStr, da_idArr, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    let flag = result.affectedRows > 0 ? true : false;
                    resolve(flag)
                }
                conn.end();
            })
        })
    }
}

module.exports = Dormadmin_infoService;