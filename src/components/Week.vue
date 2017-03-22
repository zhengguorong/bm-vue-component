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
  name: 'Week',
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
  watch: {
    curWeeks: function (val) {
      this.$emit('cur-week-changed', val)
    }
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
          time: nextDate.getTime(),
          event: false
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
