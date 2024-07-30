import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header flex items-center justify-center text-white gap-x-5 py-10 mb-5 text-2xl">
            <NavLink to={"/"} className={({isActive}) => isActive ? "text-primary" : ""}>Home</NavLink>
            <NavLink to={"/now_playing"} className={({isActive}) => isActive ? "text-primary" : ""}>Now Playing</NavLink>
            <NavLink to={"/popular"} className={({isActive}) => isActive ? "text-primary" : ""}>Popular</NavLink>
            <NavLink to={"/top_rated"} className={({isActive}) => isActive ? "text-primary" : ""}>Top Rated</NavLink>
        </header>
    );
};

export default Header;