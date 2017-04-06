'use strict'

import BMWeek from './components/Week.vue'
import Calendar from './components/Calendar.vue'
import VueTouch from 'vue-touch'

function install (Vue, options = {}) {
  Vue.use(VueTouch)
  Vue.component('BMWeek', BMWeek)
  Vue.component('BMCalendar', Calendar)
}

export default install

if (typeof module === 'object' && module.exports) {
  module.exports.install = install
}