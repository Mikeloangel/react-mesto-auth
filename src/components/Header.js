import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { AppContext } from '../contexts/AppContext';

function Header() {
  const appState = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleMenuClose = () => setIsMenuOpen(false);

  return (
    <header className="section-header" onMouseLeave={handleMenuClose}>
      <div className="section-header__bar">
        <Link to={'/'} className="section-header__logo-link">
          <div className="section-header__logo"></div>
        </Link>
        <div className={`section-header__burger ${isMenuOpen && 'section-header__burger_open'}`}  onClick={handleToggleMenu} >
          <div className="section-header__burger-stripe"></div>
        </div>
      </div>

      <div className={`section-header__service ${isMenuOpen && 'section-header__service_open'}`}>
        <nav className="section-header__nav">
          {appState.isLogged ? (
            <>
              <p className="section-header__info">{appState.userMail}</p>
              <Link to={'/sign-out'} className="section-header__link section-header__link_shaded">Выйти</Link>
            </>
          ) : (
            <Switch>
              <Route exact path={'/sign-up'}>
                <Link to={'/sign-in'} className="section-header__link">Войти</Link>
              </Route>
              <Route exact path={'/sign-in'}>
                <Link to={'/sign-up'} className="section-header__link">Регистрация</Link>
              </Route>
            </Switch>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
