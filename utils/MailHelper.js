/**
 * @name 发送邮件帮助类
 * @author 骆顺旺
 * @version 1.0
 */

const nodemailer = require("nodemailer");

class MailHelper {
    sendToMail(userEmail) {
        return new Promise((resolve, reject) => {
            let mail = nodemailer.createTransport({
                service: "qq",
                auth: {
                    user: "1043009478@qq.com",
                    pass: "snebvvhhtjlobfdb"
                }
            });
            mail.sendMail({
                from: "1043009478@qq.com",
                to: userEmail,
                subject: "公寓管理系统",
                text: "本次注册验证码是：" + parseInt(Math.random() * 9999)
            }, (err, info) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(info);
                }
            })
        })
    }
}

module.exports = MailHelper;