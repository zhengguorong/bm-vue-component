import Demo from './pages/index.vue'
import Week from './pages/week.vue'
import Calendar from './pages/calendar.vue'
export default [
	{
		path: '/',
		component: Demo
	},
	{
		name: 'week',
		path: '/week',
		component: Week
	},
	{
		name: 'calendar',
		path: '/calendar',
		component: Calendar
	}
]