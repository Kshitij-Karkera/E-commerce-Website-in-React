import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import { useStateValue } from '../../StateProvider';
import SearchBar from '../SearchBar/SearchBar';
import { auth } from '../../firebaseHandler';
import { LogoIcon, CartIcon, ProfileIcon, ThemeToggleIcon, ProfileSettingsIcon } from '../Icons/Icons';

function Header() {
  const [{ basket, user }] = useStateValue();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();

  useEffect(() => {
    const header = document.querySelector('.headerContainer');
    const footer = document.querySelector('.footerItems');
    if (header && footer) {
      header.style.display = 'flex';
      footer.style.display = 'flex';
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [location]);

  useEffect(() => {
    const themeToggle = document.querySelector('#theme-toggle');
    if (!themeToggle) return;

    const enableDarkMode = () => {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      themeToggle.setAttribute('aria-label', 'Switch to Light Theme');
      localStorage.setItem('theme', 'dark');
    };

    const enableLightMode = () => {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      themeToggle.setAttribute('aria-label', 'Switch to Dark Theme');
      localStorage.setItem('theme', 'light');
    };

    const handleThemeToggle = () => {
      document.body.classList.contains('dark-theme') ? enableLightMode() : enableDarkMode();
    };

    themeToggle.addEventListener('click', handleThemeToggle);

    localStorage.getItem('theme') === 'dark' ? enableDarkMode() : enableLightMode();

    return () => {
      themeToggle.removeEventListener('click', handleThemeToggle);
    };
  }, []);

  const signOut = () => {
    if (user) {
      auth.signOut();
      navigate('/');
      window.location.reload();
    }
  };

  return (
    <HeaderContainer className="headerContainer">
      <HeaderLogo className="header">
        <Link to="/">
          <LogoIcon />
        </Link>
      </HeaderLogo>
      <HeaderItems className="headerItems">
        <SearchBar />
        <Link to="/cart" className="linkCartBtn">
          <button className="cartButton">
            <div className="text" style={{ display: windowWidth <= 625 ? 'none' : 'block' }}>
              <div className="subText1">Cart:</div>
              <div className="subText2">{basket?.length}</div>
            </div>
            <div className="image">
              <CartIcon />
            </div>
          </button>
        </Link>
        {user ? (
          <>
            <button className="profileButton">
              <div className="greetUser">
                Hello,&nbsp;<span className="userName">{user.displayName ? user.displayName.split(" ")[0] : 'User'}</span>
              </div>
              <div className="profileSettings">
                Account & Lists
                <ProfileSettingsIcon />
              </div>
              <ProfileIcon />
            </button>
            <div className="profileSubCategories">
              <span className="greetUser">
                Hello,&nbsp;<span className="userName">{user.displayName ? user.displayName.split(" ")[0] : 'User'}</span>
              </span>
              <Link to='/youraccount'><div>Your Account</div></Link>
              <Link to=''><div>Your Orders</div></Link>
              <Link to=''><div>Your Wish List</div></Link>
              <Link to=''><div>Your Recommendations</div></Link>
              <Link to=''><div>Your Seller Account</div></Link>
              <hr />
              <Link to=''><div>Switch Account</div></Link>
              <div onClick={signOut}>Sign Out</div>
            </div>
          </>
        ) : (
          <Link to="/login" className="linkLoginBtn">
            <button className="loginButton">
              <ProfileIcon />
              <div className="text" style={{ display: windowWidth <= 625 ? 'none' : 'flex' }}>LOGIN</div>
            </button>
          </Link>
        )}
        <button id="theme-toggle" aria-label="Switch to Dark Theme">
          <ThemeToggleIcon />
        </button>
      </HeaderItems>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div``;

const HeaderLogo = styled.div``;

const HeaderItems = styled.div`
  display: flex;
  @media only screen and (max-width: 1090px) {
    margin-top: 1em;
  }
  flex-direction: row;
  height: 6em;
  align-items: center;
  width: 100%;
`;