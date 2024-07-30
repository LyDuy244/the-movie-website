import React from 'react';
import LoadingSkeleton from './LoadingSkeleton';

const MovieCardSkeleton = () => {
    return (
        <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
            <LoadingSkeleton height="250px" radius="8px" className="mb-5"></LoadingSkeleton>
            <div className="flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-3">
                    <LoadingSkeleton height="20px"></LoadingSkeleton>
                </h3>
                <div className="flex items-center justify-between text-sm opacity-50 mb-10">
                    <span>
                        <LoadingSkeleton width="50px" height="10px"></LoadingSkeleton>
                    </span>
                    <span>
                        <LoadingSkeleton width="30px" height="10px"></LoadingSkeleton>
                    </span>
                </div>
                <LoadingSkeleton height="45px"></LoadingSkeleton>
            </div>
        </div>
    );
};

export default MovieCardSkeleton;