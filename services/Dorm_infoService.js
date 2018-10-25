/**
 * @name doem_info数据表操作对象
 * @author 骆顺旺
 * @version 1.0
 */

const BaseService = require("./BaseService");

class Dorm_infoService extends BaseService {
    constructor() {
        super("dorm_info");
    }
    /**
     * @name 新增宿舍
     */
    doAddDorm(model) {
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let values = Object.values(model)
            let insertStr = super.createInsertSql(model);
            conn.query(insertStr, values, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    let flag = result.affectedRows == 1 ? true : false;
                    resolve(flag);
                }
                conn.end();
            })
        })
    }
    /**
     * @name 宿舍列表
     */
    dorm_list() {
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let selectStr = `SELECT * FROM ${this.tableName} WHERE isDel=false`;
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
}

module.exports = Dorm_infoService;