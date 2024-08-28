<template>
  <div class="bg">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="SubmitForm">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Login } from "@/api/index";
import { set } from "@/utils/session";

export default {
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
    async submitForm() {
      console.log(this.ruleForm);
      // 发送请求
      let res = await Login(this.ruleForm);
      console.log(res);

      if (res.code == 200) {
        set("token", res.data);
        this.$router.push("menu");
      } else {
        this.$message.error("用户名或密码错误");
      }
    },
    SubmitForm: debounce(async function() {
      await this.submitForm();
    }, 1000), 
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    console.log(axios);
  },
};


function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}
</script>

<style scoped>
.el-form {
  width: 350px;
  margin: 280px auto;
  height: 200px;
  background-color: rgb(213, 225, 235);
  padding-top: 50px;
  padding-right: 50px;
}

.el-button {
  margin-right: 50px;
}

.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("/public/img/bg.jpg");
  left: 0;
  top: 0;
}
</style>
