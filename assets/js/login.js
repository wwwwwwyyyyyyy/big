$(function () {
  // 登录注册切换功能
  $("#link_reg").click(() => {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link_login").click(() => {
    $(".reg-box").hide();
    $(".login-box").show();
  });

  // 引入form模块
  const form = layui.form;

  // 获取leyer弹窗
  const layer = layui.layer;
  // 自定义校验规则
  form.verify({
    // 密码校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位,且不能出现空格"],
    // 确认密码校验规则
    repwd: (value) => {
      const pwd = $('#form_reg [name="password"]').val();
      if (pwd !== value) return "两次密码不一致哦";
    },
  });
  // 设置请求根路径
  // const baseUrl = 'http://www.liulongbin.top:3007'
  // 监听注册表单，发送注册请求
  $("#form_reg").on("submit", (e) => {
    // 阻止默认事件
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/reguser",
      data: {
        username: $('#form_reg [name="username"]').val(),
        password: $('#form_reg [name="password"]').val(),
      },
      success: (res) => {
        if (res.status !== 0) return layer.msg("注册失败");
        layer.msg("注册成功");
        // 注册成功后转回登录页面
        $("#link_login").click();
      },
    });
  });

  // 登陆功能
  $("#form_login").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/login",
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg("登录失败");
        layer.msg("登陆成功");
        // 登录成功后把 token 令牌 存放到本地储存
        localStorage.setItem("token", res.token);
        location.href = "/index.html";
      },
    });
  });
});
