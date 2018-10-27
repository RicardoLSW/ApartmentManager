/**
 * @name student_info数据表操作对象
 * @author 骆顺旺
 * @version 1.0
 */

const BaseService = require("./BaseService");

class Studeng_infoService extends BaseService {
    constructor() {
        super("student_info");
    }
    student_list() {
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
    doAddStudent(model) {
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let values = Object.values(model);
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
    upStudent(model) {
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let values = Object.values(model);
            let updateStr = super.createUpdateSql(model);
            conn.query(updateStr, values.slice(1).concat(values.slice(0, 1)), (err, result) => {
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
}

module.exports = Studeng_infoService;