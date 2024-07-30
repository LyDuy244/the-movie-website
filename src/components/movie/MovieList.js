import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from './MovieCard';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../../config/config';
import MovieCardSkeleton from '../loading/MovieCardSkeleton';
// https://api.themoviedb.org/3/movie/now_playing?api_key=5b57c96d155886c38c67a9b5bff3e0f6

const MovieList = ({ type = "now_playing" }) => {
    const { data, isLoading } = useSWR(tmdbAPI.getMovieList(type), fetcher)
    const movies = data?.results || [];

    return (
        <div className="movie-list">
            {isLoading ? <>
                <Swiper
                    spaceBetween={40}
                    slidesPerView={"auto"}
                    grabCursor={"true"}>
                    <SwiperSlide>
                        <MovieCardSkeleton></MovieCardSkeleton>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieCardSkeleton></MovieCardSkeleton>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieCardSkeleton></MovieCardSkeleton>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieCardSkeleton></MovieCardSkeleton>
                    </SwiperSlide>

                </Swiper>
            </> :
                <Swiper
                    spaceBetween={40}
                    slidesPerView={"auto"}
                    grabCursor={"true"}>

                    {
                        movies.length > 0 &&
                        movies.map(item => (
                            <SwiperSlide key={item.id}>
                                <MovieCard item={item}></MovieCard>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            }
        </div>
    );
};

export default MovieList;