/**
 * @name 
 */

const router = require("express").Router();
const body = require("body-parser");

router.get("/login", (req, resp) => {
    resp.render("admin/login");
})

module.exports = router;