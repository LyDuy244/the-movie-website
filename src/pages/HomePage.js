import React from 'react';
import MovieList from '../components/movie/MovieList';

const HomePage = () => {
    return (
        <>
            <section className="movies-layout page-container pb-20">
                <h2 className="capitalize text-white mb-10 text-3xl font-bold">Now playing</h2>
                <MovieList></MovieList>
            </section>
            <section className="movies-layout page-container pb-20">
                <h2 className="capitalize text-white mb-10 text-3xl font-bold">Top rated</h2>
                <MovieList type="top_rated"></MovieList>
            </section>
            <section className="movies-layout page-container pb-20">
                <h2 className="capitalize text-white mb-10 text-3xl font-bold">Trending</h2>
                <MovieList type="popular"></MovieList>
            </section>
        </>
    );
};

export default HomePage;