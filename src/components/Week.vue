<template>
    <v-touch v-on:swipe="swipe">
    <div class="weeks">
      <span class="item">日</span>
      <span class="item">一</span>
      <span class="item">二</span>
      <span class="item">三</span>
      <span class="item">四</span>
      <span class="item">五</span>
      <span class="item">六</span>
    </div>
    <div class="dates">
    <transition-group name="list" tag="div" :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <span class="item" v-for="day in curWeeks" v-bind:key="day" @click="setSelectedDay(day)">
        <div class="date-num">
          <div :class="{'is-today': day.isToday}">{{day.day}}</div>
        </div>
      </span>
    </transition-group>
    </div>
    <div>当前选中日期{{curDay.formate}}</div>
    </v-touch>
</template>

<script>
import Vue from 'vue'
import VueTouch from 'vue-touch'

Vue.use(VueTouch)
export default {
  name: 'week',
  data () {
    return {
      curWeeks: [],
      curDay: {},
      action: 'cur'
    }
  },
  mounted () {
    this.curWeeks = this.changeWeek('cur')
  },
  methods: {
    // 获取下一星期或者上一星期
    changeWeek (action) {
      let lastDay = new Date()
      if (action === 'cur') {
        lastDay.setDate(lastDay.getDate() - lastDay.getDay() - 1)
        lastDay = lastDay.getTime()
      } else if (action === 'next') {
        lastDay = this.curWeeks[6].time
      } else {
        lastDay = this.curWeeks[0].time - 8 * 24 * 3600 * 1000
      }
      let weeks = []
      for (var i = 1; i <= 7; i++) {
        let nextDate = new Date(lastDay + i * 24 * 3600 * 1000)
        let formate = `${nextDate.getFullYear()}/${nextDate.getMonth() + 1}/${nextDate.getDate()}`
        let dateObj = {
          day: nextDate.getDate(),
          week: nextDate.getDay(),
          formate: formate,
          isToday: formate === (this.curDay.formate || `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`),
          time: nextDate.getTime()
        }
        if (dateObj.isToday) {
          this.curDay = dateObj
        }
        weeks.push(dateObj)
      }
      return weeks
    },
    setSelectedDay (day) {
      this.$emit('cur-day-changed', day)
      this.curDay.isToday = false
      day.isToday = true
      this.curDay = day
    },
    swipe (e) {
      if (e.deltaX > 0) {
        this.curWeeks = this.changeWeek('pre')
        this.action = 'pre'
      } else {
        this.action = 'next'
        this.curWeeks = this.changeWeek('next')
      }
    },
    beforeEnter (el, done) {
      el.style.opacity = 0
      el.style.transform = `translateX(${this.action === 'next' ? 50 : -50}px)`
      el.style.transition = 'all .5s'
    },
    enter (el, done) {
      setTimeout(() => {
        el.style.opacity = 1
        el.style.transform = 'translateX(0px)'
      }, 0)
    },
    leave (el, done) {
      el.style.display = 'none'
    }
  }
}
</script>

<style>

.weeks .item {
  font-size: .7rem;
}
.weeks,.dates {
  text-align: center;
  font-size: 1rem;
  line-height: 50px;
  width: 100%;
  overflow: hidden;
}
.weeks span,.dates span {
  width:14.2%;
  float: left;
  line-height: 42px;
}
.is-today {
  background: #f29543;
  border: 1px solid #f29543;
  border-radius: 50%;
  color: #fff;
  width: 36px;
  height: 36px;
  margin: 0 auto;
}
</style>
