/**
 * @name 对象帮助类
 * @author 骆顺旺
 * @version 1.0
 */

class ObjectHelper {
    /**
     * @name 验证值是否为空
     * @param {*} k 要验证的值
     */
    static isNullAndUndefined(k) {
        if (k != null && k != "" && k != undefined) {
            return false;
        }
        else {
            return true;
        }
    }
}

module.exports = ObjectHelper;