/**
 * @name student_info数据表操作对象
 * @author 骆顺旺
 * @version 1.0
 */

const BaseService = require("./BaseService"),
    ObjectHelper = require("../utils/ObjectHelper");

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
    queryList({ s_id, s_name, s_sex }) {
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let selectStr = `SELECT * FROM ${this.tableName} WHERE isDel=0`;
            let str = "";
            if (!ObjectHelper.isNullAndUndefined(s_id)) {
                str += ` AND s_id LIKE "%${s_id}%"`;
            }
            if (!ObjectHelper.isNullAndUndefined(s_name)) {
                str += ` AND s_name LIKE "%${s_name}%"`;
            }
            if (!ObjectHelper.isNullAndUndefined(s_sex)) {
                str += ` AND s_sex="${s_sex}"`;
            }
            selectStr += str;
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
    delStudent({ s_id }) {
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let delStr = `UPDATE ${this.tableName} SET isDel=1 WHERE s_id=?`;
            conn.query(delStr, [s_id], (err, result) => {
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
    delAllStudent(s_idArr) {
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let delStr = `UPDATE ${this.tableName} SET isDel=1 WHERE s_id IN (${new Array(s_idArr.length).fill("?").toString()})`;
            conn.query(delStr, s_idArr, (err, result) => {
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
}

module.exports = Studeng_infoService;