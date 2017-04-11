<template>
  <div>
    <div class="nav">
      <div class="left" @click="goback"><</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    goback () {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
body {
  margin: 0 0;
  background: #fff;
}
.nav {
  height: 44px;
}
.nav .left {
  float: left;
  font-size: 20px;
  width:20%;
  padding-left:10px;
  line-height: 44px;
}
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
a {
  color: #1EB8FF;
  text-decoration: none;
}

</style>
