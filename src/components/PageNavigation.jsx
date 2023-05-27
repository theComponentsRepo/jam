import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillHome, AiOutlineSearch, AiFillHeart } from 'react-icons/ai';
import ToggleThemeButton from './ToggleThemeButton';

export const Navigation = () => {
  return (
    <nav className='flex justify-between content-center p-2 bg-slate-100 sticky top-0 left-0 right-0  shadow-lg z-40 dark:bg-slate-900'>
      <h5 className="font-['Caveat'] text-left text-3xl pl-8 dark:text-white">Jam</h5>
      <ul className='nav-list'>
        <li className='pt-2 pr-2'>
          <ToggleThemeButton />
        </li>

        <li>
          <NavLink exact to='/' activeClassName='active'>
            <AiFillHome className='nav-icon dark:text-white hover:dark:text-gray-600' />
            {/* Home */}
          </NavLink>
        </li>
        <li>
          <NavLink to='/music/search' activeClassName='active'>
            <AiOutlineSearch className='nav-icon dark:text-white hover:dark:text-gray-600' />
            {/* Search */}
          </NavLink>
        </li>
        <li>
          <NavLink to='/music/favourite' activeClassName='active'>
            <AiFillHeart className='nav-icon dark:text-white hover:dark:text-gray-600' />
            {/* Favourites */}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};