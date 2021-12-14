$(function() {
    var layer = layui.layer
    var form = layui.form
        // 定义加载文章分类的方法
    initCate()
    initEditor()

    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                    // 一定要记得调用form.render()方法
                form.render()
            }
        })
    }


    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 为选择封按钮 绑定点击事件处理函数
    $('#btnChooseImage').on('click', function() {
        $('#coverFile').click()
    })

    // 监听covefile的change事件，获取用户选择的文件
    $('#coverFile').on('change', function(e) {
        var file = e.target.files
            // 判断用户是否选择了文件
        if (file.length === 0) {
            return
        }
        // 根据文件创建对应的url
        var newUrl = URL.createObjectURL(file)
            // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newUrl) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 定义文章的发布状态
    var art_state = '已发布'
    $('#btnSave2').on('click', function() {
            art_state = '草稿'
        })
        // 1.为表单绑定submit提交事件
    $('#form-pub').on('submit', function(e) {
            e.preventDefault()
                // 2.基于form表单 快速创建formdata对象
            var fd = new FormData($(this)[0])
                // 3.将文章发布状态存在fd中

            fd.append('state', art_state)
                // 4.将封面裁剪过后的图片，输出为一个文件对象
            $image
                .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                    width: 400,
                    height: 280
                })
                .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                    // 得到文件对象后，进行后续的操作
                    // 5.将文件对象存储到fd中
                    fd.append('cover_img', blob)
                    publishArticle(fd)
                })
        })
        // 定义一个发布文章的方法
    function publishArticle(fd) {
        $.ajax({
            method: 'post',
            url: '/my/article/add',
            // 注：如果是formDate格式的数据，必须添加以下两个配置项
            data: fd,
            contentType: false,
            processDate: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('发布失败')
                }
                layer.msg('发布成功')
                    // 成功后，跳转到文章列表页面
                location.href = '/article/art_list.html'
            }

        })
    }
})