export interface Movie {
	id: string;
	available: string;
	tmdb: string;
	tvdb: string;
	imdb_id: string;
	imdb_episode_id: string;
	title: string;
	otitle: string;
	original: string;
	serie: string;
	season: string;
	episode: string;
	episodetitle: string;
	oepisodetitle: string;
	year: string;
	directors: string;
	actors: string;
	companies: string;
	countries: string;
	genres: string;
	channel: string;
	airtime: string;
	banners: string;
	posters: string;
	pid: string;
	provider: string;
	url: string;
	seasonurl: string;
	episodeurl: string;
	type: string;
	distribution: string;
	price: string;
	publication: string;
	resolution: string;
	stereoscopic: string;
	language: string;
	subtitles: string;
	audio: string;
	runtime: string;
	fsk: string;
	added: string;
	modified: string;
	timestamp: string;
	expires: string;
}

export function firstPosterOrBanner(movie: Movie) {
	if (movie.posters) {
		return movie.posters.split(',')[0];
	}
	if (movie.banners) {
		return movie.banners.split(',')[0];
	}
	return '';
}
