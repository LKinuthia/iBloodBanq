import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginNavbar.css';

function LoginNavbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className='login-navbar'>
        <div className='login-navbar-container'>
          <Link to='/' className='login-navbar-logo' onClick={closeMobileMenu}>
          iBloodBanq
            <i class='fab fa-typo3' />
          </Link>
          <div className='login-menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'login-nav-menu active' : 'login-nav-menu'}>
            <li className='login-nav-item'>
              <Link to='/' className='login-nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='login-nav-item'>
              <Link
                to='/AboutUs'
                className='login-nav-links'
                onClick={closeMobileMenu}
              >
                About Us
              </Link>
            </li>
            <li className='login-nav-item'>
              <Link
                to='/FindBlood'
                className='login-nav-links'
                onClick={closeMobileMenu}
              >
                Find Blood
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default LoginNavbar;
