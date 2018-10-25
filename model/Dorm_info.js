/**
 * @name dorm_info 模型
 * @author 骆顺旺
 * @version 1.0
 */

class Dorm_info {
    constructor(d_id, d_type, d_num, da_id) {
        this.d_id = d_id || "编号";
        this.d_type = d_type || "类型";
        this.d_num = d_num || "人数";
        this.da_id = da_id || "宿管编号";
    }
}

module.exports = Dorm_info;