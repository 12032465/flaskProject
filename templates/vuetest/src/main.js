import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import cookies from 'vue-cookies'
import 'vue-beauty/package/style/vue-beauty.min.css'
import vueBeauty from 'vue-beauty'
//import http from 'vuetest/api'

Vue.config.productionTip = false

//Vue.use(VueAxios, axios)
//Vue.prototype.$http = http;   // 添加原型方法，这样创建的对象就自带该方法了。
//vue.prototype.$cookies = cookies;
Vue.use(cookies)
Vue.use(vueBeauty)
// new Vue({
//     router,
//     render: h => h(App)
// }).$mount("#app");

new Vue({
    el: '#app',
    router,
    render: h => h(App)
    // components: {
    //     App
    // }
})
