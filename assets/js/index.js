$(function () {
    // 获取用户的基本信息
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 1.在dom树 创建完后 开始执行
        success(res) {
            console.log(res);
            if (res.status != 0) return layui.layer.msg(res.message);
            // 渲染洪湖信息头像
            renderAvatar(res.data)

        }

    });

    // 渲染用户信息函数...........................................................
    function renderAvatar(usrData) {
        // a. 先获取用户名（昵称/登录名）
        let usrName = usrData.nickname || usrData.username;


        // b.设置给welcomme span标签
        $('#welcome').html(usrName);

        // c.渲染头像
        if (usrData.user_pic != null) {
            // 有图片头像
            $('.layui-nav-img').attr('src', usrData.user_pic).show();
            // 隐藏文字头像
            $('.text-avater').hide();
        } else {
            // 没有图片头像，使用文本头像
            $('.layui-nav-img').hide();
            // 获取名字首字母 大写
            let firstChar = usrName[0].toUpperCase();
            // 设置文字并显示
            $('.text-avater').text(firstChar).show();


        }

    };

    // 退出按钮函数

    $('#btnLogout').on('click', function () {
        // 弹出确认框
        layui.layer.confirm('您确认退出系统吗？',
            { icon: 3, title: '提示' },
            function (index) {
                // 删除 localStorage中的 token值
                localStorage.removeItem('token');
                // 跳转到 login.html
                location.href = '/login.html'

                layer.close(index);
            });

    })


})