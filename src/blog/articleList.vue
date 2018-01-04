<template>
    <div>
        <el-row>
            <el-col :span="2">
                <el-input
                        placeholder="请输入过滤内容"
                        suffix-icon="search"
                        v-model="condition">
                </el-input>
                <hr/>
                <el-menu @select="handleSelect">
                    <el-menu-item v-for="tag in articleTagList" :index="tag.name">
                        {{tag.name}}
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="22" style="padding: 18px">
                <div v-for="article in articleListResult">
                    <el-col :span="6">
                        <el-card class="box-card" style="margin: 5px">
                            <el-button type="text" @click="goto('/blog/article/'+article.id)" class="title">
                                {{article.title}}
                            </el-button>
                            <el-row style="margin-bottom: 10px">
                                <el-tag v-for="tag in article.tags" :key="tag.name" :type="tag.type" size="mini"
                                        class="article-tag">
                                    {{tag.name}}
                                </el-tag>
                            </el-row>
                            <div class="bottom clearfix">
                                <time class="time">{{article.updateTime}}</time>
                            </div>
                        </el-card>
                    </el-col>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<style>
    .article-tag {
        margin-left: 10px;
    }

    .time {
        font-size: 13px;
        color: #999;
    }

    .title {
        font-size: 24px;
        color: cornflowerblue;
    }
</style>
<script>
    export default {
        data() {
            return {
                articleList: [],
                articleTagList: [],
                condition: "",
                activeTagName: ""
            }
        },
        methods: {
            loadData() {
                this.axios.post('/api/blog/listArticle', {}).then((response) => {
                    this.articleList = response.data;
                }, () => {
                    alert("error");
                });
                this.axios.post('/api/blog/listArticleTag', {}).then((response) => {
                    this.articleTagList = response.data;
                }, () => {
                    alert("error");
                });
            },
            handleSelect(index) {
                this.activeTagName = index;
            }
        },
        created: function () {
            this.loadData();
        },
        computed: {
            articleListResult: function () {
                let condition = this.condition;
                let activeTagName = this.activeTagName;
                return this.articleList.filter(function (article) {
                    let tagFlag = false;
                    if (activeTagName == "") {
                        tagFlag = true;
                    } else {
                        article.tags.forEach(function (tag) {
                            if (tag.name == activeTagName) {
                                tagFlag = true;
                            }
                        });
                    }
                    return article.title.indexOf(condition) > -1 && tagFlag;
                });
            }
        }
    }
</script>