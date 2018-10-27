/**
 * @name student_info数据表操作路由
 * @author 骆顺旺
 * @version 1.0
 */

const router = require("express").Router(),
    Student_infoService = require("../services/Student_infoService"),
    body = require("body-parser"),
    MessageBox = require("../utils/MessageBox"),
    Student_info = require("../model/Student_info"),
    Dorm_infoService = require("../services/Dorm_infoService"),
    multer = require("multer"),
    fs = require("fs"),
    path = require("path"),
    PageJson = require("../model/PageJson");

router.use(body.json());
router.use(body.urlencoded({ extended: false }));

let upload = multer({
    dest: path.join(__dirname, "../public/upimages")
})

router.get("/addStudent", async (req, resp) => {
    let student_info = Object.entries(new Student_info());
    let dorm_info = await new Dorm_infoService().dorm_list();
    resp.render("student/addStudent", { student_info, dorm_info });
})

router.get("/student_list", async (req, resp) => {
    try {
        let student_info = Object.entries(new Student_info());
        let dorm_info = await new Dorm_infoService().dorm_list();
        let result = await new Student_infoService().student_list();
        resp.render("student/student_list", { result, student_info, dorm_info });
    } catch (error) {
        MessageBox.showAndBack("服务器错误!", resp);
    }
})

router.post("/doAddStudent", upload.single("s_photo"), async (req, resp) => {
    let file = req.file;
    let extName = file.originalname.substr(file.originalname.lastIndexOf("."));
    let newPath = file.path + extName;
    fs.renameSync(file.path, newPath);
    req.body.s_photo = "/public/upimages/" + file.filename + extName;
    try {
        let flag = await new Student_infoService().doAddStudent(req.body);
        if (flag) {
            MessageBox.showAndRedirect("添加成功", "student_list", resp);
        }
        else {
            MessageBox.showAndBack("添加失败!", resp);
        }
    } catch (error) {
        MessageBox.showAndBack("服务其错误!" + error, resp);
    }
})

router.post("/upStudent", upload.single("s_photo"), async (req, resp) => {
    let file = req.file;
    let extName = file.originalname.substr(file.originalname.lastIndexOf("."));
    let newPath = file.path + extName;
    fs.renameSync(file.path, newPath);
    req.body.s_photo = "/public/upimages/" + file.filename + extName;
    try {
        let flag = await new Student_infoService().upStudent(req.body);
        if (flag) {
            MessageBox.showAndRedirect("修改成功!", "student_list", resp);
        }
        else {
            MessageBox.showAndBack("修改失败!", resp);
        }
    } catch (error) {
        MessageBox.showAndBack("服务器错误!" + error, resp);
    }
})

router.get("/queryList", async (req, resp) => {
    try {
        let result = await new Student_infoService().queryList(req.query);
        resp.render("student/student_list", { result });
    } catch (error) {
        MessageBox.showAndBack("服务器错误!" + error, resp);
    }
})

router.get("/delStudent", async (req, resp) => {
    try {
        let flag = await new Student_infoService().delStudent(req.query);
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

router.get("/delAllStudent", async (req, resp) => {
    try {
        let s_idArr = req.query.s_idArr.split("-");
        let flag = await new Student_infoService().delAllStudent(s_idArr);
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

module.exports = router;