<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="userManager">
            <router-view name="userList"></router-view>
        </el-tab-pane>
        <el-tab-pane label="角色配置" name="second">
            <router-view name="roleConfig"></router-view>
        </el-tab-pane>
        <el-tab-pane label="部门维护" name="third">
            <router-view name="deptConfig"></router-view>
        </el-tab-pane>
        <el-tab-pane label="其他" name="fourth">其他</el-tab-pane>
    </el-tabs>
</template>
<script>
    export default {
        data() {
            return {
                activeName: 'userManager',
            };
        },
        methods: {
            handleClick(tab, event) {
                if ("userManager" == this.activeName) {
                    this.$router.push({name: 'userList'});
                }
            }
        }
    };


</script>