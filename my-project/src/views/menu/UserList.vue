<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="username" label="账号" width="180">
      </el-table-column>
      <el-table-column prop="password" label="密码" width="180">
        <template slot-scope="scope">
          {{ scope.row.showPassword ? scope.row.password : '******' }}
        </template>
      </el-table-column>
      <el-table-column prop="truename" label="姓名">
      </el-table-column>
      <el-table-column prop="tel" label="电话">
      </el-table-column>
      <el-table-column prop="age" label="年龄">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="Edit(scope.row)"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="Del(scope.row)"></el-button>
        </template>
      </el-table-column>
      <el-table-column label="查看密码">
        <template slot-scope="scope">
            <el-switch
              v-model="scope.row.showPassword"
              active-color="#13ce66"
              inactive-color="gray"
              active-text="显示"
              inactive-text="隐藏">
            </el-switch>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="Visible" :title="'修改用户 - ' + saveuser.username" width="50%">
      <el-form :model="saveuser" ref="userForm" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="saveuser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="saveuser.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="saveuser.truename"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="saveuser.tel"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="saveuser.age" type="number"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Visible = false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Deluser, Seluser, Saveuser } from "@/api";
export default {
  data() {
    return {
      tableData: [],
      saveuser: {
        username: '',
        password: '',
        trueName: '',
        tel: '',
        age: ''
      },
      Visible: false
    }
  },
  methods: {
    //获取数据
    async getData() {
      let res = await Seluser();
      if (res.code == 200) {
        this.tableData = res.data.map(item => ({
          ...item,
          showPassword: false
        }));
      }
    },
    Edit(row) {
      this.saveuser = row;
      this.Visible = true;
    },
    
    async save() {
      let res = await Saveuser(this.saveuser);
      console.log(res.msg);
      
      if (res.code == 200) {
        this.$message.success('修改成功');
        this.getData();
        this.Visible = false;
      } else {
        this.$message('修改失败');
      }
    },

    async Del(row) {
      let res = await Deluser({ uid: row.uid });
      if (res.code == 200) {
        this.$message.success('删除成功');
        this.getData();
      } else {
        this.$message('删除失败');
      }
    }
  },
  mounted() {
    this.getData();
  }
}
</script>
