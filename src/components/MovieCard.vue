
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Movie } from '../models/movie';
import { firstPosterOrBanner } from '../models/movie';

export default defineComponent({
	name: 'MovieCard',
	props: {
		movie: {
			type: Object as PropType<Movie>,
			required: true
		}
	},
	setup(props) {
		return {
			firstPosterOrBanner
		};
	}
});
</script>

<template>
	<a :href="movie.url" target="_blank">
		<div class="card">
			<!-- Image on the left (fit), title on the right -->
			<!-- image max height 20% of screen -->
			<div class="card-image">
				<figure class="image">
					<img :src="firstPosterOrBanner(movie)" alt="Placeholder image" />
				</figure>
			</div>

			<div class="card-content">
				<div class="media">
					<div class="media-content">
						<p class="title is-5 keepall">{{ movie.title }}</p>
						<p class="subtitle is-6 keepall">{{ movie.year }}</p>
					</div>
				</div>
			</div>
		</div>
	</a>
</template>

<style scoped>
.card {
	height: 100%;
	flex: 1;
}
.keepall {
	word-break: normal;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
