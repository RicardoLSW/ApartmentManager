/**
 * @name 用户登录验证 Admin_info数据表的路由
 * @author 骆顺旺
 * @version 1.0
 */

const router = require("express").Router();
const body = require("body-parser");
const MessageBox = require("../utils/MessageBox");
const Admin_infoService = require("../services/Admin_infoService");
const menuConfig = require("../config/menuConfig");
const DingHelper = require("../utils/DingHelper");
const MailHelper = require("../utils/MailHelper");
const PageJson = require("../model/PageJson");

router.use(body.json());
router.use(body.urlencoded({ extended: false }));

router.get("/login", (req, resp) => {
    resp.render("admin/login");
})

router.get("/logOff", (req, resp) => {
    req.session.userInfo = undefined;
    resp.redirect("admin/login");
})

router.post("/checkLogin", async (req, resp) => {
    try {
        let userType = req.body.userType;
        let result = await new Admin_infoService().checkLogin(req.body);
        if (result.length == 1) {
            delete result[0].userPwd;
            req.session.userInfo = result[0];
            if (userType == '超级管理员') {
                MessageBox.showAndRedirect("登陆成功！", "adminIndex", resp);
            }
            else {
                MessageBox.showAndBack("当前用户页面暂未开放，敬请期待!", resp);
            }
        }
        else {
            MessageBox.showAndBack("用户名或密码错误!", resp);
        }
    } catch (error) {
        MessageBox.showAndBack("服务器错误" + error, resp);
    }
})

router.get("/adminIndex", (req, resp) => {
    let userInfo = req.session.userInfo;
    resp.render("admin/adminIndex", { userInfo, menuConfig });
})

router.get("/scanCode", async (req, resp) => {
    try {
        let { code } = req.query;
        let accesstoken = await DingHelper.getAccess_token();
        let { openid, persistent_code } = await DingHelper.getTmp_auth_code(accesstoken, code);
        let snstoken = await DingHelper.getSns_token(accesstoken, { openid, persistent_code });
        let DDuserInfo = await DingHelper.getUserInfo(snstoken);
        let userOpenid = DDuserInfo.user_info.openid;
        let result = await new Admin_infoService().checkOpenid(userOpenid);
        if (result.length < 1) {
            resp.redirect("/admin/bindUserInfo?userOpenid=" + userOpenid);
        }
        else if (result.length == 1) {
            delete result[0].userPwd;
            req.session.userInfo = result[0];
            MessageBox.showAndRedirect("登陆成功", "adminIndex", resp);
        }
        else {
            MessageBox.showAndBack("您的账号有问题，请联系管理员！", resp);
        }
    } catch (error) {
        MessageBox.showAndBack("服务器错误!" + error, resp);
    }
})

router.get("/bindUserInfo", async (req, resp) => {
    let { userOpenid } = req.query;
    let model = { openid: userOpenid };
    resp.render("admin/bindUserInfo", { model });
})

router.post("/bindOldUser", async (req, resp) => {
    try {
        let { userName, userPwd } = req.body;
        let result = await new Admin_infoService().checkLogin({ userName, userPwd })
        if (result.length == 1) {
            let flag = await new Admin_infoService().bindOldUser(req.body);
            if (flag) {
                delete result[0].userPwd;
                req.session.userInfo = result[0];
                MessageBox.showAndRedirect("绑定成功!", "adminIndex", resp);
            }
            else {
                MessageBox.showAndBack("绑定失败!", resp);
            }
        }
        else {
            MessageBox.showAndBack("用户名或密码错误!", resp);
        }
    } catch (error) {
        MessageBox.showAndBack("服务器错误!", resp);
    }
})

router.get("/getCheckCode", async (req, resp) => {
    try {
        let { userEmail } = req.query
        req.session.code = parseInt(Math.random() * 9999);
        let info = await new MailHelper().sendToMail(userEmail, req.session.code);
        let pageJson = new PageJson("success", "验证码发送成功");
        resp.json(pageJson);
    } catch (error) {
        let pageJson = new PageJson("error", "验证码发送失败");
        resp.json(pageJson);
    }
})

router.post("/register", async (req, resp) => {
    try {
        if (req.session.code == req.body.checkCode) {
            delete req.body.checkCode;
            let flag = await new Admin_infoService().rejester(req.body);
            if (flag) {
                delete req.body.userPwd;
                req.session.userInfo = req.body;
                MessageBox.showAndRedirect("注册成功！", "adminIndex", resp);
            }
            else {
                MessageBox.showAndBack("注册失败!", resp);
            }
        }
        else {
            MessageBox.showAndBack("验证码错误", resp);
        }
    } catch (error) {
        MessageBox.showAndBack("服务器错误!" + error, resp);
    }
})

module.exports = router;