import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({admin}) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand mt-2">
        <h3><Link to="/home" className="title">Upstocks</Link></h3>
      </div>
      <div className="navbar-links">
        <ul style={{ fontWeight: 'bold' }}>
          <li><Link to="/home" className="navbar-link">Categories</Link></li>
          <li><Link to="/admin/profile" className="navbar-link">My profile</Link></li>
          
          <li><Link to="/about" className="navbar-link">About Us</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
