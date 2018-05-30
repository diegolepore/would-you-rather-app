import React from 'react'
import { NavLink } from 'react-router-dom'
import UserInfoTop from './UserInfoTop';

function Nav(props) {
    return (
      <nav className='nav clearfix'>
        <ul>
          <li>
            <NavLink to='/dashboard' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              New Poll
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>
        </ul>
        <UserInfoTop />
      </nav>
    )
}

export default Nav