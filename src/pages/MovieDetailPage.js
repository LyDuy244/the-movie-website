import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../config/config';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieCard from '../components/movie/MovieCard';

// https://api.themoviedb.org/3/movie/{movie_id}
// 1191610
const MovieDetailPage = () => {
    const { movieId } = useParams();
    const { data } = useSWR(tmdbAPI.getMovieDetail(movieId), fetcher)
    console.log(data);
    if (!data) return null;
    const { backdrop_path, poster_path, title, genres, overview } = data
    return (
        <div className='py-10 text-white'>
            <div className='w-full h-[600px] relative'>
                <div className='overlay absolute inset-0 bg-black bg-opacity-75'></div>
                <div className="w-full h-full bg-cover bg-no-repeat" style={{
                    backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`
                }}>
                </div>
            </div>
            <div className='max-w-[500px] h-[600px] mx-auto -mt-[300px] relative z-10 pb-10'>
                <img src={tmdbAPI.imageOriginal(poster_path)} className='w-full h-full object-fill rounded-xl' alt="" />
            </div>
            <h1 className='text-center text-4xl font-bold mb-10'>{title}</h1>
            {
                genres.length > 0 &&
                <div className='flex items-center gap-x-5 mb-10 justify-center'>
                    {
                        genres.map(item => (
                            <span className='py-2 px-4 border-primary border border-solid text-primary rounded-lg' key={item.id}>{item.name}</span>
                        ))}
                </div>
            }
            <p className='text-justify text-center text-sm max-w-[600px] mx-auto leading-relaxed max-w mb-10'>{overview}</p>
            {/* <MovieCredits></MovieCredits>
            <MovieVideos></MovieVideos>
            <MovieSimilar></MovieSimilar> */}
            <MovieMeta type = "credits"></MovieMeta>
            <MovieMeta type = "videos"></MovieMeta>
            <MovieMeta type = "similar"></MovieMeta>
        </div>
    );
};

function MovieMeta({type = 'videos'}) {
    const { movieId } = useParams();
    const { data} = useSWR(tmdbAPI.getMovieMeta(movieId, type), fetcher)
    if (!data) return null;

    if (type === "credits") {
        const { cast } = data
        if (!cast || cast.length <= 0) return null;

        return (
            <>
                <h2 className='text-center text-3xl mb-10'>Casts</h2>
                <div className="grid grid-cols-4 gap-5">
                    {
                        cast.slice(0, 4).map(item => (
                            <div key={item.id} className='cast-item'>
                                <img src={tmdbAPI.imageOriginal(item.profile_path)} className='w-full h-[350px] object-fill rounded-lg mb-3' alt="" />
                                <h3 className='text-xl text-center font-medium'>{item.name}</h3>
                            </div>
                        ))
                    }
                </div>
            </>)
    } else {
        const { results } = data;
        if (!results || results.length <= 0) return null;
        if (type === "videos") {
            return (
                <div className='py-10'>
                    <h2 className='text-center text-3xl mb-10'>Trailer Videos</h2>
                    <div className='mx-auto flex items-center justify-center flex-col gap-5'>
                        {
                            results.slice(0, 3).map(item => (
                                <div key={item.id}>
                                    <h3 className='mb-5 text-xl font-medium p-3 bg-secondary inline-block'>{item.name}</h3>
                                    <div className='w-[1024px] aspect-video'>
                                        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${item.key}?si=mZDo2CIPy8VdmVP8`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className='w-full h-full object-fill'></iframe>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )
        }
        if(type === "similar") {
            return (
                <div className='py-10'>
                    <h2 className='text-3xl font-medium mb-10 text-center'>Similar Movies</h2>
                    <div className="movie-list">
                        <Swiper
                            spaceBetween={40}
                            slidesPerView={"auto"}
                            grabCursor={"true"}>

                            {
                                results.length > 0 &&
                                results.map(item => (
                                    <SwiperSlide key={item.id}>
                                        <MovieCard item={item}></MovieCard>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                </div>
            )
        }
    }
    return null;
}



// <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}?si=mZDo2CIPy8VdmVP8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>





export default MovieDetailPage;