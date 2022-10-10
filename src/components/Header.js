import React from "react";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { currentUserContext } from "../contexts/currentUserContext";

function Header() {
  const currentUser = useContext(currentUserContext);
  const { pathname } = useLocation();

  function getSignLink(location) {
    if (location === '/sign-in') {
      return (<Link to={'/sign-up'} className="section-header__link">Зарегистрироваться</Link>);
    }
    if (location === '/sign-up') {
      return (<Link to={'/sign-in'} className="section-header__link">Войти</Link>)
    }
    if ( location === '/' && currentUser ){
      return (<Link to={'/sign-out'} className="section-header__link section-header__link_shaded">Выйти</Link>)
    }
  }


  return (
    <header className="section section-header">
      <Link to={'/'} className="section-header__logo-link">
        <div className="section-header__logo"></div>
      </Link>
      <div className="section-header__service">
        <p className="section-header__info">{currentUser.name ? currentUser.name : '' }</p>
        {getSignLink(pathname)}
      </div>
    </header>
  );
}

export default Header;
