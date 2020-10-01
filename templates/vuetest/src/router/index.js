import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import NotFound from '../components/NotFound.vue'
//
// const routerOptions = [
//   {
//     path: '/',
//     name: 'home',
//     component: 'Home'
//   },
//   {
//     path: '/about',
//     name: 'about',
//     //component: () => import(/* webpackChunkName: "about" */ '@/views/About')
//     component: 'About'
//    }//,
//   // {
//   //   path: '/home',
//   //   //component: () => import(/* webpackChunkName: "about" */ '../views/About')
//   //   component: HelloWorld
//   // }
// ]
// const router = createRouter({
//   history: createWebHashHistory(),
//   base: process.env.BASE_URL,
//   routes
// })
const routerOptions = [
  { path: '/', component: 'HelloWorld' },
  { path: '/home', component: 'Home' },
  { path: '/about', component: 'About' },
  { path: '*', component: 'NotFound' }
]
const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})
Vue.use(Router)
export default new Router({
    routes,//: [
//   {
//     path: '/',
//     name: 'home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'about',
//     component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
//     //component: About
//    }//,
// ],
  mode: 'history',
  base: process.env.BASE_URL
})
