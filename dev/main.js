import Vue from 'vue'
import App from './App.vue'

import BMComponent from '../src/'

Vue.use(BMComponent)

new Vue({
  el: '#app',
  render: h => h(App)
})
