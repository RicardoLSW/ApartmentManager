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
    Dormadmin_infoService = require("../services/Dormadmin_infoService"),
    PageJson = require("../model/PageJson");

router.use(body.json());
router.use(body.urlencoded({ extended: false }));

router.get("/addDorm", async (req, resp) => {
    let result = await new Dormadmin_infoService().dormadmin_list();
    let dorm_info = Object.entries(new Dorm_info());
    resp.render("dorm/addDorm", { dorm_info, result });
})

router.get("/dorm_list", async (req, resp) => {
    try {
        let da_id = await new Dormadmin_infoService().dormadmin_list();
        let dorm_info = Object.entries(new Dorm_info());
        let result = await new Dorm_infoService().dorm_list();
        resp.render("dorm/dorm_list", { result, dorm_info, da_id });
    } catch (error) {
        MessageBox.showAndBack("服务器错误!", resp);
    }
})

router.post("/doAddDorm", async (req, resp) => {
    try {
        let flag = await new Dorm_infoService().doAddDorm(req.body);
        if (flag) {
            MessageBox.showAndRedirect("添加成功!", "dorm_list", resp);
        }
        else {
            MessageBox.showAndBack("添加失败!", resp);
        }
    } catch (error) {
        MessageBox.showAndBack("服务器错误!", resp);
    }
})

router.post("/upDorm", async (req, resp) => {
    try {
        let flag = await new Dorm_infoService().upDorm(req.body);
        if (flag) {
            MessageBox.showAndRedirect("修改成功!", "dorm_list", resp);
        }
        else {
            MessageBox.showAndBack("修改失败!", resp);
        }
    } catch (error) {
        MessageBox.showAndBack("服务器错误!" + error, resp);
    }
})

router.get("/delDorm", async (req, resp) => {
    try {
        let flag = await new Dorm_infoService().delDorm(req.query);
        console.log(req.query);
        if (flag) {
            let pageJson = new PageJson("success", "删除成功!");
            resp.json(pageJson);
        }
        else {
            let pageJson = new PageJson("error", "删除失败!");
            resp.json(pageJson);
        }
    } catch (error) {
        MessageBox.showAndBack("服务器错误!", resp);
    }
})

router.get("/delAllDorm", async (req, resp) => {
    try {
        let d_idArr = req.query.d_idArr.split("-");
        let flag = await new Dorm_infoService().delAllDorm(d_idArr);
        if (flag) {
            let pageJson = new PageJson("success", "批量删除成功!");
            resp.json(pageJson);
        }
        else {
            let pageJson = new PageJson("error", "批量删除失败!");
            resp.json(pageJson);
        }
    } catch (error) {
        MessageBox.showAndBack("服务器错误!", resp);
    }
})

router.get("/queryDormList", async (req, resp) => {
    try {
        let result = await new Dorm_infoService().queryDormList(req.query);
        resp.render("dorm/dorm_list", { result });
    } catch (error) {
        MessageBox.showAndBack("服务器错误!", resp);
    }
})

module.exports = router;