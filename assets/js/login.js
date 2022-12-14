// 点击 "去注册账号"的连接
$('#link_reg').on('click',function () {
    $('.login-box').hide()
    $('.reg-box').show()
})

// 点击"去登陆"的链接
$('#link_login').on('click',function () {
    $('.reg-box').hide()
    $('.login-box').show()
})

// 通过 layui中获取form对象
let form = layui.form
// 导入 layer
let layer = layui.layer
// 通过 form.verify() 函数自定义校验规则
form.verify({
    // 自定义了一个叫做pwd校验规则
    pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],

    // 效验两次密码是否一致的规则
    repwd: function (value) {
        // 通过形参拿到的是确认密码框中的内容
        // 还需要拿到密码框中的内容
        // 然后进行一次等于的判断
        // 如果判断失败，则return 一个提示消息即可
        let pwd = $('.reg-box [name=password]').val()
        if(pwd !== value) {
            return '两次密码不一致！'
        }
    }
})

// 监听注册表单的提交事件
$('#form_reg').on('submit', function (e) {
    // 1. 阻止默认的提交行为
    e.preventDefault()
    // 2. 发起Ajax的POST请求
    $.ajax({
        method: 'POST',
        url: '/api/reguser',
        data: {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        },
        success: res => {
            if(res.status !== 0) {
                return console.log(res.message)
            }
            layer.msg('注册成功，请登录！')
            // 模拟人的点击行为
            $('#link_login').click()
        }
    })
})

// 监听登录表单的提交事件
$('#form_login').on('submit',(function (e) {
    // 阻止默认提交
    e.preventDefault()
    $.ajax({
        method: 'POST',
        url: '/api/login',
        // 快速获取表单中的数据
        data: $(this).serialize(),
        success: res => {
            if(res.status !== 0) {
                return layer.msg('登录失败！')
            }
            layer.msg('登录成功！')
            layer.msg('登录成功！')
            // 将登录成功得到的token字符串，保存包localStorage中
            localStorage.setItem('token', res.token)
            // 跳转到后台主页
            location.href = '/BigEvents_pc/index.html?_ijt=l72k69ubqga0099viv8ljehu2u&_ij_reload=RELOAD_ON_SAVE'
        }
    })
}))