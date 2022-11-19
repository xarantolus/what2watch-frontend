import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// setup vue-router with login redirect
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/login',
			component: () => import('./components/Login.vue'),
		},
		{
			path: '/register',
			component: () => import('./components/Register.vue'),
		},
		{
			path: '/',
			component: () => import('./components/Home.vue'),
		}
		// TODO: Path for session/invite
	],
})

// router.beforeEach((to, from, next) => {
// 	console.log('beforeEach: ', to, from)
// 	if (localStorage.getItem('token') || to.path === '/login' || to.path == "/register") {
// 		next()
// 	} else {
// 		// redirect to login page, but keep the original path
// 		next({ path: '/login', query: { redirect: to.fullPath } })
// 	}
// })

const app = createApp(App)
app.use(router)
app.mount('#app')
