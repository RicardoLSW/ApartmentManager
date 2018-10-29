/**
 * 钉钉扫码帮助类
 */

const axios = require("axios");

class DingHelper {
    static async getAccess_token() {
        let url = "https://oapi.dingtalk.com/sns/gettoken?appid=dingoa7dutmgycytbiz51a&appsecret=4QjZlGtafbnmrkifWcO368TKIzslzrrCWhNgSB0Uf7SDixD86QPdy1UEUYtOKtXd";
        let resp = await axios.default.get(url);
        return resp.data.access_token;
    }
    static async getTmp_auth_code(access_token, tmp_auth_code) {
        let url = `https://oapi.dingtalk.com/sns/get_persistent_code?access_token=${access_token}`;
        let resp = await axios.default.post(url, { tmp_auth_code });
        let { openid, persistent_code } = resp.data;
        return { openid, persistent_code };
    }
    static async getSns_token(access_token, { openid, persistent_code }) {
        let url = `https://oapi.dingtalk.com/sns/get_sns_token?access_token=${access_token}`;
        let resp = await axios.default.post(url, {
            openid, persistent_code
        });
        return resp.data.sns_token;
    }
    static async getUserInfo(sns_token) {
        let url = `https://oapi.dingtalk.com/sns/getuserinfo?sns_token=${sns_token}`;
        let resp = await axios.default.get(url);
        return resp.data;
    }
}

module.exports = DingHelper;