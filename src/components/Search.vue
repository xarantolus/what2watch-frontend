<template>
	<div class="container">
		<form @submit.prevent="search">
			<div class="field is-grouped">
				<p class="control is-expanded">
					<input v-model="text" autofocus class="input is-large" type="text" placeholder="Find movies...">
				</p>
				<p class="control">
					<button type="submit" class="button is-large is-info" :class="{ 'is-loading': loading }">
						Search
					</button>
				</p>
			</div>
			<div class="field" v-if="error">
				<div class="notification is-danger">
					{{ error }}
				</div>
			</div>
		</form>

		<section class="watchlist" v-if="!loading">
			<div class="columns is-8 is-multiline card-equal-height">
				<div v-for="movie in searchResults" :key="movie.id" class="column is-one-quarter">
					<movie-card :movie="movie" :click-function="onClickMovie" />
				</div>
			</div>
		</section>
	</div>
</template>


<script lang="ts">
import { defineComponent, inject, onMounted, ref } from 'vue';
import { Movie } from '../models/movie';
import PocketBase from 'pocketbase';
import MovieCard from "./MovieCard.vue";

export default defineComponent({
	name: 'Search',
	components: {
		MovieCard
	},

	setup() {
		let query = new URLSearchParams(window.location.search);
		const text = ref(query.get('q') || '');

		return {
			text: text,
			loading: ref(false),
			error: ref(""),
			searchResults: ref([] as Movie[]),
			pb: inject("pb") as PocketBase,
		};
	},
	mounted() {
		this.search();
	},
	methods: {
		async search() {
			try {
				this.loading = true;
				this.searchResults = [];

				if (this.text) {
					let params = new URLSearchParams({ q: this.text }).toString();
					window.history.pushState({}, "", `/search?` + params);
				} else {
					window.history.pushState({}, "", `/search`);
				}

				let movies = await this.pb.collection("movies").getList<Movie>(
					0, 100, { filter: `title ~ ${JSON.stringify("%" + this.text + "%")}` }
				);

				this.error = "";

				this.searchResults = movies.items;
			} catch (e) {
				this.error = String(e);
			} finally {
				this.loading = false;
			}
		},
		async onClickMovie(movie: Movie) {
			await this.pb.collection("watchlist").create({
				movie: movie.id,
				user: (this.pb.authStore as unknown as any).baseModel?.id
			});
		}
	},
});
</script>

<style scoped>
.watchlist {
	padding-top: 2rem !important;
	max-width: 90%;
	margin: 0 auto;
}
</style>
