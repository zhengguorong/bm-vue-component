<template>
	<div>
		<bm-calendar :events="events"></bm-calendar>
		<div @click="changeEvent">切换events</div>
	</div>

</template>

<script>
	export default {
		data () {
			return {
				events: ['2017/4/1','2017/4/2','2017/4/3']
			}
		},
		methods: {
			changeEvent() {
				this.events = ['2017/4/8','2017/4/10','2017/4/22']
			}
		}
	}
</script>

