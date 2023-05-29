$(function () {
    getUserInfo()

    //实现退出登录
    var layer = layui.layer;
    $('#exit').on('click', function () {
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeltem('token')
            location.href = "/login.html"
            layer.close(index);
        });

    })

})
// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',//请求的方式，例如GET或PosT
        url: '/my/userinfo',//请求的URL地址
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },//这次请求要携带的数据
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        },//请求成功之后的回调函数
        // 不论成功还是失败，最终都会调用 complete 回调函数
       
    })
}
//渲染用户头像
function renderAvatar(user) {
    var name = user.username || user.nickname
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }

}

//更新用户信息
function updateUserInfo(user) {

}
