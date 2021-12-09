// 注：每次调用$.get()  $.post()  $.ajax()时 会先调用这个函数
// 调用$.ajaxPrefilter
// 在这个函数中可以拿到提供给ajax的配置对象

$.ajaxPrefilter(function(options) {

    //发起ajax之前 统一拼接url
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url);
    // 统一为有权限的接口设置hearder响应头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || '',

        }
    }

    // 全局统一挂载 complete 回调函数
    // 不论成功还是失败 都会调用complete函数
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //  res.responseJSON=RES
            // 1.强制清空token
            localStorage.removeItem('token')
                // 2.强制跳转设置登陆链接
            location.href = '/login.html'
                // location.href
        }
    }

})