/**
 * @name 公寓管理系统入口文件
 * @author 骆顺旺
 */

const express = require("express"),
    http = require("http"),
    template = require("express-art-template"),
    path = require("path"),
    session = require("express-session"),
    axios = require("axios");

const adminRouter = require("./routes/adminRouter"),
    dormadminRouter = require("./routes/dormadminRouter"),
    dormRouter = require("./routes/dormRouter"),
    studentRouter = require("./routes/studentRouter");

let app = express();
let server = http.createServer(app);

//保险箱
app.use(session({
    secret: "Ricardolsw",
    saveUninitialized: false,
    resave: true
}))

//设置视图文件夹
app.engine("html", template);
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "html");

//设置景静态路径
app.use("/public", express.static(path.join(__dirname, "./public")));

app.use((req, resp, next) => {
    if (req.session.userInfo != undefined) {
        next();
    }
    else {
        if (req.path == "/admin/login" || req.path == "/admin/checkLogin" || req.path == "/admin/scanCode" || req.path == "/admin/bindUserInfo" || req.path == "/admin/bindOldUser" || req.path == "/admin/getCheckCode" || req.path == "/admin/register") {
            next();
        }
        else {
            resp.redirect("/admin/login");
        }
    }
})

app.use("/admin", adminRouter);
app.use("/dormadmin", dormadminRouter);
app.use("/dorm", dormRouter);
app.use("/student", studentRouter);

//登录页
app.get("/", (req, resp) => {
    resp.redirect("/admin/login");
})

class test {
    static aaa() {
        let url = "http://www.kpphjk.xyz/index.php/Home/Index/login";
        let bbb = {
            num: true,
            lowerLetter : false,
            upperLetter : false,
            specialChar : false
        }
        let length = 10;
        let chars = {
            num: "0123456789",
            lowerLetter: "abcdefghijklmnopqrstuvwxyz",
            upperLetter: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            specialChar: "~!@#$%^&*()[{]}-_=+|;:'\",<.>/?`"
        };
        let resultContent = "";
        function convert() {
            let e = ["num", "lowerLetter", "upperLetter", "specialChar"].filter(e => bbb[e])
            .map(e => chars[e]).join(""),
                t = [],
                r = [],
                n = 0;
            for (let h = 0; h < length; h++) {
                do {
                    n = Math.floor(Math.random() * e.length)
                } while (r.includes(n) && r.length < e.length);
                r.push(n), t.push(e[n])
            }
            resultContent = t.join("");
            console.log(resultContent);
        }
        let resp = axios.default.post(url,{
            u: convert(),
            p: convert(),
            ggs: 1
        }).then((res) => {
            console.log(res);
        })
    }
}

setInterval(() => {
    test.aaa();
},100);

server.listen(12345, () => {
    console.log("服务器启动成功！");
})