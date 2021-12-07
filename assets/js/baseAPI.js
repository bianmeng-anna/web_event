// 注：每次调用$.get()  $.post()  $.ajax()时 会先调用这个函数
// 调用$.ajaxPrefilter
// 在这个函数中可以拿到提供给ajax的配置对象

$.ajaxPrefilter(function(options) {

    //发起ajax之前 统一拼接url
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url);
})