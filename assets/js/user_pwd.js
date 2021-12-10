$(function() {
    var form = layui.form
    var layer = layui.layer
        // 自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samepwd: function(value) {
            if (value === $('[name=oldpwd]').val()) {
                return '请输入不同密码'
            }
        },
        repwd: function(value) {
            if (value !== $('[name=newpwd]').val()) {
                return '密码不一致'
            }
        }
    })


    // 表单的提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('提交失败');

                }
                layer.msg('提交成功');
                // 成功后重置表单
                $('.layui-form')[0].reset()
                console.log(res);
            }
        })
    })
})