<template>
	<div>
		<bm-calendar @cur-day-changed="dayChange" ref="calendar" :events="events"></bm-calendar>
		<div class="action">
			<p>当前选中日期{{selectedDay}}</p>
			<p @click="toDate()">跳转到2017年1月</p>
			<p @click="setEvent()">设置今天小黑点</p>
			<p @click="toNextMonth()">跳到下个月</p>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				selectedDay: null,
				events: ['2017/4/1']
			}
		},
		methods: {
			toDate () {
				this.$refs['calendar'].toDate('2017/1/1')
			},
			setEvent () {
				let today = new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + "/" + new Date().getDate()
				this.events.push(today)
			},
			toNextMonth () {
				this.$refs['calendar'].toNextMonth()
			},
			dayChange (day) {
				this.selectedDay = day
			}
		}
	}
</script>

<style scoped>
	.action {
		text-align: center;
	}
</style>