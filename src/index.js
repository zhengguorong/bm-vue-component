'use strict'

import BMWeek from './components/Week.vue'
import VueTouch from 'vue-touch'

function install (Vue, options = {}) {
  Vue.use(VueTouch)
  Vue.component('BMWeek', BMWeek)
}

export default install

if (typeof module === 'object' && module.exports) {
  module.exports.install = install
}