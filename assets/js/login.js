// 入口函数
$(function () {
  // 1.点击登录页面a标签
  $('#link_login').on('click', function () {
    $('.login-box').hide();
    $('.reg-box').show();
  })
  // 点击注册页面的a链接
  $('#link_reg').on('click', function () {
    $('.login-box').show();
    $('.reg-box').hide();
  })


  // 2.为 layui添加 登录校验规则
  // layui.all.js中有一个layui对象{form:......} 可以通过它的verify方法注册自定义校验规则
  layui.form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'

    ],
    repwd: function (pwd2) {
      // 1.获取密码框密码
      let pwd1 = $('.reg-box [name=password]').val();
      // 2.比较两个密码是否相同
      if (pwd1 !== pwd2) return '两次输入密码不一致'

    }
  });

  // 3.注册表单提交事件
  // let baseUrl = 'http://ajax.frontend.itheima.net';
  $('#regForm').on('submit', function (e) {
    e.preventDefault();
    let dataStr = $(this).serialize();
    $.ajax({
      url: 'http://ajax.frontend.itheima.net/api/reguser',
      method: 'POST',
      data: dataStr,
      success(res) {
        // 不论成功与否，都显示提示消息
        layui.layer.msg(res.message);
        // 注册出错
        if (res.status !== 0) return;

        $('#regForm')[0].reset();
        $('#link_reg').click();

      }

    })


  });


  //监听登录表单的提交事件

  $('#loginForm').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      url: 'http://ajax.frontend.itheima.net/api/login',
      method: 'POST',
      data: $(this).serialize(),
      success(res) {
        layui.layer.msg(res.message);
        if (res.status !== 0) return;
        localStorage.setItem('token', res.token)
        location.href = '/index.html'


      }
    })

  })
}) 