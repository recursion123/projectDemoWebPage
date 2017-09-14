<template>
    <div>
        <el-row>
            <el-col :span="3" class="left-bar">
                <el-input
                        placeholder="请输入搜索内容"
                        icon="search"
                        v-model="condition"
                        :on-icon-click="search">
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
                                <el-button type="text" @click="goto('article',article)" class="title">
                                    {{article.title}}
                                </el-button>
                            </el-row>
                            <el-tag v-for="tag in article.tags" :key="tag.name" :type="tag.type"
                                    class="article-tag">
                                {{tag.name}}
                            </el-tag>
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
        mounted() {

        },
        data() {
            return {
                articleList: [{
                    title: "第一篇",
                    tags: [{name: "标签1", type: "primary"}, {name: "标签2", type: "success"}]
                }, {
                    title: "第二篇",
                    tags: [{name: "标签1", type: "primary"}, {name: "标签2", type: "success"}]
                }, {title: "第三篇", tags: [{name: "标签1", type: "primary"}, {name: "标签2", type: "success"}]}],
                condition: "",
                activeTag: ""
            }
        },
        methods: {
            search() {
                alert(this.condition);
            }
        },
        created: function () {

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