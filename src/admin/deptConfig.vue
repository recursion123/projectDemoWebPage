<template>
    <div>
        <template>
            <el-row>
                <el-col :span="16">
                    <el-card>
                        <el-button type="text" @click="showDialog()"> 添加</el-button>
                        <el-table
                                :data="deptList"
                                style="width: 100%">
                            <el-table-column
                                    prop="id"
                                    label="id">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="名称">
                            </el-table-column>
                            <el-table-column
                                    label="操作">
                                <template scope="scope">
                                    <el-button size="small" type="info"
                                               @click="showDialog('update', scope.row)">
                                        编辑
                                    </el-button>
                                    <el-popover
                                            ref="popoverDel"
                                            placement="top"
                                            width="160">
                                        <p>确定删除吗？</p>
                                        <div style="text-align: right; margin: 0">
                                            <el-button type="primary" size="mini" @click="deleteRole(scope.row)">确定
                                            </el-button>
                                        </div>
                                    </el-popover>
                                    <el-button size="small" type="danger" v-popover:popoverDel>
                                        删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-card>
                </el-col>
            </el-row>
        </template>
        <el-dialog title="角色信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="名称">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="insertOrUpdateRole()">确 定</el-button>
            </div>

        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                dialogFormVisible: false,
                form: {},
                deletePop: false,
                deptList: [],
                operationType: ""
            }
        },
        methods: {
            loadData() {
                this.$http.post('/api/user/listDept', {}).then((response) => {
                    this.$data.deptList = response.body;
                }, (response) => {
                    alert("请先登录!");
                    this.$router.push({name: 'login'});
                });
            },
            showDialog(operationType, row) {
                this.dialogFormVisible = true;
                this.operationType = operationType;
                if (operationType === "update") {
                    this.form = row;
                } else {
                    this.form = {};
                }
            },
            deleteRole(row) {
                this.$http.post('/api/user/deleteDept',
                    row).then(() => {
                    this.$message.info('删除成功！');
                    this.loadData();
                }, (response) => {
                    alert(JSON.stringify(response.body));
                });
            },
            insertOrUpdateRole() {
                if (this.operationType === "update") {
                    this.$http.post('/api/user/updateDept',
                        this.form).then(() => {
                        this.$message.info('更新成功！');
                        this.dialogFormVisible = false;
                    }, (response) => {
                        alert(JSON.stringify(response.body));
                    });
                } else {
                    this.$http.post('/api/user/insertDept',
                        this.form).then(() => {
                        this.$message.info('添加成功！');
                        this.loadData();
                        this.dialogFormVisible = false;
                    }, (response) => {
                        alert(JSON.stringify(response.body));
                    });
                }
            }
        },
        created: function () {
            this.loadData();
        }
    }
</script>