$(function () {
    // 获取用户的基本信息
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token')

        },
        success(res) {
            console.log(res);

            if (res.status !== 0) return layui.layer.msg(res.message)
            renderAvatar(res.data)
        }

    });
    // 渲染用户头像
    function renderAvatar(user) {
        //1. 获取用户名称
        var name = user.nickname || user.username;
        console.log(name);

        $('#welcome').html(name);
        // 图片不为空
        if (user.user_pic !== null) {

            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        } else {

            $('.layui-nav-img').hide();
            let first = name[0].toUpperCase()
            $('.text-avatar').html(first).show();

        }
    };

    $('#btnLogout').on('click', function () {

        layui.layer.confirm('确定退出登录吗',
            { icon: 3, title: '提示' },
            function (index) {
                // 清空本地的储存中的 token
                localStorage.removeItem('token')
                // 重新跳转到登录页面
                location.href = '/login.html'
                // 关闭confirm询问框
                layer.close(index);
            })

    });



})