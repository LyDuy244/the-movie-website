export const fetcher = (...args) => fetch(...args).then(res => res.json())
export const apiKey = "5b57c96d155886c38c67a9b5bff3e0f6"
const tmdbEndpoint = `https://api.themoviedb.org/3/movie`
const tmdbEndpointSearch = `https://api.themoviedb.org/3/search/movie`
export const tmdbAPI = {
    getMovieList: (type, page = 1) => `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
    getMovieSearch: (query, page = 1) => `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
    
    getMovieDetail: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,
    getMovieMeta: (movieId, type) => `${tmdbEndpoint}/${movieId}/${type}?api_key=${apiKey}`,
    imageOriginal: (url) => `https://image.tmdb.org/t/p/original${url}`,
}