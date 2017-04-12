'use strict'

import Week from './components/week/week.vue'
import Calendar from './components/calendar/calendar.vue'
import VueTouch from 'vue-touch'

function install (Vue, options = {}) {
  Vue.use(VueTouch)
  Vue.component(Week.name, Week)
  Vue.component(Calendar.name, Calendar)
}

export default install

if (typeof module === 'object' && module.exports) {
  module.exports.install = install
}