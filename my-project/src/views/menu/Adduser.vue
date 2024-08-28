<template>
  <div>
    <!-- 按钮触发模态框 -->
    <el-button type="primary" @click="openModal">添加用户</el-button>

    <!-- 模态框 -->
    <el-dialog
      title="新用户"
      :visible.sync="isModalVisible"
      width="30%"
      @close="resetForm"
    >
      <el-form :model="formData">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="formData.password" type="password"></el-input>
        </el-form-item>

        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="formData.truename"></el-input>
        </el-form-item>

        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="formData.tel"></el-input>
        </el-form-item>

        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input-number v-model="formData.age" :min="0" :max="150"></el-input-number>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeModal">关闭</el-button>
        <el-button type="primary" @click="saveUser">保存信息</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Adduser } from '@/api';

export default {
  data() {
    return {
      isModalVisible: false,
      formLabelWidth: '70px',
      formData: {
        username: '',
        password: '',
        truename: '',
        tel: '',
        age: 0
      }
    };
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.resetForm();
    },
    resetForm() {
      this.formData = {
        username: '',
        password: '',
        truename: '',
        tel: '',
        age: 0
      };
    },
    async saveUser() {
      const params = { ...this.formData };
      try {
        const res = await Adduser(params);
        if (res.code === 200) {
          this.$message.success('保存成功');
          this.closeModal();
        } else {
          this.$message.error('保存失败，请重试。');
        }
      } catch (error) {
        this.$message.error('保存失败，请重试。');
      }
    }
  }
};
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
