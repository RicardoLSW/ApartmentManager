/**
 * @name student_info模型
 * @author 骆顺旺
 * @version 1.0
 */

class Student_info {
    constructor(s_id, s_name, s_sex, s_age, s_tel, c_id, d_id, s_photo) {
        this.s_id = s_id || "学号";
        this.s_name = s_name || "姓名";
        this.s_sex = s_sex || "性别";
        this.s_age = s_age || "年龄";
        this.s_tel = s_tel || "电话";
        this.c_id = c_id || "班级";
        this.d_id = d_id || "宿舍";
        this.s_photo = s_photo || "照片";
    }
}

module.exports = Student_info;