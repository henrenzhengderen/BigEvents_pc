getUserInfo()

let layer = layui.layer

// 绑定点击退出事件
$('#btnLogout').on('click',function () {
    // 提示用户是否确认退出
    layer.confirm('确定退出登陆？',{icon: 3, title: '提示'}, index => {
        // 1. 清空本地存储的token
        localStorage.removeItem('token')
        // 2. 重新跳转到登陆页面
        location.href = '/BigEvents_pc/login.html?_ijt=kf6tn23eeupgc24v6b9i1kvcue&_ij_reload=RELOAD_ON_SAVE'
        // 3. 关闭 confirm 询问框
        layer.close(index)
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: res => {
            if(res.status !== 0) {
                return layer.msg('获取用户信息失败！')
            }
            // 调用renderAvatar() 渲染用户头像
            renderAvatar(res.data)
        }
    })
}

// 渲染用户头像
function  renderAvatar(user) {
    // 1.获取用户的名称
    let name = user.nickname || user.username
    // 2. 设置欢迎的文本
    $('#welcome').html(`欢迎&nbsp;&nbsp${name}`)
    // 3. 按需渲染用户的头像
    if(user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avater').hide()
    }else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avater').html(first).show()
    }
}