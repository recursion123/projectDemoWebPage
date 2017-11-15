<template>
    <div>
        <el-row>
            <el-col :span="3" class="left-bar">
                <el-input
                        placeholder="请输入过滤内容"
                        suffix-icon="search"
                        v-model="condition">
                </el-input>
                <hr/>
                <el-row v-for="m in 5">
                    <el-button type="text" class="text item">标签{{m}}</el-button>
                </el-row>
            </el-col>
            <el-col :span="21">
                <div v-for="article in articleListResult">
                    <el-col :span="8" class="text item">
                        <el-card class="box-card">
                            <el-row style="margin-bottom: 10px">
                                <el-button type="text" @click="goto('/blog/article/'+article.id)" class="title">
                                    {{article.title}}
                                </el-button>
                            </el-row>
                            <el-row>
                                <el-col :span="16">
                                    <el-tag v-for="tag in article.tags" :key="tag.name" :type="tag.type"
                                            class="article-tag">
                                        {{tag.name}}
                                    </el-tag>
                                </el-col>
                                <el-col :span="4">
                                    <el-tag>{{article.updateTime}}</el-tag>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<style>
    .left-bar {
        border: solid;
        border-width: 0px 1px;
        color: #D4D4D4;
        padding-right: 20px;
    }

    .article-tag {
        margin-left: 10px;
    }

    .title {
        font-size: 22px;
        color: cornflowerblue;
    }

    .text {
        font-size: 22px;
    }

    .item {
        padding-left: 18px;
        padding-bottom: 18px;
    }

    .box-card {
        width: 480px;
    }
</style>
<script>
    export default {
        data() {
            return {
                articleList: [],
                condition: "",
                activeTag: ""
            }
        },
        methods: {
            loadData() {
                this.$http.post('/api/blog/listArticle', {}).then((response) => {
                    this.articleList = response.body;
                }, () => {
                    alert("请先登录!");
                    this.$router.push({name: 'login'});
                });
            }
        },
        created: function () {
            this.loadData();
        },
        computed: {
            articleListResult: function () {
                let condition = this.condition;
                let activeTag = this.activeTag;
                return this.articleList.filter(function (article) {
                    return article.title.indexOf(condition) > -1;
                })
            }
        }
    }
</script>