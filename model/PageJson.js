/**
 * @name Ajax传输对象
 * @author 骆顺旺
 * @version 1.0
 */

class PageJson {
    constructor(status, msg, data) {
        this.status = status;
        this.msg = msg;
        this.data = data;
    }
}

module.exports = PageJson;