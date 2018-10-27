/**
 * @name 数据库执行语句对象
 * @author 骆顺旺
 * @version 1.0
 * @requires DBHelper
 */
const DBHelper = require("../utils/DBHelper");

class BaseService extends DBHelper {
    constructor(tableName) {
        super();
        this.tableName = tableName;
    }
    /**
     * @name 数据库插入语句
     * @param {Object} model 模型对象
     * @returns 返回数据库插入语句
     */
    createInsertSql(model) {
        let keys = Object.keys(model);
        let values = Object.values(model);
        let sqlStr = `INSERT INTO ${this.tableName} (${keys.toString()}) VALUES (${new Array(values.length).fill("?").toString()})`;
        return sqlStr;
    }
    /**
     * @name 数据库修改语句
     * @param {Object} model 模型对象
     * @returns 返回数据库修改语句
     */
    createUpdateSql(model) {
        let keys = Object.keys(model);
        let sqlStr = `UPDATE ${this.tableName} SET ${keys.slice(1).map(item => { return item += '=?' }).toString()} WHERE ${keys[0].toString()}=?`;
        return sqlStr;
    }
    /**
     * @name 插入数据
     */
    insertData(model) {
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let values = Object.values(model)
            let insertStr = this.createInsertSql(model);
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
     * @name 查询当前表数据列表
     */
    dataList() {
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
     * @name 修改数据
     */
    updateData(model) {
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let values = Object.values(model);
            let insertStr = this.createUpdateSql(model);
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
    /**
     * @name 查询已删除数据
     */
    dataListIsDel() {
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let selectStr = `SELECT * FROM ${this.tableName} WHERE isDel=1`;
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

module.exports = BaseService;