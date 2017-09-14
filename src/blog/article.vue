<template>
    <div>
        <el-button type="text" icon="arrow-left" @click="goto('articleList')" class="back">返回列表</el-button>
        <h1 align="center">{{this.$route.params.title}}</h1>
        <hr/>
        <el-col :span="20" :offset="2">
            <div v-html="article" style="padding: 30px"></div>
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
            return {article: ""}
        },
        method: {}
    }
</script>