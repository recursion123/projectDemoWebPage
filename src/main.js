import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import "babel-polyfill";

import 'bootstrap/js/modal.js'
import 'bootstrap/js/dropdown.js'
import 'bootstrap/js/tooltip.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import 'summernote'
import 'summernote/dist/lang/summernote-zh-CN.min'
import 'summernote/dist/summernote.css'
import 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import login from './login.vue'

import admin from './admin/main.vue'
import userList from './admin/userList.vue'
import roleConfig from './admin/roleConfig.vue'
import deptConfig from './admin/deptConfig.vue'
import adminArticleList from './admin/adminArticleList.vue'
import editArticle from './admin/editArticle.vue'

import blog from './blog/main.vue'
import articleList from './blog/articleList.vue'
import article from './blog/article.vue'
import about from './blog/about.vue'


Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(Vuex);


const store = new Vuex.Store({
    state: {
        header: "",
    },
    mutations: {
        updateHeader(state, userinfo) {
            state.header = 'Basic ' + window.btoa(userinfo.username + ":" + userinfo.password);
            Vue.http.headers.common['Authorization'] = state.header;
        }
    }
})
const router = new VueRouter({
    routes: [
        {
            path: '/admin/main', component: admin, name: "admin", children: [
                {path: '', component: adminArticleList, name: 'adminArticleList'},
                {path: 'userList', component: userList, name: "userList"},
                {path: 'roleConfig', component: roleConfig, name: "roleConfig"},
                {path: 'deptConfig', component: deptConfig, name: "deptConfig"},
                {path: 'roleConfig', component: roleConfig, name: "roleConfig"},
                {path: 'editArticle/:articleID', component: editArticle, name: "editArticle"}
            ]
        },
        {path: '/login', component: login, name: "login"},
        {
            path: '/blog/main', component: blog, name: "blog", children: [
                {path: '', component: articleList, name: "articleList"},
                {path: 'about', component: about, name: "about"}
            ]
        },
        {path: '/blog/article/:articleID', component: article, name: "article"},
        {path: '/*', redirect: "/blog/main"}
    ]
});

const app = new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app');


Vue.prototype.goto = function (path) {
    this.$router.push({path: path});
};

jQuery('meta[name="viewport"]').attr('content', "width=device-width, initial-scale=0.8, maximum-scale=1, user-scalable=no");


//Vue.http.headers.common['Authorization'] = 'Basic '+window.btoa(app.$data.username+":"+app.$data.password);