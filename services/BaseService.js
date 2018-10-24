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
    createInsertSql(model){
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
    createUpdateSql(model){
        let keys = Object.keys(model);
        let sqlStr = `UPDATE ${this.tableName} SET ${keys.slice(1).map(item=>{return item+='=?'}).toString()} WHERE ${keys[0].toString()}=?`;
        return sqlStr;
    }
}

module.exports = BaseService;