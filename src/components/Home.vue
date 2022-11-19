<template>
	<section class="hero">
		<div class="hero-body">
			<p class="title has-text-white">Find out what to watch:</p>
			<button class="button" @click.prevent="createLink">Invite your Friends!</button>
		</div>
	</section>
	<div class="container">
		<section class="section watchlist">
			<p class="title">Watchlist</p>
			<button class="button is-loading" v-if="watchlistLoading">Loading...</button>
			<div v-else class="columns is-8 is-multiline card-equal-height">
				<div v-for="movie in watchList" :key="movie.id" class="column is-one-quarter">
					<movie-card :movie="movie" />
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from "vue";
// import axios from 'axios';

import shows from "../../data/nf-split.json";
import { Movie, firstPosterOrBanner } from "../models/movie";
import MovieCard from "./MovieCard.vue";
import PocketBase from 'pocketbase';
import { inject } from 'vue';


async function returnAfterTimeout<T>(value: T, timeout: number): Promise<T> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(value);
		}, timeout);
	});
}

export default defineComponent({
	name: "Home",
	setup() {
		const pb = inject("pb") as PocketBase;

		const watchList: Ref<Movie[]> = ref([]);
		const loading = ref(true);
		onMounted(async () => {
			try {
				let userId = JSON.stringify((pb.authStore as unknown as any).baseModel?.id);
				if (!userId) {
					pb.authStore.clear();

					window.location.pathname = "/";
					return;
				}

				let watchlist = await pb.collection("watchlist").getFullList(25, {
					expand: 'movie',
					filter: `user.id = ${userId}`
				});

				let movies = watchlist.map((w) => w.expand.movie);

				watchList.value = movies as unknown as Movie[];
			} catch (err) {
				console.error(err);
			} finally {
				loading.value = false;
			}
		});
		return {
			watchList,
			watchlistLoading: loading,
			firstPosterOrBanner,
			pb,
		};
	},
	methods: {
		async createLink() {
			const id = await this.pb.collection('sessions').create({
				creator: (this.pb.authStore as unknown as any).baseModel?.id
			});
			this.$router.push('invite/' + id.toString());
		}
	},
	components: { MovieCard },
});
</script>

<style>
.watchlist {
	max-width: 90%;
	margin: 0 auto;
}

.hero {
	background: linear-gradient(90deg, rgba(134, 2, 2, 0.7), #ff379bd8) !important;
	padding: 0 !important;
}

.button {
	font-size: larger;
}
</style>
