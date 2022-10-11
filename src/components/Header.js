import React from "react";
import { useContext } from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";

import { currentUserContext } from "../contexts/currentUserContext";

function Header() {
  const currentUser = useContext(currentUserContext);
  const { pathname } = useLocation();

  const loggedIn = true;

  return (
    <header className="section section-header">
      <Link to={'/'} className="section-header__logo-link">
        <div className="section-header__logo"></div>
      </Link>
      <div className="section-header__service">
        {loggedIn ? (
          <>
            <p className="section-header__info">mail@mail.ru</p>
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
      </div>
    </header>
  );
}

export default Header;
