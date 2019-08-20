/*自己封装的一些比较小的一些方法*/
$.fn.extend({
    // 设置元素高宽
    genWidthAndHeight: function (width, height) {
        this.css({
            width: width,
            height: height
        });
    },
});