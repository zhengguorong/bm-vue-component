import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routerConfig from './route'

import BMComponent from '../src/'

Vue.use(BMComponent)
Vue.use(VueRouter)

const router = new VueRouter({
	routes: routerConfig
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
})
