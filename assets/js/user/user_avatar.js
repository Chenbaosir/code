$(function () {
  var layer = layui.layer;
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)
  // 上传头像按钮
  $("#btn1").on('click', function () {
    $('#fil').click()
  })
  $("#fil").on('change', function (e) {
    var filelist = e.target.files
    if (filelist === 0) { return layer.msg('请选择照片！') }
    var fils = filelist[0]
    var newImgURL = URL.createObjectURL(fils)
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })
  //为确定按钮绑定点击事件
  $("#btn2").on('click', function () {
    var dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    $.ajax({
      method: 'post',//请求的方式，例如GET或PosT
      url: '/my/update/avatar',//请求的URL地址
      data: {
        avatar: dataURL
      },//这次请求要携带的数据
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        } layer.msg(res.message)
        window.parent.getUserInfo()
      }//请求成功之后的回调函数
    })
  })
})
