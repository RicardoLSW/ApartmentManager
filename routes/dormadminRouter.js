/**
 * @name dormadmin_info数据表的路由
 * @author 骆顺旺
 * @version 1.0
 */

const router = require("express").Router(),
    body = require("body-parser"),
    MessageBox = require("../utils/MessageBox"),
    Dormadmin_infoService = require("../services/Dormadmin_infoService"),
    Dormadmin_info = require("../model/dormadmin_info"),
    PageJson = require("../model/PageJson");

router.use(body.json());
router.use(body.urlencoded({ extended: false }));

//新增宿管页面
router.get("/addDormadmin", (req, resp) => {
    let dormadin_info = Object.entries(new Dormadmin_info());
    resp.render("dormadmin/addDormadmin", { dormadin_info });
})

//执行新增宿管
router.post("/doAddDormadmin", async (req, resp) => {
    try {
        let flag = await new Dormadmin_infoService().doAddDormadmin(req.body);
        if (flag) {
            MessageBox.showAndRedirect("添加成功!", "dormadmin_list", resp);
        }
        else {
            MessageBox.showAndBack("添加失败!", resp);
        }
    } catch (error) {
        MessageBox.showAndBack("服务器错误!", resp);
    }
})

//宿管列表
router.get("/dormadmin_list", async (req, resp) => {
    try {
        let dormadin_info = Object.entries(new Dormadmin_info());
        let result = await new Dormadmin_infoService().dormadmin_list();
        resp.render("dormadmin/dormadmin_list", { result, dormadin_info });
    } catch (error) {
        MessageBox.showAndBack("服务器错误!" + error, resp);
    }
})

//删除一个
router.get("/delDormadmin", async (req, resp) => {
    try {
        let flag = await new Dormadmin_infoService().delDormadmin(req.query);
        if (flag) {
            let pageJson = new PageJson("success", "删除成功!");
            resp.json(pageJson);
        }
        else {
            let pageJson = new PageJson("error", "删除失败!");
            resp.json(pageJson);
        }
    } catch (error) {
        let pageJson = new PageJson("error", "服务器错误!");
        resp.json(pageJson);
    }
})

//批量删除
router.get("/delAllDormadmin", async (req, resp) => {
    try {
        let da_idArr = req.query.da_idArr.split("-");
        console.log(da_idArr);
        let flag = await new Dormadmin_infoService().delAllDormadmin(da_idArr);
        if (flag) {
            let pageJson = new PageJson("success", "批量删除成功!");
            resp.json(pageJson);
        }
        else {
            let pageJson = new PageJson("error", "批量删除失败!");
            resp.json(pageJson);
        }
    } catch (error) {
        let pageJson = new PageJson("error", "服务器错误!");
        resp.json(pageJson);
    }
})

router.get("/queryList", async (req, resp) => {

})

module.exports = router;
