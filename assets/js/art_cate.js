$(function() {
    // 获取文章分类列表
    initArtCateList()
    var layer = layui.layer
    var form = layui.form


    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                // console.log(res.data);
                var htmlStr = template('tpl_table', res)
                $('tbody').html(htmlStr)
            }

        })
    }
    // 添加类别框
    var indexadd = null;
    $('#btnAddCate').on('click', function() {
            indexadd = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '添加文章分类',
                content: $('#dialog_add').html()
            })

        })
        // 通过代理的形式为表单添加提交事件
    $('body').on('submit', '#form_add', function(e) {
        e.preventDefault()
        console.log('ok')
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('添加失败')

                }
                layer.msg('添加成功')
                initArtCateList()
                    // 关闭对应弹出层
                layer.close(indexadd)
            }
        })
    })
    var indexEdit = null
        // 通过代理形式 为按钮btn_edit绑定点击事件  编辑功能
    $('tbody').on('click', '.btn_edit', function() {
        // 弹出一个修改文章分类的层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog_edit').html()
        })

        var id = $(this).attr('data-id')

        // 发起请求 获取对应的数据
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,
            success: function(res) {
                // res.data.html()
                form.val('form_edit', res.data)
            }
        })
    })

    $('body').on('submit', '#form_edit', function(e) {
            e.preventDefault()
            $.ajax({
                method: 'post',
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('添加失败')

                    }
                    layer.msg('添加成功')
                    layer.close(indexEdit)
                    initArtCateList()
                }
            })

        })
        // 通过代理的形式，为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function(res) {
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                    method: 'get',
                    url: '/my/article/deletecate/' + id,
                    success: function(res) {
                        if (res.status !== 0) {
                            return layer.msg('删除分类失败')
                        }
                        layer.msg('删除分类成功')

                        layer.close(index);
                        initArtCateList()
                    }
                })
                // 提示文本

        });
    })

})