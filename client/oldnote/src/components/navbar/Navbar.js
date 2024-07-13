import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const logged = useSelector((state) => state.user.logged);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <h2>Old Notes</h2>
      </div>
      <div className={`navbar-pages ${isOpen ? 'open' : ''}`}>
        {logged ? (
          <div className="navbar-logged">
            <Link to="/Search">Search</Link>
            <Link to="/DrawBoard">Create</Link>
            <Link to="/Notes">Notes</Link>
            <Link to="/Profile">Profile</Link>
          </div>
        ) : (
          <div className="navbar-login">
            <Link to="/Login">Login</Link>
          </div>
        )}
      </div>
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
      </div>
    </div>
  );
};

export default Navbar;
