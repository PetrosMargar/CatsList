import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <NavLink to='/home'>Home</NavLink>
      <NavLink to='/community' className="linkStyle">Community</NavLink>
      <NavLink to='/new-user' className="linkStyle">Add user</NavLink>
    </header>
  )
}

export default Navbar;
