<template>
    <v-touch v-on:swipe="swipe">
    <div class="header">
      <div class="left" @click="toPreMonth"><</div>
      <div class='title'>{{calendar.year}} 年 {{calendar.month}} 月</div>
      <div class="right" @click="toNextMonth">></div>
    </div>
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
      <span class="item" v-for="(day, index) in dayList" v-bind:key="day" @click="setSelectedDay(day)">
        <div class="date-num" :class="{'hday': day.week === 6 || day.week === 0}">
          <div :class="{'is-today': day.isToday}" v-show="day.status">{{day.day}}</div>
          <div v-if="day.event" class="event"></div>
        </div>
      </span>
    </transition-group>
    </div>
    </v-touch>
</template>

<script>
export default {
  name: 'Calendar',
  data () {
    return {
      dayList: [],
      curDay: {},
      action: 'cur' // 用来记录手势，是前进还是后退，以便完成动画
    }
  },
  props: {
    calendar: {
      type: Object,
      required: true,
      default: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1
      }
    }
  },
  mounted () {
    this.dayList = this.getDayList(this.calendar.year, this.calendar.month)
  },
  methods: {
    getDayList(year, month) {
      console.log(month)
      // 计算1号时间戳
      let firstDay = new Date(year + '/' + month + '/01')
      let startTimestamp = firstDay-1000*60*60*24*firstDay.getDay() // 减去当前1号所在星期的天数
      let item, status, tempArr = [], tempItem, now = new Date()
      for (let i = 0 ; i < 42 ; i++) {
          item = new Date(startTimestamp + i*1000*60*60*24)
          if (parseInt(month) === item.getMonth() + 1) {
            status = 1
          } else {
            status = 0
          }
          let formate = `${item.getFullYear()}/${item.getMonth()+1}/${item.getDate()}`
          tempItem = {
            formate: `${item.getFullYear()}/${item.getMonth()+1}/${item.getDate()}`,
            day: item.getDate(),
            week: item.getDay(),
            time: item.getTime(),
            isToday: formate === (this.curDay.formate || `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`),
            status: status,
            event: false
          }
          if (tempItem.isToday) {
            this.curDay = tempItem
          }
          tempArr.push(tempItem)
      }
      return tempArr    
    },
    setSelectedDay (day) {
      this.$emit('cur-day-changed', day)
      this.curDay.isToday = false
      day.isToday = true
      this.curDay = day
    },
    toNextMonth () {
      if (this.calendar.month === 12) {
        this.calendar.year = parseInt(this.calendar.year) + 1
        this.calendar.month = 1
      } else {
        this.calendar.month = parseInt(this.calendar.month) + 1
      }
      this.action = 'next'
      this.dayList = this.getDayList(this.calendar.year, this.calendar.month)
      this.$emit('cur-month-changed', `${this.calendar.year}/${this.calendar.month}/01`)
    },
    toPreMonth () {
      if (this.calendar.month === 1) {
        this.calendar.year = parseInt(this.calendar.year) - 1
        this.calendar.month = 12
      } else {
        this.calendar.month = parseInt(this.calendar.month) - 1
      }
      this.action = 'pre'
      this.dayList = this.getDayList(this.calendar.year, this.calendar.month)
      this.$emit('cur-month-changed', `${this.calendar.year}/${this.calendar.month}/01`)
    },
    swipe (e) {
      if (e.deltaX > 0) {
        this.toPreMonth()
      } else {
        this.toNextMonth()
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
.header {
  margin: 15px;
  overflow: hidden;
}
.header > div{
  float: left;
  font-size: 14px;
  color: #1EB8FF;
}
.header .left{
  width: 20%;
  text-align: left;
}
.header .right {
  width: 20%;
  text-align: right;
}
.header .title {
  text-align: center;
  width: 60%;
}
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
  flex-wrap: wrap;
  width: 100%;
}
.weeks span{
  flex:1;
  display: block;
}
.dates span {
  width: 14.2%;
  display: block;
  margin: 5px 0;
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
