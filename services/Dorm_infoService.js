/**
 * @name doem_info数据表操作对象
 * @author 骆顺旺
 * @version 1.0
 */

const BaseService = require("./BaseService"),
    ObjectHelper = require("../utils/ObjectHelper");

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
    /**
     * @name 修改宿舍信息
     * @param {*} model 宿舍信息模型
     */
    upDorm(model) {
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let values = Object.values(model);
            let insertStr = super.createUpdateSql(model);
            conn.query(insertStr, values.slice(1).concat(values.slice(0, 1)), (err, result) => {
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
    delDorm({ d_id }) {
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let delStr = `UPDATE ${this.tableName} SET isDel=1 WHERE d_id=?`;
            conn.query(delStr, [d_id], (err, result) => {
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
     * @name 批量删除宿舍
     * @param {*} d_idArr 选中的宿舍编号数组
     */
    delAllDorm(d_idArr) {
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let delStr = `UPDATE ${this.tableName} SET isDel=1 WHERE d_id IN (${new Array(d_idArr.length).fill("?").toString()})`;
            conn.query(delStr, d_idArr, (err, result) => {
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
    queryDormList({ d_id, d_num, d_type }) {
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let selectStr = `SELECT * FROM ${this.tableName} WHERE isDel=0`;
            let str = '';
            if (!ObjectHelper.isNullAndUndefined(d_id)) {
                str += ` AND d_id LIKE "%${d_id}%"`;
            }
            if (!ObjectHelper.isNullAndUndefined(d_num)) {
                str += ` AND d_num LIKE "%${d_num}%"`;
            }
            if (!ObjectHelper.isNullAndUndefined(d_type)) {
                str += ` AND d_type="${d_type}"`;
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
}

module.exports = Dorm_infoService;