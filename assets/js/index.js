$(function() {
    //获取用户信息
    geiuserInfo()
        // 1.点击退出按钮，实现退出功能
    $('#btnLogout').on('click', function() {
        var layer = layui.layer
        layer.confirm('确定退出登陆?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1.清空token
            localStorage.removeItem('token')
                // 2.跳回到登陆页
            location.href = '/login.html'

            layer.close(index);
        });
    })
})

function geiuserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // Headers就是请求头
        // headers: {
        //     Authorization: localStorage.getItem('token') || '',
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('请求失败');
            }
            //    调用渲染用户头像 renderAvatar
            renderAvatar(res.data)
            console.log(res);
        },

    })
}

// 渲染用户头像函数
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 3.渲染头像图片
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src', user.user_pic).show()
    } else {
        // 3.2 渲染、 文本头像
        // 展示第一个字母  并大写
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()
    }



}