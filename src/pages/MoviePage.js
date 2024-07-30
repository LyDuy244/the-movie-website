import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../config/config';
import MovieCard from '../components/movie/MovieCard';
import { useDebounce } from '@uidotdev/usehooks';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router-dom';

const itemsPerPage = 20
// https://api.themoviedb.org/3/search/movie
const MoviePage = () => {
    const {movie_type} = useParams();
    const [nextPage, setNextPage] = useState(1);
    const [filter, setFilter] = useState("");
    const [url, setUrl] = useState(`${tmdbAPI.getMovieList(movie_type, nextPage)}`)
    const filterDebounce = useDebounce(filter, 1000)
    const handleFilterChange = (e) => {
        setFilter(e.target.value)
    }
    useEffect(() => {
        if (filterDebounce) {
            setUrl(tmdbAPI.getMovieSearch(filterDebounce, nextPage))
        }
        else {
            setUrl(`${tmdbAPI.getMovieList(movie_type, nextPage)}`)
        }
    }, [filterDebounce, movie_type, nextPage])
    const { data, isLoading } = useSWR(url, fetcher)
    // if (!data) return null;
    const movies = data?.results || [];
    // const { page, total_pages } = data;

    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
        if (!data || !data.total_pages) return;
        setPageCount(Math.ceil(data.total_results / itemsPerPage));

    }, [data, itemOffset])

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.total_results;
        setItemOffset(newOffset);
        setNextPage(event.selected + 1);
    };

    return (
        <div className='py-10 page-container text-white'>
            <div className="flex mb-10">
                <div className="flex-1">
                    <input type="text" className='w-full p-4 bg-slate-800 outline-none' placeholder='Type here to search...' onChange={handleFilterChange} />
                </div>
                <button className='p-4 bg-primary'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </div>
            {
                isLoading && <div className='w-10 h-10 rounded-full border-4 border-t-transparent border-t-4 border-solid border-primary animate-spin transition-all mx-auto'></div>
            }
            <div className="grid grid-cols-4 gap-10 mb-10">
                {!isLoading && movies.length > 0 &&
                    movies.map(item => (
                        <MovieCard key={item.id} item={item}></MovieCard>
                    ))
                }
            </div>
            <div className='mt-0'>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    className='pagination'
                />
            </div>
           
        </div>
    );
};

export default MoviePage;