<template>
    <div>
        <el-col :span="16">
            <el-card>
                <el-button type="text" @click="goto('/admin/main/editArticle/0')">添加</el-button>
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        v-loading="loading"
                        element-loading-text="拼命加载中">
                    <el-table-column
                            prop="id"
                            label="id">
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="文章名称">
                    </el-table-column>
                    <el-table-column
                            prop="author.name"
                            label="作者">
                    </el-table-column>
                    <el-table-column
                            prop="updateTime"
                            label="更新时间">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template scope="scope">
                            <el-button size="small" type="info"
                                       @click="goto('/admin/main/editArticle/'+scope.row.id)">
                                编辑
                            </el-button>
                            <el-popover
                                    ref="popover"
                                    placement="top"
                                    width="160">
                                <p>确定删除吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button type="primary" size="mini" @click="deleteArticle(scope.row)">确定
                                    </el-button>
                                </div>
                            </el-popover>
                            <el-button size="small" type="danger" v-popover:popover>
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </div>
            </el-card>
        </el-col>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [],
                articleList: [],
                articleTagList: [],
                loading: true,
                currentPage: 1,
                pageSize: 10,
                total: 0
            }
        },
        methods: {
            loadData() {
                this.$http.post('/api/blog/listArticle', {}).then((response) => {
                    this.articleList = response.body;
                    this.total = this.articleList.length;
                    this.showPageData();
                }, () => {
                    alert("error");
                });
                this.$http.post('/api/blog/listArticleTag', {}).then((response) => {
                    this.articleTagList = response.body;
                }, () => {
                    alert("error");
                });
            },
            showPageData() {
                this.loading = true;
                this.tableData = [];
                for (let i = (this.currentPage - 1) * this.pageSize; i < this.currentPage * this.pageSize && i < this.total; i++) {
                    this.tableData.push(this.articleList[i]);
                }
                this.loading = false;
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.showPageData();
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                this.showPageData();
            },
            deleteArticle(article) {
                this.$http.post('/api/admin/deleteArticle', article).then((response) => {
                    this.$message.info('删除成功');
                    this.loadData();
                }, () => {
                    alert("error");
                });
            }
        },
        mounted: function () {
            this.loadData();
        }
    }
</script>