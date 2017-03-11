// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';
Vue.use(VueRouter);
Vue.use(VueResource);
//开启debug模式
Vue.config.debug = true;
// 1. 定义（路由）组件// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 
const routes = [
        { path: '/goods', component: goods },
        { path: '/ratings', component: ratings },
        { path: '/seller', component: seller }
    ]
    // 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
    // ES6缩写语法，相当于routes:routes
    routes,
    linkActiveClass: 'active'
});
// 4. 创建和挂载根实例。// 记得要通过 router 配置参数注入路由，// 从而让整个应用都有路由功能
const app = new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app');
router.push('/goods');