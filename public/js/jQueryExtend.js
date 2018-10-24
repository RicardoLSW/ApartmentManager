/**
 * @name jQuery扩展对象
 * @author 骆顺旺
 */
!function ($) {
    /**
     * @name 输入框提示信息
     */
    $.fn.extend({
        inputTips: function () {
            $(this).each(function (index, element) {
                // element == this
                var text = $(this).parent().prev("label").text().trim();
                if (text == null || text == "" || text == undefined) {
                    text = $(this).data("tip");
                }
                $(this).attr("placeholder", "请输入" + text);
            });
        }
    })
    /**
     * @name 加载层loading动画
     */
    $(".btn-submit-loading").click(function (e) {
        // layer.load({shade:[0.4,"#000"]});
        layer.load(1, {
            shade: [0.1, '#fff'] //0.1透明度的白色背景
        });
    });
    /**
     * @name 功能暂未开放弹出信息
     */
    $("a[href='#']").click(function (e) {
        layer.msg("该功能暂未开放");
        return false
    });
    /**
     * @name 全选功能
     */
    $(".ckAll").click(function (e) {
        var flag = $(this).prop("checked");
        $("[name='ck']").prop("checked", flag);
    });
}(jQuery)