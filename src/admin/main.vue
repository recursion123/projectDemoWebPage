<template>
    <div>
        <hr/>
        <el-row>
            <el-col :span="2">
                <el-menu class="el-menu-demo" :default-active="activeIndex" @select="handleSelect">
                    <el-menu-item class="el-menu-item" index="1"><i class="fa fa-book"> 文章列表</i></el-menu-item>
                    <el-menu-item class="el-menu-item" index="2"><i class="fa fa-info-circle"> 用户管理</i></el-menu-item>
                    <el-menu-item class="el-menu-item" index="3"><i class="fa fa-info-circle"> 角色配置</i></el-menu-item>
                    <el-menu-item class="el-menu-item" index="4"><i class="fa fa-info-circle"> 部门维护</i></el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="22" style="padding: 30px">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {activeIndex: '1'};
        },
        methods: {
            handleSelect(index) {
                switch (index) {
                    case "1":
                        this.goto("/admin/main");
                        break;
                    case "2":
                        this.goto("/admin/main/userList");
                        break;
                    case "3":
                        this.goto("/admin/main/roleConfig");
                        break;
                    case "4":
                        this.goto("/admin/main/deptConfig");
                        break;
                }
            }
        }
    };
</script>