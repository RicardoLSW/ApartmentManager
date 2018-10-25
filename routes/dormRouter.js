/**
 * @name dorm_info数据表操作路由
 * @author 骆顺旺
 * @version 1.0
 */

const router = require("express").Router(),
    Dorm_infoService = require("../services/Dorm_infoService"),
    body = require("body-parser"),
    MessageBox = require("../utils/MessageBox"),
    Dorm_info = require("../model/Dorm_info"),
    Dormadmin_infoService = require("../services/Dormadmin_infoService");

router.use(body.json());
router.use(body.urlencoded({ extended: false }));

router.get("/addDorm", async (req, resp) => {
    let result = await new Dormadmin_infoService().dormadmin_list();
    let dorm_info = Object.entries(new Dorm_info());
    resp.render("dorm/addDorm", { dorm_info, result });
})

router.get("/dorm_list", async (req, resp) => {
    try {
        let result = await new Dorm_infoService().dorm_list();
        resp.render("dorm/dorm_list", { result });
    } catch (error) {
        MessageBox.showAndBack("服务器错误!", resp);
    }
})

router.post("/doAddDorm", async (req, resp) => {
    try {
        let flag = await new Dorm_infoService().doAddDorm(req.body);
        if (flag) {
            MessageBox.showAndRedirect("添加成功!", "", resp);
        }
        else {
            MessageBox.showAndBack("添加失败!", resp);
        }
    } catch (error) {
        MessageBox.showAndBack("服务器错误!", resp);
    }
})

module.exports = router;