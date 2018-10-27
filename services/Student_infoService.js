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

    /**
     * @name 学生列表
     */
    student_list() {
        return super.dataList();
    }

    /**
     * @name 新增学生
     * @param {Object} mdoel 学生信息模型
     */
    doAddStudent(model) {
        return super.insertData(model);
    }

    /**
     * @name 修改学生信息
     */
    upStudent(model) {
        return super.updateData(model);
    }

    /**
     * @name 学生信息查询
     * @param {Object} param0 学生信息
     */
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

    /**
     * @name 删除学生信息
     */
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

    /**
     * @name 批量删除学生
     * @param {Array} s_idArr 选中的学生数组
     */
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