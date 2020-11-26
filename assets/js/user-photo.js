$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 裁剪区的配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options);





    // 2.为上传按钮 添加点击事件
    $('#btnUpload').on('click', function () {
        // 选择文件......
        $('#file').click();
    });





    // 3. 为文件选择框绑定onchange事件
    $('#file').on('change', function (e) {

        // 0.获取 选中文件信息的数组
        let fileList = e.target.files;
        if (fileList.length == 0) return layui.layer.msg('请选择文件~~~')
        // console.log(fileList);
        // 获取选中的第一个文件 信息对象
        let file = fileList[0];
        // 创建 文件虚拟路径
        var newImgURL = URL.createObjectURL(file)
        // 3. 显示新图片
        // 调用裁剪组件，销毁之前的图片，设置新的虚拟路径给它 并重新创建裁剪区
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    });




    // 4.为确认上传按钮 添加点击事件
    $('#btnOk').on('click', function () {
        //a.获取 选中的裁剪后的图片数据
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        console.log(dataURL);

        // 提交到服务器接口
        $.ajax({
            url: '/my/update/avatar',
            method: 'POST',
            data: {
                avatar: dataURL
            },
            success(res) {
                layui.layer.msg(res.message);
                // b.如果失败，则退出函数
                if (res.status != 0) return;
                // 如果上传成功，则调用父页面的方法 重新渲染用户信息
                window.top.getUserInfo();
            }
        });




    });



})