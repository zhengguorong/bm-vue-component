import Vue from 'vue'
import App from './App.vue'

import BMComponent from '../src/'
// import vueEventCalendar from '../dist'
// import '../dist/style.css'
Vue.use(BMComponent)

new Vue({
  el: '#app',
  render: h => h(App)
})
