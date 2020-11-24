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

        // 将用户名密码自动填充到登录表单中
        let uname = $('.reg-box [name=username]').val().trim();
        $('.login-box [name=username]').val(uname);
        let upwd = $('.reg-box [name=password]').val().trim();
        $('.login-box [name=password]').val(upwd);
        // 清空注册表单
        $('#regForm')[0].reset();
        //切换到登录div
        $('#link_reg').click();
      }

    })


  });



  // 4.注册表单提交事件
  $('#formLogin').on('submit', function (e) {
    // 阻止表单默认跳转行为
    e.preventDefault();
    // 获取登录表单数据
    let dataStr = $(this).serialize();
    // 异步提交到 登录接口
    $.ajax({
      url: 'http://ajax.frontend.itheima.net/api/login',
      method: 'POST',
      data: dataStr,
      success(res) {
        console.log(res);

        // 登录失败
        if (res.status !== 0) return layui.layer.msg(res.message);
        // 登录成功
        layui.layer.msg(res.message, {
          icon: 6,
          time: 1500 //2秒关闭（如果不配置，默认是3秒）
        }, function () {
          // a.保存token值到localstorage
          localStorage.setItem('token', res.token);
          // b. 跳转到 index.html
          location.href = 'index.html';


        });


      }

    })

  });






}) 