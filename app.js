/**
 * @name 公寓管理系统入口文件
 * @author 骆顺旺
 */

const express = require("express"),
    http = require("http"),
    template = require("express-art-template"),
    path = require("path"),
    session = require("express-session");

const adminRouter = require("./routes/adminRouter"),
    dormadminRouter = require("./routes/dormadminRouter"),
    dormRouter = require("./routes/dormRouter");

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
        if (req.path == "/admin/login" || req.path == "/admin/checkLogin") {
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

//登录页
app.get("/", (req, resp) => {
    resp.redirect("/admin/login");
})

server.listen(8888, () => {
    console.log("服务器启动成功！");
})