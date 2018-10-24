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

router.use(body.json());
router.use(body.urlencoded({ extended: false }));

router.get("/login", (req, resp) => {
    resp.render("admin/login");
})

router.post("/checkLogin", async (req, resp) => {
    try {
        let userType = req.body.userType;
        let flag = await new Admin_infoService().checkLogin(req.body);
        if (flag) {
            req.session.userInfo = req.body;
            if (userType == '超级管理员') {
                MessageBox.showAndRedirect("登陆成功！", "adminIndex", resp);
            }
        }
    } catch (error) {
        MessageBox.showAndBack("服务器错误", resp);
    }
})

router.get("/adminIndex", (req, resp) => {
    let userInfo = req.session.userInfo;
    resp.render("admin/adminIndex", { userInfo, menuConfig });
})

module.exports = router;