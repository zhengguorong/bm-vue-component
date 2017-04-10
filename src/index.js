'use strict'

import BMWeek from './components/week/week.vue'
import Calendar from './components/calendar/calendar.vue'
import VueTouch from 'vue-touch'

function install (Vue, options = {}) {
  Vue.use(VueTouch)
  Vue.component(BMWeek.name, BMWeek)
  Vue.component(Calendar.name, Calendar)
}

export default install

if (typeof module === 'object' && module.exports) {
  module.exports.install = install
}