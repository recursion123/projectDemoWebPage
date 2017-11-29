<template>
    <div>
        <el-menu class="el-menu" :default-active="activeIndex" mode="horizontal" @select="handleSelect">
            <el-menu-item class="el-menu-item" index="1"><i class="fa fa-book"> 文章列表</i></el-menu-item>
            <el-menu-item class="el-menu-item" index="2"><i class="fa fa-info-circle"> 关于</i></el-menu-item>
        </el-menu>
        <hr/>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeIndex: '1',
            };
        },
        methods: {
            handleSelect(index) {
                switch (index) {
                    case "1":
                        this.goto("/blog/main/articleList");
                        break;
                    case "2":
                        this.goto("/blog/main/about");
                        break;
                }
            }
        }
    };
</script>