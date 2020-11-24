// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (ajaxOpt) {
  console.log(ajaxOpt);

  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  ajaxOpt.url = 'http://ajax.frontend.itheima.net' + ajaxOpt.url;


  // b.为所有 /my/请求添加 token
  if (ajaxOpt.url.indexOf('/my/') > -1) {
    ajaxOpt.headers = {
      Authorization: localStorage.getItem('token')

    }
  }


  // c.为所有的ajax请求 统一配置complete 事件函数................
  ajaxOpt.complete = function (res) {
    if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
      // c2.木有登录，则：
      // c2.1 显示需要重新登录的消息，显示结束后，再执行 清空token和跳转操作
      layer.msg(res.responseJSON.message, {
        icon: 1,
        time: 1500 //2秒关闭（如果不配置，默认是3秒）
      }, function () {
        // 清空token
        localStorage.removeItem('token');
        //跳转到login.html
        location.href = '/login.html'

      });


    }



  }
})
