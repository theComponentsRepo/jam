import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillHome, AiOutlineSearch, AiFillHeart } from 'react-icons/ai';

export const Navigation = () => {
  return (
    <nav className='flex justify-center content-center p-2 bg-slate-100 sticky top-0 left-0 right-0 mb-2 shadow-lg'>
      <ul className='nav-list'>
        <li>
          <NavLink exact to='/' activeClassName='active'>
            <AiFillHome className='nav-icon' />
            {/* Home */}
          </NavLink>
        </li>
        <li>
          <NavLink to='/music/search' activeClassName='active'>
            <AiOutlineSearch className='nav-icon' />
            {/* Search */}
          </NavLink>
        </li>
        <li>
          <NavLink to='/music/favourite' activeClassName='active'>
            <AiFillHeart className='nav-icon' />
            {/* Favourites */}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};