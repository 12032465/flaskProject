import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//import http from 'vuetest/api'

//Vue.config.productionTip = false;

//Vue.prototype.$http = http;   // 添加原型方法，这样创建的对象就自带该方法了。

// new Vue({
//     router,
//     render: h => h(App)
// }).$mount("#app");

// createApp(App).use(
//     router
// ).mount('#app')
createApp(App).use({
    router,
    render: h => h(App)
}).mount('#app')
