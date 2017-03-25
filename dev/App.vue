<template>
  <div id="app" style="font-size:40px">
    <BMWeek ref="week" @cur-week-changed="weekChanged" style="font-size:40px"></BMWeek>
    <div @click="toDate">选中指定日期</div>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    weekChanged (weeks) {
      weeks[0].event = true
    },
    toDate (time) {
      this.$refs['week'].toDate('2017/3/18')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 30px;
}

h1, h2, h3 {
  font-weight: normal;
  margin: 0;
  padding: 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.t-center{
  text-align: center;
  margin: 20px;
}
</style>
