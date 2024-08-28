<template>
    <el-container>
        <el-header>
            <img src="@/assets/新闻01.svg" class="news" />
            <div>
                <span>欢迎你：</span>
                <span class="truename">{{name}}</span>
                <span class="exit" @click="exit()"> 退出</span>
              </div>
         
        </el-header>
        <el-container>
            <el-aside width="100px">
                <el-collapse accordion>
                    <!-- 循环遍历 arr 数组 -->
                    <el-collapse-item v-for="(section, sectionIndex) in arr" :title="section.title" :key="sectionIndex">
                        <!-- 循环遍历每个 section 的 children -->
                        <div class="pointer" v-for="(item, index) in section.children" :key="index" @click="navigateTo(item.path)">
                            {{ item.text }}
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </el-aside>
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
import { Seluser } from "@/api";
import {get,clear} from '@/utils/session'

export default {
    data() {
        return {
            list:[],
            name:"",
            arr: [
                {
                    title: "用户管理",
                    children: [
                        { path: "/menu/UserList", text: "用户列表" },
                        { path: "/menu/Adduser", text: "添加用户" },
                    ],
                },
                {
                    title: "新闻管理",
                    children: [
                        { path: "/menu/NewsList", text: "新闻列表" },
                        { path: "/menu/Addnews", text: "添加新闻" },
                    ],
                },
            ],
        };
    },
    methods: {
        exit(){
            clear()
            this.$router.replace("/")
        },
        navigateTo(path) {
            this.$router.push(path);
        },
        async getData(){
            let res=await Seluser()
            if(res.code==200){
                this.list=res.data;
            }else{
                alert(res.msg)
            }
        }
        
    },
    created() {
      this.getData();
    },
    mounted(){
        this.name=get("token").username
    }
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.news {
    width: 50px;
    margin-top: 5px;
    float: left;
}

.el-header {
    background-color: lightblue;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    color: #333;
    text-align: center;
    height: 90vh;
}

.el-main {
    color: #333;
    text-align: center;
    line-height: 100px;
    height: 90vh;
}

body > .el-container {
    margin-bottom: 40px;
}

.pointer {
    cursor: pointer;
}
.exit{
    cursor: pointer;
    color: aliceblue;
}

</style>