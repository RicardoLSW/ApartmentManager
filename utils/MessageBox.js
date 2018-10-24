/**
 * @name 弹窗信息对象
 * @author 骆顺旺
 * @version 1.0
 */

class MessageBox {
    /**
     * @name 弹窗并返回
     * @param {String} msg 要弹窗的信息
     * @param {Object} resp 服务器对象
     */
    static showAndBack(msg, resp) {
        resp.send(`<script>alert("${msg}");history.back();</script>`);
    }
    /**
     * @name 弹窗并跳转到指定地址
     * @param {String} msg 要弹窗的信息
     * @param {String} url 要跳转的地址
     * @param {Object} resp 服务器对象
     */
    static showAndRedirect(msg, url, resp) {
        resp.send(`<script>alert("${msg}");location.href = "${url}";</script>`);
    }
}

module.exports = MessageBox;