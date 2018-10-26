/**
 * @name student_info数据表操作路由
 * @author 骆顺旺
 * @version 1.0
 */

const router = require("express").Router(),
    Student_infoService = require("../services/Student_infoService"),
    body = require("body-parser"),
    MessageBox = require("../utils/MessageBox"),
    ObjectHelper = require("../utils/ObjectHelper"),
    Student_info = require("../model/Student_info"),
    Dorm_infoService = require("../services/Dorm_infoService"),
    multer = require("multer"),
    fs = require("fs"),
    path = require("path");

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
        let result = await new Student_infoService().student_list();
        resp.render("student/student_list", { result });
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

module.exports = router;