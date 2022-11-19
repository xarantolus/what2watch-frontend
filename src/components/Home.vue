<template>
	<section class="hero">
		<div class="hero-body">
			<p class="title has-text-white">Find out what to watch:</p>
			<router-link class="button" to="/invite" tag="button">Invite your friend!</router-link>
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
		const watchList: Ref<Movie[]> = ref([]);
		const loading = ref(true);
		onMounted(async () => {
			try {
				const data = await returnAfterTimeout(
					shows as unknown as Array<Movie>,
					1000
				);

				for (let i = data.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[data[i], data[j]] = [data[j], data[i]];
				}

				// const res = await axios.get("https://jsonplaceholder.typicode.com/users");
				watchList.value = data; // res.data;
				// console.log(res);
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
		};
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
