$(function() {
    // 点击去注册帐号
    $('#link_reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        // 点击去登陆的链接
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 校验输入框
    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
        // 通过form.verify()函数自定义校验规则
    form.verify({
        //处定义了一个密码的校验规则
        // [\S]非空格校验
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            // 通过形参value确认拿到的是密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次相等的判断
            // 如判断失败，return则弹出一个消息即可
            var pwd = $('#form_reg [name=password]').val()
            if (pwd !== value) {
                return '请输入相同密码'
            }
        }

    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                // return console.log(res.message);
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登陆 ')
                // 注册成功，模拟人的点击行为  调用click点击
            $('#link_login').click()
        })
    })

    // 监听登陆表单的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/login',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败');
                }
                layer.msg('登陆成功')
                    // 将登陆成功后的token 保存到localStorage中
                localStorage.setItem('token', res.token)
                    // console.log(res.token);
                    // 跳转到后台主页
                location.href = '/index.html'
            }
        })

    })

})