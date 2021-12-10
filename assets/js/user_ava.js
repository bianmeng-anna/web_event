$(function() {
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#btnChoose').on('click', function() {
        $('#file').click()
    })

    // 给图片改变路径事件
    $('#file').on('change', function(e) {
        // console.log(e);
        var fileList = e.target.files
            // console.log(fileList);
        if (fileList.length === 0) {
            return layui.layer.msg('请选择照片')
        }
        // 1.拿到用户选择的文件
        var file = e.target.files[0]
            // 2.将文件转化为路径
        var ImgURL = URL.createObjectURL(file)
            // 3.重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', ImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })

    $('#btnUpload').on('click', function() {
            // 4. 将裁剪后的图片，输出为文件
            var dataURL = $image
                .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                    width: 400,
                    height: 280
                })
                .toDataURL('image/png')

            $.ajax({
                method: 'POST',
                url: '/my/update/avatar',
                data: {
                    avatar: dataURL
                },
                success: function(res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('请求失败')
                    }
                    layui.layer.msg('更新头像成功')
                        // 重新渲染头像
                    window.parent.geiuserInfo()
                }
            })
        })
        // ## 3. 更换裁剪的图片

    // 1. 拿到用户选择的文件

    // `
    //     ``
    //     js
    //     
    //         // ``
    //         // `

    //     // 2. 根据选择的文件，创建一个对应的 URL 地址：

    //     // `
    //     //     ``
    //     //     js
    //     var newImgURL = URL.createObjectURL(file)
    //         //     ``
    //         //     `

    //     // 3. 先`
    //     //     销毁 `旧的裁剪区域，再`
    //     //     重新设置图片路径 `，之后再`
    //     //     创建新的裁剪区域 `：

    //     // `
    //     //     ``
    //     //     js
    //     $image
    //         .cropper('destroy') // 销毁旧的裁剪区域
    //         .attr('src', newImgURL) // 重新设置图片路径
    //         .cropper(options) // 重新初始化裁剪区域
    //         // ``
    //         // `




    //     // ## 4. 将裁剪后的图片，输出为文件

    //     // `
    //     //     ``
    //     //     js
    //     $image
    //         .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    //             width: 400,
    //             height: 280
    //         })
    //         .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
    //             // 得到文件对象后，进行后续的操作
    //         })
})