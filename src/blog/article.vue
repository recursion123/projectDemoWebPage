<template>
    <div>
        <el-button type="text" icon="arrow-left" @click="goto('/blog/articleList')" class="back">返回列表</el-button>
        <h1 align="center">{{article.title}}</h1>
        <hr/>
        <el-col :span="20" :offset="2">
            <div v-html="article.content" style="padding: 10px"></div>
        </el-col>

    </div>
</template>
<style>
    .back {
        position: fixed;
        left: 20px;
        top: 20px;
    }
</style>
<script>
    export default {
        data() {
            return {article: {}}
        },
        methods: {
            search() {
                alert(this.condition);
            },
            loadData() {
                this.$http.post('/api/blog/findArticleByID?id=' + this.$route.params.articleID).then((response) => {
                    this.article = response.body;
                }, () => {
                    alert("请先登录!");
                    this.$router.push({name: 'login'});
                });
            }
        },
        created: function () {
            this.loadData();
        }
    }
</script>