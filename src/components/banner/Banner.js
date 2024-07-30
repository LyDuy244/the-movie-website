import React from 'react';
import { apiKey, fetcher } from '../../config/config';
import useSWR from 'swr';
import { Swiper, SwiperSlide } from "swiper/react";
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const { data } = useSWR(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`, fetcher)
    const movies = data?.results || [];

    return (
        <section className="banner h-[600px]  page-container mb-20 overflow-hidden">
            <Swiper
                grabCursor="true"
                slidesPerView={"auto"}>
                {
                    movies.length > 0 &&
                    movies.map(item => (
                        <SwiperSlide key={item.id}>
                            <BannerItem item={item}></BannerItem>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </section>
    );
};

function BannerItem({ item }) {
    const { title, backdrop_path, id, genre_ids } = item;
    const { data } = useSWR(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`, fetcher)
    const genresList = data?.genres || [];
    const genres = genresList.length > 0 ? genresList.filter(genre => genre_ids.includes(genre.id)) : [];

    const navigate = useNavigate();
    return (
        <div className="w-full h-full rounded-lg relative">
            <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,.5)] to-[rgba(0,0,0,.5)] rounded-lg "></div>
            <img className="w-full h-full object-cover rounded-lg object-top" src={`https://image.tmdb.org/t/p/original${backdrop_path}`} alt="" />
            <div className="absolute left-5 bottom-5 w-full text-white z-10">
                <h2 className="font-bold text-3xl mb-5">{title}</h2>
                <div className="flex items-center gap-x-3 mb-8">
                    {
                        genres.length > 0 &&
                        genres.map(genre => (
                            <span key={genre.id} className="px-4 py-2 border border-white border-solid rounded-md">{genre.name}</span>
                        ))
                    }
                </div>
                <Button onClick={() => navigate(`/movies/${id}`)}>Watch Now</Button>
            </div>
        </div>
    )
}

export default Banner;