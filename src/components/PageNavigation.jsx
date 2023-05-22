import React from 'react'
import { NavLink } from "react-router-dom"



export const Navigation = () => {
    return (
        <nav>
            <ul className='nav-list'>
                <li>
                    <NavLink exact to="/" activeClassName="active">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/music/search" activeClassName="active">
                        Search
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/music/favourite" activeClassName="active">
                        Favourites
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}