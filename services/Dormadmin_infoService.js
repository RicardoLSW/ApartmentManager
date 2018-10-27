/**
 * @name dormadmin_info数据表操作对象
 * @author 骆顺旺
 * @version 1.0
 */

const BaseService = require("./BaseService"),
    ObjectHelper = require("../utils/ObjectHelper");

class Dormadmin_infoService extends BaseService {
    constructor() {
        super("dormadmin_info");
    }

    /**
     * @name 新增宿管
     * @param {Object} model 宿管信息对象
     */
    doAddDormadmin(model) {
        return super.insertData(model);
    }

    /**
     * @name 宿管列表查询
     */
    dormadmin_list() {
        return super.dataList();
    }

    /**
     * @name 修改宿管信息
     * @param {Object} model 宿管信息对象
     */
    upDormadmin(model) {
        return super.updateData(model);
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

    /**
     * @name 批量删除宿管信息
     * @param {*} da_idArr 选中的宿管编号数组
     */
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

    /**
     * @name 查询功能
     * @param {*} param0 查询信息
     */
    queryList({ da_id, da_name, da_sex }) {
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let selectStr = `SELECT * FROM ${this.tableName} WHERE isDel=0`;
            let str = "";
            if (!ObjectHelper.isNullAndUndefined(da_id)) {
                str += ` AND da_id LIKE "%${da_id}%"`;
            }
            if (!ObjectHelper.isNullAndUndefined(da_name)) {
                str += ` AND da_name LIKE "%${da_name}%"`;
            }
            if (!ObjectHelper.isNullAndUndefined(da_sex)) {
                str += ` AND da_sex="${da_sex}"`;
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

module.exports = Dormadmin_infoService;