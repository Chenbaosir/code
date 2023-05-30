$(function(){
    var form = layui.form
    var layer = layui.layer;
   
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
    samePwd: function(value) {
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码不能相同！'
      }
    },
    rePwd: function(value) {
      if (value !== $('[name=newPwd]').val()) {
        return '两次密码不一致！'
      }
    }
  })
//   重置密码
 // 监听表单事件
 $('.layui-form').on('submit', function (e) {
    //阻止表单默认提交行为
    e.preventDefault()
    $.ajax({
      method: 'POST',//请求的方式，例如GET或PosT
      url: '/my/updatepwd',//请求的URL地址
      data: $(this).serialize(),//这次请求要携带的数据
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg('更新密码成功');
        $('.layui-form')[0].reset()
      }//请求成功之后的回调函数
    })
  })
})
