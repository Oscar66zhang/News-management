<template>
    <div>
        <!-- News Table -->
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="title" label="新闻标题" width="180"></el-table-column>
            <el-table-column prop="author" label="新闻作者" width="180"></el-table-column>
            <el-table-column prop="type_name" label="新闻类型"></el-table-column>
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="editNews(row)"></el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(row)"></el-button>
                    <el-button type="success" size="mini" icon="el-icon-view" @click="viewContent(row)"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- Pagination -->
        <div class="block">
            <el-pagination
                layout="prev, pager, next"
                :total="totalPage * 5"
                :current-page="currentPage"
                :page-size="5"
                @current-change="currentchange"
            ></el-pagination>
        </div>

        <!-- Edit News Dialog -->
        <el-dialog :visible.sync="editDialogVisible" :title="'修改新闻 - ' + editForm.title" width="90%">
            <el-form :model="editForm">
                <el-form-item label="新闻标题">
                    <el-input v-model="editForm.title"></el-input>
                </el-form-item>
                <el-form-item label="新闻作者">
                    <el-input v-model="editForm.author"></el-input>
                </el-form-item>
                <el-form-item  label="新闻类型">
                    <el-select style="width:100%" v-model="editForm.tid" placeholder="选择新闻类型">
                        <el-option 
                            v-for="type in newsTypes"
                            :key="type.tid"
                            :label="type.type_name"
                            :value="type.tid"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="新闻内容">
                    <el-input type="textarea" v-model="editForm.content"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </span>
        </el-dialog>

        <!-- View News Content Dialog -->
        <el-dialog :visible.sync="viewDialogVisible" :title="viewTitle" width="60%">
            <div>{{ viewContentText }}</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="viewDialogVisible = false">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Seltype, Savenews, Delnews, Selnews } from "@/api";

export default {
    data() {
        return {
            tableData: [],
            totalPage: 0,
            currentPage: 1,
            editDialogVisible: false,
            viewDialogVisible: false,
            editForm: {
               title: '',
               author: '',
               tid: '',
               content: '',
               nid: '',
            },
            viewTitle: '',
            viewContentText: '',
            newsTypes: []
        };
    },
    async mounted() {
        await this.getData();
        await this.getNewsTypes();
    },
    methods: {
        async getData(pageNum = 1) {
            let res = await Selnews({ pageSize: 5, pageNum });
            if (res.code === 200) {
                this.tableData = res.data;
                this.totalPage = Math.ceil(res.total / 5);
            }
        },
        async getNewsTypes() {
            let res = await Seltype();
            if (res.code === 200) {
                this.newsTypes = res.data;
            }
        },
        editNews(news) {
            this.editForm = { ...news };
            this.editDialogVisible = true;
        },
        async save() {
            let res = await Savenews(this.editForm);
            if (res.code === 200) {
                this.$message({
                    type: 'success',
                    message: '新闻更新成功!',
                });
                this.editDialogVisible = false;
                this.getData(this.currentPage);
            } else {
                this.$message.error(res.msg || '新闻更新失败');
            }
        },
        async del(news) {
            let res = await Delnews({ params: { nid: news.nid } });
            if (res.code === 200) {
                this.$message({
                    type: 'success',
                    message: '新闻删除成功!'
                });
                this.getData(this.currentPage);
            } else {
                this.$message.error(res.msg || '新闻删除失败');
            }
        },
        viewContent(news) {
            this.viewTitle = news.title;
            this.viewContentText = news.content || "暂无内容";
            this.viewDialogVisible = true;
        },
        currentchange(pageNum) {
            this.currentPage = pageNum;
            this.getData(pageNum);
        }
    }
};
</script>

<style scoped>
.table {
    max-width: 100vw;
    width: 100vw;
    margin: 0 0 20px 0;
    position: relative;
    margin-top: 20px;
    text-align: center;
    border-collapse: collapse;
}
.table th,
.table td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
}
.btn-group {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}
.small-button {
    font-size: 12px;
    padding: 5px 10px;
}
.block {
    margin-left: 90px;
}

</style>
