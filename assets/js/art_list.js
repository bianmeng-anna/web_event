$(function() {
    // 定义一个查询参数对象，请求数据时
    // 需要将请求参数对象提交到服务器
    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
            var dt = new Date(date);
            var y = dt.getFullYear();
            var m = addZero(dt.getMonth() + 1);
            var d = addZero(dt.getDate());
            var hh = addZero(dt.getHours())
            var mm = addZero(dt.getMinutes())
            var ss = addZero(dt.getSeconds())
            return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
        }
        // 补零函数
    function addZero(n) {
        return n > 9 ? n : '0' + n;
    }
    var q = {
        pagenum: 3, // 页码值，默认请求第一页数据
        pagesize: 2, // 每页显示几条
        cate_id: '', // 文章分类id
        state: '' // 文章发布状态

    }
    var layer = layui.layer
    var laypage = layui.laypage;
    // var template = require('template')

    var form = layui.form
    initTable()
    initCate()
        // 获取文章数据列表的信息
    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取数据失败')
                }
                // 成功后，使用模板引擎渲染数据
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderpage(res.total)
            }
        })
    }

    // 初始化文章分类的方法
    function initCate() {

        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取数据失败')
                }
                // 调用模板引擎渲染可项
                const htmlStr = template('tpl-cate', res)
                console.log(htmlStr);
                $('[name=cate_id]').html(htmlStr)
                    // 通知layui，重新渲染表单区域ui结构
                form.render()
            }

        })
    }

    // 为筛选表单绑定submit事件
    $('#form-search').on('submit', function(e) {
        e.preventDefault()
            // 获取表单中选中的值
        var cate_id = $('[name=cate_id]').val()
        var status = $('[name=state]').val()
            // 为查询对象q中对应的属性赋值
        q.cate_id = cate_id
        q.state = status
            // 根据最新筛选条件，重新渲染表格数据
        initTable()
    })

    // 定义渲染分页的方法
    function renderpage(total) {
        // 调用laypage方法来渲染结构
        laypage.render({
            elem: 'boxPage', // 分页窗口标签id
            count: 10, // 总的条数
            limit: q.pagesize, // 每页显示条数
            curr: q.pagenum, // 默认页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 10, 20],
            // 分页发生切换，就会触发jump回调
            // 触发jump一：点击页码时
            // 2.调用laypage.render()方法会触发
            jump: function(obj, first) {
                // 可以通过过first值来判断是通过哪种方式触发的
                // console.log(obj.curr);
                // 把最新页码值赋值给q.pagenum
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                    // initTable()
                if (!first) {
                    initTable()
                }
            }
        })
    }

    // 通过代理方式为删除按钮绑定点击事件
    $('tbody').on('click', '#btn_delete', function() {
        // 获取删除按钮的个数
        var leng = $('#btn_delete').length
        var id = $(this).attr('[data-id]')
        layer.confirm('是否要删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                        // 当数据删除完成后需要判断当页是否还有剩余数据
                        // 如没有数据，则页码值-1 
                        // 再重新调用initTable方法
                    if (leng === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                    layer.close(index);
                }
            })


        });
    })
})