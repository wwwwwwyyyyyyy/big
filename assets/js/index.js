// 获取用户信息
function getUserInfo () {
    $.ajax({
        type:'GET',
        url:'/my/userinfo',
        success: res => {
            if(res.status !== 0) return layer.msg('登录失败')
            // console.log(res);
            randerAvatar(res.data)
        }
    })
}

// 渲染用户信息
const randerAvatar = user => {
    const uname = user.nickname||user.username
    $('#welcome').html(`欢迎${uname}登录`)
    // 按需渲染头像
    if(user.user_pic !== null) {
        $('.layui-nav-img').attr('src',user.user_pic)
        $('.text-avatar').hide()
    }else {
        $('.text-avatar').html(user.username[0].toUpperCase())
        $('.layui-nav-img').hide()
    }
}
// 退出功能
$('#btnlogout').click(() => {
    layer.confirm('是否要退出?', {icon: 3, title:'提示'}, function(index){
        localStorage.removeItem('token')
        location.href = '/login.html'
      });

})

getUserInfo()