<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        :model="loginForm"
        label-width="0px"
        class="login_from"
        :rules="loginFormRules"
        ref="loginFromRef"
      >
        <!-- 用户名 -->
        <el-form-item label="" prop="username">
          <el-input
            prefix-icon="el-icon-user"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="" prop="password">
          <el-input
            type="password"
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item label="" class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 这是登录表单存储的数据
      loginForm: {
        username: "admin",
        password: "123456",
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //重置表单
    resetLoginForm() {
      this.$refs.loginFromRef.resetFields();
    },
    //登录表单
    login() {
      this.$refs.loginFromRef.validate(async (valid) => {
        if (!valid) return;
        // console.log(this.loginForm);
        const result = await this.$http.post("login", this.loginForm);
        const res=result.data;
        if (res.meta.status !== 200)
          return this.$message.error("登录失败");
        this.$message.success("登录成功");
        // 1.将登录成功之后的token，保存到客户端的sessionStorage中
        //  1.1项目中出了登录之外的其他API接口，必须在登录之后才能访问
        //  1.2token只应在当前在网站打开期间生效，所以将token保存在sessionStorage中
        console.log(res.data.token,"1111111111111");
        window.sessionStorage.setItem("token",res.data.token)
        // 2.通过编程式导航跳转到后台主页，路由地址是/home
        this.$router.push("/home")
        console.log(res)
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b69;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.login_from {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 10px;

  box-sizing: border-box;
}
.btns {
  // 弹性盒子
  display: flex;
  // 尾部对齐
  justify-content: flex-end;
}
</style>