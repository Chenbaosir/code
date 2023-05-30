$(function(){
    var form = layui.form
    var layer = layui.layer;
    form.verify({
      nickname: function(value) {
        if (value.length > 6) {
          return '昵称长度必须在 1 ~ 6 个字符之间！'
        }
      }
    })
    initUserInfo ()
    //获取用户基本信息
    function initUserInfo (){  
        $.ajax({
            method:'GET',//请求的方式，例如GET或PosT
            url:'/my/userinfo',//请求的URL地址
            success:function(res){
                if(res.status !==0){
                    return layer.msg(res.message)
                }
                form.val('formUserInfo',res.data)
            }//请求成功之后的回调函数
            })
    }
    // 重置表单
    $('#btnReset').on('click',function(){
        e.preventDefault()
        initUserInfo ()
    })
    //更新用户基本信息
    // 监听表单事件
  $('.layui-form').on('submit', function (e) {
    //阻止表单默认提交行为
    e.preventDefault()
    $.ajax({
      method: 'POST',//请求的方式，例如GET或PosT
      url: '/my/userinfo',//请求的URL地址
      data: $(this).serialize(),//这次请求要携带的数据
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg('修改成功');
        window.parent .getUserInfo()
      }//请求成功之后的回调函数
    })
  })
})
