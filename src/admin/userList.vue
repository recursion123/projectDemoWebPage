<template>
    <div>
        <template>
            <el-row>
                <el-col :span="16">
                    <el-card>
                        <el-button type="text" @click="showInfoDialog(false)">添加</el-button>
                        <el-table
                                :data="tableData"
                                style="width: 100%"
                                v-loading="loading"
                                element-loading-text="拼命加载中">
                            <el-table-column
                                    prop="name"
                                    label="姓名">
                            </el-table-column>
                            <el-table-column
                                    prop="dept.name"
                                    label="部门">
                            </el-table-column>
                            <el-table-column
                                    label="操作">
                                <template scope="scope">
                                    <el-button size="small" type="info"
                                               @click="showInfoDialog(true, scope.row)">
                                        编辑信息
                                    </el-button>
                                    <el-popover
                                            ref="popover"
                                            placement="top"
                                            width="160">
                                        <p>确定删除吗？</p>
                                        <div style="text-align: right; margin: 0">
                                            <el-button type="primary" size="mini" @click="deleteUser(scope.row)">确定
                                            </el-button>
                                        </div>
                                    </el-popover>
                                    <el-button size="small" type="danger" v-popover:popover>
                                        删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage"
                                    :page-sizes="[10, 20, 30, 40]"
                                    :page-size="pageSize"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="total">
                            </el-pagination>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </template>

        <el-dialog title="个人信息" :visible.sync="dialogFormVisible">
            <div slot="title" class="dialog-title">
                <el-radio-group v-model="updateType" :style="{display:(isUpdate?'inline':'none')}">
                    <el-radio-button label="基本信息"></el-radio-button>
                    <el-radio-button label="修改密码"></el-radio-button>
                </el-radio-group>
            </div>
            <el-form :model="form">
                <el-form-item label="账户名">
                    <el-input v-model="form.name" auto-complete="off" :disabled="isUpdate"></el-input>
                </el-form-item>
                <el-form-item label="密码" :style="{display:(isUpdate?'none':'block')}">
                    <el-input v-model="form.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="部门">
                    <el-select v-model="form.dept.id" placeholder="请选择">
                        <el-option
                                v-for="item in deptList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色">
                    <el-checkbox-group v-model="form.role">
                        <el-checkbox v-for="obj in roleList" :label="obj.id">{{obj.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="insertOrUpdateUser()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                userList: [],
                tableData: [],
                dialogFormVisible: false,
                form: {dept: {}},
                roleList: [],
                isUpdate: true,
                deptList: {},
                loading: true,
                currentPage: 1,
                pageSize: 10,
                total: 0,
                updateType: "基本信息"
            }
        },
        methods: {
            loadData() {
                this.$http.post('/api/user/list', {}).then((response) => {
                    this.userList = response.body;
                    this.total = this.userList.length;
                    this.showPageData();
                    this.loading = false;
                }, () => {
                    alert("请先登录!");
                    this.$router.push({name: 'login'});
                });
                this.$http.post('/api/user/listRole', {}).then((response) => {
                    this.roleList = response.body;
                }, (response) => {

                });
                this.$http.post('/api/user/listDept', {}).then((response) => {
                    this.deptList = response.body;
                }, (response) => {

                });
            },
            showPageData() {
                this.tableData = [];
                for (let i = (this.currentPage - 1) * this.pageSize; i < this.currentPage * this.pageSize && i < this.total; i++) {
                    this.tableData.push(this.userList[i]);
                }
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.showPageData();
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                this.showPageData();
            },
            showInfoDialog(isUpdate, row) {
                this.dialogFormVisible = true;
                this.isUpdate = isUpdate;
                if (isUpdate) {
                    this.form = row;
                } else {
                    this.form = {role: [], dept: {id: ""}};
                }
            },
            insertOrUpdateUser() {
                if (this.isUpdate) {
                    this.$http.post('/api/user/update',
                        this.form).then(() => {
                        this.$message.info('更新成功！');
                        this.loadData();
                        this.dialogFormVisible = false;
                    }, (response) => {
                        alert(JSON.stringify(response.body));
                    });
                } else {
                    this.$http.post('/api/user/insert',
                        this.form).then(() => {
                        this.$message.info('添加成功！');
                        this.loadData();
                        this.dialogFormVisible = false;
                    }, (response) => {
                        alert(JSON.stringify(response.body));
                    });
                }
            },
            deleteUser(row) {
                this.$http.post('/api/user/delete',
                    row).then(() => {
                    this.$message.info('删除成功！');
                    this.loadData();
                }, (response) => {
                    alert(JSON.stringify(response.body));
                });
            }
        },
        created: function () {
            this.loadData();
        }
    }
</script>