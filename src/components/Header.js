import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, handleLogout }) {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/search">Search Movies</Link></li>
          {isLoggedIn ? (
            <>
              <li><Link to="/watchlist">Your Watchlist</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
