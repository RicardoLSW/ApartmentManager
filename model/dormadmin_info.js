/**
 * @name dormadmin_info 模型
 * @author 骆顺旺
 */

class Dormadmin_info {
    constructor(da_id, da_name, da_sex, da_tel) {
        this.da_id = da_id || "编号";
        this.da_name = da_name || "姓名";
        this.da_sex = da_sex || "性别";
        this.da_tel = da_tel || "电话";
    }
}

module.exports = Dormadmin_info;