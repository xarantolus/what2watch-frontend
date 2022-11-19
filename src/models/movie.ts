export interface Movie {
	id: string;
	title: string;
	year: string;
	banners: string;
	posters: string;
	url: string;
	genres: string;
	created: Date;
	updated: Date;
}

export function firstPosterOrBanner(movie: Movie) {
	if (movie.posters) {
		return movie.posters.split(',')[0];
	}
	if (movie.banners) {
		return movie.banners.split(',')[0];
	}
	return '/android-chrome-192x192.png';
}
