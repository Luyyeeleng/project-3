$(function () {
    // 1.用layui 添加校验规则
    layui.form.verify({
        nickname: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'

        ],
    });

    //2.加载用户基本信息
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        success(res) {
            // 错误判断
            if (res.status != 0) return layui.layer.msg(res.message);
            // 使用layui快速为表单元素复制  将数据装入同名的表单元素中
            // 将对象中的属性值 设置给表单的同名表单元素
            layui.form.val('userForm', res.data);
        }
    });

    // 3.重置表单的数据
    $('#btnreset').on('click', function (e) {
        // 阻止默认重置行为
        e.preventDefault()

        //再加载用户基本信息
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success(res) {
                // 错误判断
                if (res.status != 0) return layui.layer.msg(res.message);
                // 使用layui快速为表单元素复制  将数据装入同名的表单元素中
                // 将对象中的属性值 设置给表单的同名表单元素
                layui.form.val('userForm', res.data);
            }
        })

    });


    // 4.点击提交表单按钮
    $('.layui-form').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $(this).serialize(),
            success(res) {
                // 不管成功与否，都显示消息
                layui.layer.msg(res.message)
                // 如果有错，停止函数执行
                if (res.status != 0) return;
                window.top.getUserInfo()
            }
        })
    });

})