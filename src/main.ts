import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// setup vue-router with login redirect
import { createRouter, createWebHistory } from 'vue-router';

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
		},
		{
			path: '/search',
			component: () => import('./components/Search.vue'),
		},
		{
			path: '/invite/:id',
			component: () => import('./components/Invite.vue'),
		}
		// TODO: Path for session/invite
	],
})


import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');
pb.authStore.loadFromCookie("auth");
pb.authStore.onChange(() => {
	pb.authStore.exportToCookie(undefined, "auth");
})

const app = createApp(App)
app.provide("pb", pb);
app.use(router);



router.beforeEach((to, from, next) => {
	if (pb.authStore.isValid || to.path === '/login' || to.path == "/register") {
		next()
	} else {
		// redirect to login page, but keep the original path
		next({ path: '/login', query: { redirect: to.fullPath } })
	}
})

app.mount('#app');
