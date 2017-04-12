<template>
    <v-touch v-on:swipe="swipe">
    <div class="weeks">
      <span class="item hday">日</span>
      <span class="item">一</span>
      <span class="item">二</span>
      <span class="item">三</span>
      <span class="item">四</span>
      <span class="item">五</span>
      <span class="item hday">六</span>
    </div>
    <div class="dates">
    <transition-group name="list" tag="div" :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <span class="item" v-for="(day, index) in curWeeks" v-bind:key="day" @click="setSelectedDay(day)">
        <div class="date-num" :class="{'hday': index === 0 || index === 6}">
          <div :class="{'is-today': day.isToday}">{{day.day}}</div>
          <div v-if="day.event" class="event"></div>
        </div>
      </span>
    </transition-group>
    </div>
    </v-touch>
</template>

<script>
export default {
  name: 'bm-week',
  data () {
    return {
      curWeeks: [],
      curDay: {},
      action: 'cur'
    }
  },
  props: {
    // 默认选中日期
    calendar: {
      type: Object,
      required: false,
      default: function () {
        return {
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          day: new Date().getDate()
        }
      }
    },
    // 事件提醒小黑点
    events : {
      type: Array,
      require: false,
      default: () => []
    }
  },
  mounted () {
    this.curWeeks = this.getDayList(this.calendar.year + '/' + this.calendar.month + '/' + this.calendar.day)
    this.$emit('cur-day-changed', this.calendar.year + '/' + this.calendar.month + '/' + this.calendar.day)
  },
  watch: {
    curWeeks: function (val) {
      this.$emit('cur-week-changed', val[0].formate)
    },
    events (newEvents) {
      // 设置小黑点
      // 先把原有的小黑点清除
      this.curWeeks.forEach((value) => {
        value.event = false
      })
      for (let event of newEvents) {
        for (let day of this.curWeeks) {
          if (day.formate === event) {
            day.event = true
            break
          }
        }
      }
    }
  },
  methods: {
    // 获取下一星期或者上一星期
    getDayList (action) {
      let lastDay
      if (action === 'next') {
        lastDay = this.curWeeks[6].time
      } else if (action === 'pre'){
        lastDay = this.curWeeks[0].time - 8 * 24 * 3600 * 1000
      } else {
        // 传递日期 2017/3/14
        let toDate = new Date(action)
        toDate.setDate(toDate.getDate() - toDate.getDay() - 1) // 设置本周第一天
        lastDay = toDate.getTime()
      }
      let weeks = []
      for (var i = 1; i <= 7; i++) {
        let nextDate = new Date(lastDay + i * 24 * 3600 * 1000)
        let formate = `${nextDate.getFullYear()}/${nextDate.getMonth() + 1}/${nextDate.getDate()}`
        let index = this.events.findIndex((value, index) => {
          return value === formate
        })
        let dateObj = {
          day: nextDate.getDate(),
          week: nextDate.getDay(),
          formate: formate,
          isToday: formate === (this.curDay.formate || `${this.calendar.year}/${this.calendar.month}/${this.calendar.day}`),
          time: nextDate.getTime(),
          event: index > -1 ? true : false
        }
        if (dateObj.isToday) {
          this.curDay = dateObj
        }
        weeks.push(dateObj)
      }
      return weeks
    },
    toDate (date) {
      // 判断目标日期是否在本周内
      let targe = this.curWeeks.find( n => {
        return n.formate === date
      })
      if (targe) {
        this.setSelectedDay(targe)
      } else {
        // 切换周再设置选中日期
        this.curWeeks = this.getDayList(date)
        this.curWeeks.find( n => {
          if (n.formate === date) this.setSelectedDay(n)
        })
      }
    },
    setSelectedDay (day) {
      this.$emit('cur-day-changed', day.formate || day)
      this.curDay.isToday = false
      day.isToday = true
      this.curDay = day
    },
    toNextWeek () {
      this.action = 'next'
      this.curWeeks = this.getDayList('next')
    },
    toPreWeek () {
      this.curWeeks = this.getDayList('pre')
      this.action = 'pre'
    },
    swipe (e) {
      if (e.deltaX > 0) {
        this.toPreWeek()
      } else {
        this.toNextWeek()
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

<style scoped>
.item {
  font-size: 12px;
}
.hday {
  color: #999;
}
.weeks {
  line-height: 32px;
}
.weeks,.dates {
  text-align: center;
  font-size: 20px;
  width: 100%;
  overflow: hidden;
  display: flex;
}
.dates .item {
  line-height: 20px;
}
.dates>div {
  display: flex;
  width: 100%;
}
.weeks span,.dates span {
  flex:1;
  display: block;
}
.is-today {
  background: #1EB8FF;
  border-radius: 50%;
  color: #fff;
  width: 20px;
  height: 20px;
  margin:0 auto;
}
.is-today + .event {
  background: #1EB8FF;
}
.event {
  background: #999;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  margin: 2px auto 0 auto;
}
</style>
