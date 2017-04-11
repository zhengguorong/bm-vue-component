<template>
  <div class="page_demo">
    <div class="item">
      <router-link to="/week">
        <div class="title">周选择器(week)</div>
      </router-link>
    </div>
    <div class="item">
      <router-link to="/calendar">
        <div class="title">日历选择器(calendar)</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {

  }
}
</script>

<style>
  .page_demo .item {
    height: 40px;
    text-align: left;
    line-height: 40px;
    padding: 0 10px;
    border-bottom: solid 1px #ccc;
  }
</style>
