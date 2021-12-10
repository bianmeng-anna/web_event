$(function() {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6之间'
            }
        }

    })
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // form.val()来快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }
    $('#btnReset').on('click', function(e) {
        // 阻止表单默认重置事件
        e.preventDefault()
        initUserInfo()
    })

    // 监听提交表单事件 发起请求 监听用户的更新信息
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('信息提交失败')
                }
                layer.msg('更新数据成功')
                    // 调用父页面中方法，重新渲染用户头像和信息
                window.parent.geiuserInfo()
            }
        })
    })
})