<template>
  <div>
    <el-form :model="newsForm" class="news-form">
      <el-form-item label="新闻标题">
        <el-input v-model="newsForm.title"></el-input>
      </el-form-item>
      <el-form-item label="新闻作者">
        <el-input v-model="newsForm.author"></el-input>
      </el-form-item>
      <el-form-item label="新闻类型">
        <el-select style="width:100%" v-model="newsForm.tid" placeholder="选择新闻类型">
          <el-option
            v-for="type in newsTypes"
            :key="type.tid"
            :label="type.type_name"
            :value="type.tid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新闻内容">
        <el-input type="textarea" v-model="newsForm.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="debouncedSaveNews">{{ isEditing ? '保存' : '添加' }}</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Seltype, Addnews } from "@/api";

export default {
  data() {
    return {
      newsData: [],
      newsTypes: [],
      newsForm: {
        title: '',
        author: '',
        tid: '',
        content: ''
      },
      isEditing: false,
      editingIndex: null
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await Seltype();
      if (res.code === 200) {
        this.newsTypes = res.data;
      }
    },
    editNews(news) {
      this.isEditing = true;
      this.newsForm = { ...news };
      this.editingIndex = this.newsData.findIndex(item => item.nid === news.nid);
    },
    async saveNews() {
      let res = await Addnews(this.newsForm);
      console.log(res);
      if (res.code == 200) {
        this.$message.success('添加成功');
      }
    },
    debouncedSaveNews: debounce(async function() {
      await this.saveNews();
    }, 300), // Adjust the debounce delay as needed
    resetForm() {
      this.isEditing = false;
      this.newsForm = {
        title: '',
        author: '',
        tid: '',
        content: ''
      };
    }
  }
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
.news-form {
  margin-top: 20px;
}
</style>
