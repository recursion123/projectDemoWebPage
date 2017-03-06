<template>
    <div>
        <template>
            <el-card>
                <el-table
                        :data="userList"
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            prop="password"
                            label="密码">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template scope="scope">
                            <el-button size="small">查看</el-button>
                            <el-button size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </template>
    </div>
</template>
<script>
    export default {
        data() {
            return {userList: []}
        },
        methods: {

        },
        created: function () {
            this.$http.get('/api/user/list').then((response) => {
                this.$data.userList = response.body;
            }, (response) => {
                alert("error");
            });
        }
    }
</script>