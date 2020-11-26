$(function () {
    //1.添加 表单验证规则
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'

        ],
        samepwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新旧密码不能一样哦~~~~'
            }
        },
        confirmpwd: function (value) {
            if (value != $('[name=newPwd]').val()) {
                return '确认密码和新密码不一样哦'
            }
        }
    });

    // 2.为表单添加提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        // 提交数据 到接口 完成更新密码
        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            data: $(this).serialize(),
            success(res) {
                // b.如果不成功，则退出函数
                if (res.status != 0) return layui.layer.msg(res.message);
                //c.如果成功，则清空token, 并且跳转到login.html
                layer.msg('res.message', {
                    icon: 1,
                    time: 1500 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    localStorage.removeItem('token');
                    window.top.location = '/login.html'
                });

            }


        })

    })

})