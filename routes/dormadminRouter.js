/**
 * @name dormadmin_info数据表的路由
 * @author 骆顺旺
 * @version 1.0
 */

const router = require("express").Router(),
    body = require("body-parser"),
    MessageBox = require("../utils/MessageBox"),
    Dormadmin_infoService = require("../services/Dormadmin_infoService");

router.get("/addDormadmin", (req, resp) => {
    resp.render("dormadmin/addDormadmin");
})

module.exports = router;
