
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import { tmdbAPI } from '../../config/config';

const MovieCard = ({ item }) => {
    const { id, title, backdrop_path, release_date, vote_average } = item;
    const navigate = useNavigate();

    return (
        <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
            <img className="w-full h-[250px] object-cover rounded-lg mb-5" src={tmdbAPI.imageOriginal(backdrop_path)} alt="" />
            <div className="flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <div className="flex items-center justify-between text-sm opacity-70 mb-10">
                    <span>{new Date(release_date).getFullYear()}</span>
                    <span className='flex items-center gap-2'> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill='yellow' viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>

                        <span>{vote_average}</span>
                    </span>
                </div>
                <Button onClick={() => navigate(`/movies/${id}`)} full>Watch now</Button>
            </div>
        </div>
    );
};

MovieCard.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        backdrop_path: PropTypes.string,
        release_date: PropTypes.string,
        vote_average: PropTypes.number
    })
};

export default MovieCard;

