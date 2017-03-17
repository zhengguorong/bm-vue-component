'use strict'

import BMWeek from './components/Week.vue'

function install (Vue, options = {}) {
  Vue.component('BMWeek', BMWeek)
}

export default install

if (typeof module === 'object' && module.exports) {
  module.exports.install = install
}