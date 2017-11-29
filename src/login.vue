<template>
    <div @keyup.enter="login">
        <el-row style="margin-top: 130px">
            <el-col :span="8" :offset="8">
                <el-card align="center" style="background:linear-gradient(to bottom right, #D3DCE6 , #EFF2F7);"
                         v-loading="loading"
                         element-loading-text="登陆中">
                    <h3>用户登录</h3>
                    <el-row>
                        <el-input placeholder="用户名" v-model="username" style="width: 80%"></el-input>
                    </el-row>
                    <el-row>
                        <el-input type="password" placeholder="密码" v-model="password"
                                  style="width: 80%;margin-top: 10px"></el-input>
                    </el-row>
                    <el-row>
                        <el-button type="primary" style="margin-top: 10px" @click="login">登录</el-button>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                username:"",
                password:"",
                loading:false
            }
        },
        methods: {
            login() {
                if (this.username && this.password && this.username.trim() !== "" && this.password.trim() !== "") {
                    this.loading=true;
                    this.$http.post('/api/login', {
                        name: this.username,
                        password: this.password
                    }).then((response) => {
                        if (response.body > 0) {
                            this.$store.commit("updateHeader", {'username': this.username, 'password': this.password});
                            this.$router.push({name: 'adminArticleList'});
                        } else {
                            this.$message.error('账号或密码错误');
                        }
                    }, () => {
                        this.$message.error('登录失败');
                    }).then(()=>{
                        this.loading=false;
                    });
                } else {
                    this.$message.warning('用户名和密码不能为空');
                }
            }
        }
    }
</script>