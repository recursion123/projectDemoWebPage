import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import login from './login.vue'
import main from './main.vue'
import userList from './userList.vue'


Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        header: ""
    },
    mutations: {
        updateHeader (state,userinfo) {
            state.header='Basic '+window.btoa(userinfo.username+":"+userinfo.password);
            Vue.http.headers.common['Authorization'] = state.header;
        }
    }
})
const router = new VueRouter({
    routes: [
        {path: '/main', component: main, name: "main"},
        {path: '/userList', component: userList, name: "userList"},
        {path: '/login', component: login, name: "login"},
        {path:'/*',redirect: "login"}
    ]
})

const app=new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')

//Vue.http.headers.common['Authorization'] = 'Basic '+window.btoa(app.$data.username+":"+app.$data.password);


