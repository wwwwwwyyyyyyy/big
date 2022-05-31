$(function() {
    const form = layui.form;
    form.verify({
        pwd:[/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        samePwd: val => {
            if(val === $('[name=oldPwd]').val()) return '新旧密码不能一样哦'
        },
        rePwd: val => {
            if(val !== $('[name=newPwd]').val()) return '确认密码输入一致哦'
        }
    })
    // 更新密码
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success: res => {
                if(res.status !== 0) return layer.msg('重置密码失败')
                localStorage.removeItem('token')
                window.parent.location.href = '/login.html'
            }
        })
    })
})